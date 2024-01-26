import {json, redirect} from '@shopify/remix-oxygen';
import {Form, Link, useActionData} from '@remix-run/react';

export async function loader({context}) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  if (customerAccessToken) {
    return redirect('/account');
  }

  return json({});
}

export const action = async ({request, context}) => {
  if (request.method !== 'POST') {
    return json({error: 'Method not allowed'}, {status: 405});
  }

  const {storefront, session} = context;
  const form = await request.formData();
  const email = String(form.has('email') ? form.get('email') : '');
  const password = form.has('password') ? String(form.get('password')) : null;
  const passwordConfirm = form.has('passwordConfirm')
    ? String(form.get('passwordConfirm'))
    : null;

  const validPasswords =
    password && passwordConfirm && password === passwordConfirm;

  const validInputs = Boolean(email && password);
  try {
    if (!validPasswords) {
      throw new Error('Passwords do not match');
    }

    if (!validInputs) {
      throw new Error('Please provide both an email and a password.');
    }

    const {customerCreate} = await storefront.mutate(CUSTOMER_CREATE_MUTATION, {
      variables: {
        input: {email, password},
      },
    });

    if (customerCreate?.customerUserErrors?.length) {
      throw new Error(customerCreate?.customerUserErrors[0].message);
    }

    const newCustomer = customerCreate?.customer;
    if (!newCustomer?.id) {
      throw new Error('Could not create customer');
    }

    // get an access token for the new customer
    const {customerAccessTokenCreate} = await storefront.mutate(
      REGISTER_LOGIN_MUTATION,
      {
        variables: {
          input: {
            email,
            password,
          },
        },
      },
    );

    if (!customerAccessTokenCreate?.customerAccessToken?.accessToken) {
      throw new Error('Missing access token');
    }
    session.set(
      'customerAccessToken',
      customerAccessTokenCreate?.customerAccessToken,
    );

    return json(
      {error: null, newCustomer},
      {
        status: 302,
        headers: {
          'Set-Cookie': await session.commit(),
          Location: '/account',
        },
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      return json({error: error.message}, {status: 400});
    }
    return json({error}, {status: 400});
  }
};

export default function Register() {
  const data = useActionData();
  const error = data?.error || null;
  return (
    <div className="w-full  my-[80px]">
      <div className="flex flex-col h-[60vh] justify-center items-center self-center px-6">
        <h1 className="my-4 font-avenir-light text-[19.5px] tracking-[1.95px] text-[#2f2f2f] uppercase">
          Register
        </h1>
        <p className="mb-6 font-avenir-light text-[13px] text-[#2f2f2f]">
          Please fill in the information below:
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
            <div className="mb-3 w-full">
              {/* <label htmlFor="email">Email address</label> */}
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full font-avenir-medium text-[13px] text-[#2f2f2f] border border-[#E5E7EB] ring-0 focus:ring-0 focus:border-[#2f2f2f] outline-none focus:outline-none transition-all"
                placeholder="Email"
                aria-label="Email address"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </div>
            <div className="mb-3 w-full">
              {/* <label htmlFor="password">Password</label> */}
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                aria-label="Password"
                className="w-full font-avenir-medium text-[13px] text-[#2f2f2f] border border-[#E5E7EB] ring-0 focus:ring-0 focus:border-[#2f2f2f] outline-none focus:outline-none transition-all"
                minLength={8}
                required
              />
            </div>
            <div className=" w-full">
              {/* <label htmlFor="passwordConfirm">Re-enter password</label> */}
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                autoComplete="current-password"
                placeholder="Re-enter password"
                aria-label="Re-enter password"
                className="w-full font-avenir-medium text-[13px] text-[#2f2f2f] border border-[#E5E7EB] ring-0 focus:ring-0 focus:border-[#2f2f2f] outline-none focus:outline-none transition-all"
                minLength={8}
                required
              />
            </div>
          </fieldset>

          <button
            className="bg-[#000000] border text-[11px] font-avenir-light font-bold tracking-[2.2px] border-[#000000] text-white w-full h-[45px] mt-5 hover:text-[#2f2f2f] hover:bg-transparent transition-all duration-[350ms] ease-css-ease"
            type="submit"
          >
            CREATE MY ACCOUNT
          </button>
        </Form>
        {/* <br />
      <p>
        <Link to="/account/login">Login →</Link>
      </p> */}
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/mutations/customerCreate
const CUSTOMER_CREATE_MUTATION = `#graphql
  mutation customerCreate(
    $input: CustomerCreateInput!,
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/latest/mutations/customeraccesstokencreate
const REGISTER_LOGIN_MUTATION = `#graphql
  mutation registerLogin(
    $input: CustomerAccessTokenCreateInput!,
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
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
