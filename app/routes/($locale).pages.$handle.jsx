import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';

export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data.page.title}`}];
};

export async function loader({params, context}) {
  /*  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
    },
  });

  if (!page) {
    throw new Response('Not Found', {status: 404});
  } */

  return json({});
}

export default function Page() {
  // const {page} = useLoaderData();

  return (
    <div className="page max-w-5xl m-auto p-10 pb-20">
      <header>
        <h1 className="underline">{page.title}</h1>
      </header>
      <main dangerouslySetInnerHTML={{__html: page.body}} />
    </div>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;
