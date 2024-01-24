import {Await, useMatches, useNavigate} from '@remix-run/react';
import {Suspense} from 'react';
import {CartForm} from '@shopify/hydrogen';
import {json, redirect} from '@shopify/remix-oxygen';
import {CartMain} from '~/components/Cart';

export const meta = () => {
  return [{title: `Cart`}];
};

export async function action({request, context}) {
  const {session, cartview} = context;

  const [formData, customerAccessToken] = await Promise.all([
    request.formData(),
    session.get('customerAccessToken'),
  ]);

  const {action, inputs} = CartForm.getFormInput(formData);
  // const navigate = useNavigate();

  if (!action) {
    throw new Error('No action provided');
  }
  //console.log(inputs);
  let status = 200;
  let result;

  switch (action) {
    case CartForm.ACTIONS.Create:
      delete inputs.analytics;
      result = await cartview.create(inputs);
      //console.log(result);
      break;

    default:
      throw new Error(`${action} cart action is not defined`);
  }
  const cartId = result.cart.id;
  const headers = cartview.setCartId(result.cart.id);
  const {cart: cartResult, errors} = result;
  //console.log('id: ', cartId, cartResult);
  if (cartResult?.checkoutUrl) {
    return redirect(cartResult.checkoutUrl);
  }

  //console.log('id: ', cartId, cartResult);
  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return json(
    {
      cartview: cartResult,
      errors,
      analyticsview: {
        cartId,
      },
    },
    {status, headers},
  );
}
