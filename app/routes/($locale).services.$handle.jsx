import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {
  FinancingOptionsPage,
  LifetimeWarrantyPage,
  JewelryCarePage,
  RingSizePage,
} from '~/pages/services';

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
  let service;

  switch (handle) {
    case 'lifetime-warranty':
      service = <LifetimeWarrantyPage />;
      break;

    case 'jewelry-care':
      service = <JewelryCarePage />;
      break;

    case 'financing-options-with-affirm-and-shoppay':
      service = <FinancingOptionsPage />;
      break;

    case 'ring-size-conversion-chart':
      service = <RingSizePage />;
      break;

    default:
      throw new Response('Not Found', {status: 404});
  }

  return service;
}
