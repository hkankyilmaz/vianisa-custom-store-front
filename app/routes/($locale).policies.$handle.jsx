import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {
  FreeShippingPage,
  PrivacyPolicyPage,
  RefundPolicyPage,
  TermsOfServicePage,
} from '~/pages/policy';

export const meta = ({params}) => {
  return [
    {
      title: `${params.handle
        .split('-')
        .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
        .join(' ')} - Vianisa`,
    },
  ];
};

export async function loader({params}) {
  const {handle} = params;
  return json({handle});
}

export default function Page() {
  const {handle} = useLoaderData();
  let policy;

  switch (handle) {
    case 'refund-policy':
      policy = <RefundPolicyPage />;
      break;

    case 'privacy-policy':
      policy = <PrivacyPolicyPage />;
      break;

    case 'terms-of-service':
      policy = <TermsOfServicePage />;
      break;

    case 'free-shipping':
      policy = <FreeShippingPage />;
      break;

    default:
      throw new Response('Not Found', {status: 404});
  }

  return policy;
}
