import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {
  OurValuesPage,
  OurBrandPage,
  ContactUsPage,
  ConflictFreePage,
} from '~/pages/abouts';

export const meta = ({params}) => {
  const pageName = params.handle
    .split('-')
    .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
    .join(' ');
  const pageTitle = pageName.includes('Contact')
    ? 'Contact - Vianisa'
    : `${pageName} - Vianisa`;

  return [
    {
      title: pageTitle,
    },
  ];
};

export async function loader({params}) {
  const {handle} = params;
  return json({handle});
}

export default function Page() {
  const {handle} = useLoaderData();
  let about;

  switch (handle) {
    case 'our-values':
      about = <OurValuesPage />;
      break;

    case 'our-brand':
      about = <OurBrandPage />;
      break;

    case 'contact-us':
      about = <ContactUsPage />;
      break;

    case 'conflict-free-diamonds':
      about = <ConflictFreePage />;
      break;

    default:
      throw new Response('Not Found', {status: 404});
  }

  return about;
}
