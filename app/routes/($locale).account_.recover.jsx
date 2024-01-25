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
    <div className="account-recover">
      <div className="flex flex-col items-center ">
        {action?.resetRequested ? (
          <>
            <h1>Request Sent.</h1>
            <p>
              If that email address is in our system, you will receive an email
              with instructions about how to reset your password in a few
              minutes.
            </p>
            <br />
            <Link to="/account/login">Return to Login</Link>
          </>
        ) : (
          <div className="flex flex-col text-center items-center py-20 gap-5 w-96">
            <h1>RECOVER PASSWORD</h1>
            <p>Please enter your email:</p>
            <Form method="POST">
              <fieldset className="w-96">
                {/* <label htmlFor="email">Email</label> */}
                <input
                  aria-label="Email"
                  autoComplete="email"
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  className="w-full"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                  type="email"
                />
              </fieldset>
              {action?.error ? (
                <p>
                  <mark>
                    <small>{action.error}</small>
                  </mark>
                </p>
              ) : (
                <br />
              )}
              <button
                className="w-full bg-black text-white py-1 border-black border duration-500 ease-in-out hover:bg-white hover:text-black"
                type="submit"
              >
                Recover
              </button>
            </Form>
            <div>
              <p>
                Remember your password?
                <Link to="/account/login"> Back to login</Link>
              </p>
            </div>
          </div>
        )}
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
