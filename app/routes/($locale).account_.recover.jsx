import {json, redirect} from '@shopify/remix-oxygen';
import {Form, Link, useActionData} from '@remix-run/react';

export async function loader({context}) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  if (customerAccessToken) {
    return redirect('/account');
  }

  return json({});
}

export async function action({request, context}) {
  const {storefront} = context;
  const form = await request.formData();
  const email = form.has('email') ? String(form.get('email')) : null;

  if (request.method !== 'POST') {
    return json({error: 'Method not allowed'}, {status: 405});
  }

  try {
    if (!email) {
      throw new Error('Please provide an email.');
    }
    await storefront.mutate(CUSTOMER_RECOVER_MUTATION, {
      variables: {email},
    });

    return json({resetRequested: true});
  } catch (error) {
    const resetRequested = false;
    if (error instanceof Error) {
      return json({error: error.message, resetRequested}, {status: 400});
    }
    return json({error, resetRequested}, {status: 400});
  }
}

export default function Recover() {
  const action = useActionData();

  return (
    <div className="w-full  my-[80px]">
      <div className="account-recover flex flex-col h-[60vh] justify-center items-center self-center px-6">
        <>
          <h1 className="my-4 font-avenir-light text-[19.5px] tracking-[1.95px] text-[#2f2f2f] ">
            RECOVER PASSWORD
          </h1>

          <Form method="POST" className="max-w-[400px] w-full ">
            {action?.error ? (
              <div className="w-full bg-[#e4c4c4] text-[#cb2b2b] font-avenir-light text-[13px] py-[10px] px-5 mb-5">
                {action.error}
              </div>
            ) : (
              ''
            )}
            {action?.resetRequested ? (
              <p className="w-full bg-[#d2e4c4] text-[#307a07] font-avenir-light text-[13px] py-[10px] px-5 mb-5">
                If that email address is in our system, you will receive an
                email with instructions about how to reset your password in a
                few minutes.
              </p>
            ) : (
              <p className="mb-6 text-center font-avenir-light text-[13px] text-[#2f2f2f]">
                Please enter your email:
              </p>
            )}

            <fieldset className="flex flex-col w-full">
              {/* <label htmlFor="email">Email</label> */}
              <input
                aria-label="Email"
                autoComplete="email"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                className="w-full font-avenir-medium text-[13px] text-[#2f2f2f] border border-[#E5E7EB] ring-0 focus:ring-0 focus:border-[#2f2f2f] outline-none focus:outline-none transition-all"
                id="email"
                name="email"
                placeholder="Email"
                required
                type="email"
              />
            </fieldset>
            <button
              className="bg-[#000000] border text-[11px] font-avenir-light font-bold tracking-[2.2px] border-[#000000] text-white w-full h-[45px] mt-5 hover:text-[#2f2f2f] hover:bg-transparent transition-all duration-[350ms] ease-css-ease"
              type="submit"
            >
              RECOVER
            </button>
          </Form>
          <div>
            <p className="mt-6 font-avenir-light text-[#2f2f2f]">
              Remember your password?
              <Link to="/account/login" className="hover:underline">
                {' '}
                Back to login
              </Link>
            </p>
          </div>
        </>
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/mutations/customerrecover
const CUSTOMER_RECOVER_MUTATION = `#graphql
  mutation customerRecover(
    $email: String!,
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
