import {json} from '@shopify/remix-oxygen';
import {Link, useLoaderData} from '@remix-run/react';
import RefPage from '../pages/policy/refund-policy';
import PrivacyPage from '../pages/policy/privacy-policy';
import ShipRetPage from '../pages/policy/shipping-and-returns';
import TermsPage from '../pages/policy/terms-of-service';
export const meta = ({params}) => {
  let policyComp = '';
  let asd = params.handle.split('-');
  let asv = asd.join(' ');
  switch (params.handle) {
    case 'refund-policy':
      policyComp = 'a';
      break;
    case 'privacy-policy':
      policyComp = 'b';
      break;
    case 'terms-of-service':
      policyComp = 'c';
      break;
    case 'shipping-and-returns':
      policyComp = 'd';
    default:
      policyComp = 'e4';

      break;
  }
  return [{title: asv.toUpperCase()}];
};
export async function loader({params, context}) {
  /*  if (!params.handle) {
    throw new Response('No handle was passed in', {status: 404});
  }

  const policyName = params.handle.replace(/-([a-z])/g, (_, m1) =>
    m1.toUpperCase(),
  );

  console.log(policyName);

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n?.language,
    },
  });

  const policy = data.shop?.[policyName];

  if (!policy) {
    throw new Response('Could not find the policy', {status: 404});
  }
 */

  return json({params});
}
export default function Policy() {
  const {params} = useLoaderData();
  let hn = params.handle;
  let policyComp;

  switch (hn) {
    case 'refund-policy':
      policyComp = <RefPage />;
      break;
    case 'privacy-policy':
      policyComp = <PrivacyPage />;
      break;
    case 'terms-of-service':
      policyComp = <TermsPage />;
      break;
    case 'shipping-and-returns':
      policyComp = <ShipRetPage />;
      break;
    default:
      throw new Response('Not Found', {status: 404});
  }
  return policyComp;
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/Shop
