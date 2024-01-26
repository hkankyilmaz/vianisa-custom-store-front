import {json, redirect} from '@shopify/remix-oxygen';
import {Form, Link, useActionData} from '@remix-run/react';

export const meta = () => {
  return [{title: 'Login'}];
};

export async function loader({context}) {
  if (await context.session.get('customerAccessToken')) {
    return redirect('/account');
  }
  return json({});
}

export async function action({request, context}) {
  const {session, storefront} = context;

  if (request.method !== 'POST') {
    return json({error: 'Method not allowed'}, {status: 405});
  }

  try {
    const form = await request.formData();
    const email = String(form.has('email') ? form.get('email') : '');
    const password = String(form.has('password') ? form.get('password') : '');
    const validInputs = Boolean(email && password);

    if (!validInputs) {
      throw new Error('Please provide both an email and a password.');
    }

    const {customerAccessTokenCreate} = await storefront.mutate(
      LOGIN_MUTATION,
      {
        variables: {
          input: {email, password},
        },
      },
    );

    if (!customerAccessTokenCreate?.customerAccessToken?.accessToken) {
      throw new Error(customerAccessTokenCreate?.customerUserErrors[0].message);
    }

    const {customerAccessToken} = customerAccessTokenCreate;
    session.set('customerAccessToken', customerAccessToken);

    return redirect('/account', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return json({error: error.message}, {status: 400});
    }
    return json({error}, {status: 400});
  }
}

export default function Login() {
  const data = useActionData();
  const error = data?.error || null;

  return (
    <div className="w-full  my-[80px]">
      <div className=" flex flex-col h-[60vh] justify-center items-center self-center px-6">
        <h1 className="my-4 font-avenir-medium text-[19.5px] tracking-[1.95px] text-[#2f2f2f]">
          LOGIN
        </h1>
        <p className="mb-6 font-avenir-light text-[13px] text-[#2f2f2f]">
          Please enter your e-mail and password:
        </p>
        <Form method="POST" className="max-w-[400px] w-full ">
          {error ? (
            <div className="w-full bg-[#e4c4c4] text-[#cb2b2b] font-avenir-light text-[13px] py-[10px] px-5 mb-5">
              {error}
            </div>
          ) : (
            ''
          )}
          <fieldset>
            <div className="flex flex-col w-full  mb-[15px]">
              {/* <label htmlFor="email">Email address</label> */}
              <input
                className="w-full font-avenir-medium text-[13px] text-[#2f2f2f] border border-[#E5E7EB] ring-0 focus:ring-0 focus:border-[#2f2f2f] outline-none focus:outline-none transition-all"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email"
                aria-label="Email address"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </div>
            <div className="relative flex flex-col w-full">
              {/* <label htmlFor="password">Password</label> */}
              <input
                className="w-full font-avenir-medium text-[13px] text-[#2f2f2f] border border-[#E5E7EB] ring-0 focus:ring-0 focus:border-[#2f2f2f] outline-none focus:outline-none transition-all"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                aria-label="Password"
                minLength={8}
                required
              />
              <Link
                className="absolute h-min right-3 top-[50%] translate-y-[-50%] hover:underline font-avenir-light text-[11px] text-[#2f2f2f] w-fit"
                to="/account/recover"
              >
                Forgot password?
              </Link>
            </div>
          </fieldset>

          <button
            className="bg-[#000000] border text-[11px] font-avenir-light font-bold tracking-[2.2px] border-[#000000] text-white w-full h-[45px] mt-5 hover:text-[#2f2f2f] hover:bg-transparent transition-all duration-[350ms] ease-css-ease"
            type="submit"
          >
            LOGIN
          </button>
        </Form>
        <div className="flex flex-col">
          <p className="font-avenir-light mt-6 mb-8">
            Don't have an account?
            <Link className="font-avenir-light " to="/account/register">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/mutations/customeraccesstokencreate
const LOGIN_MUTATION = `#graphql
  mutation login($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;
