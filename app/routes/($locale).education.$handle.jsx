import {json} from '@shopify/remix-oxygen';
import {Link, useLoaderData} from '@remix-run/react';
import WeddingRing from '../pages/education/wedding-ring-guide';
import EngRing from '../pages/education/engagement-ring-guide';
import BirthJew from '../pages/education/birthstone-jewelry-guide';
import LabNatDia from '../pages/education/lab-grown-vs-natural-diamonds';
import HowMeas from '../pages/education/how-to-measure-your-ring-size';
import MoisvsDia from '../pages/education/moissanite-vs-diamond';

export const meta = ({params}) => {
  let asd = params.handle.split('-');
  let asv = asd.join(' ');

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
    case 'wedding-ring-guide':
      policyComp = <WeddingRing />;
      break;
    case 'engagement-ring-guide':
      policyComp = <EngRing />;
      break;
    case 'birthstone-jewelry-guide':
      policyComp = <BirthJew />;
      break;
    case 'how-to-measure-your-ring-size':
      policyComp = <HowMeas />;
      break;
    case 'lab-grown-vs-natural-diamonds':
      policyComp = <LabNatDia />;
      break;
    case 'moissanite-vs-diamond':
      policyComp = <MoisvsDia />;
      break;
    default:
      throw new Response('Not Found', {status: 404});
  }
  return policyComp;
}
