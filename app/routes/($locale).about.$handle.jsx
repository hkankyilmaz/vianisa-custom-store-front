import {json} from '@shopify/remix-oxygen';
import {Link, useLoaderData} from '@remix-run/react';
import OurValuesPage from '../pages/abouts/our-values';
import OurBrandPage from '../pages/abouts/our-brand';
import ContactUsPage from '../pages/abouts/contact-us';
import ConflictFreePage from '../pages/abouts/conflict-free-diamonds';
export const meta = ({params}) => {
  return [{title: params.handle.split('-').join(' ').toUpperCase()}];
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
    case 'our-values':
      policyComp = <OurValuesPage />;
      break;
    case 'our-brand':
      policyComp = <OurBrandPage />;
      break;
    case 'contact-us':
      policyComp = <ContactUsPage />;
      break;
    case 'conflict-free-diamonds':
      policyComp = <ConflictFreePage />;

      break;
    default:
      throw new Response('Not Found', {status: 404});
  }
  return policyComp;
}
