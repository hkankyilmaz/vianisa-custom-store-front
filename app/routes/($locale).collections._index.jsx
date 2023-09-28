import {useLoaderData, Link} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Pagination, getPaginationVariables, Image} from '@shopify/hydrogen';

export async function loader({context, request}) {
  const paginationVariables = getPaginationVariables(
    request,
    //   , {
    //   pageBy: 4,
    // }
  );

  const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
  });
  return json({collections});
}

export default function Collections() {
  const {collections} = useLoaderData();

  return (
    <div className="collections" id="conn">
      <h1>Collections</h1>
      <Pagination connection={collections}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <div id="sdad">
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
            </PreviousLink>
            <CollectionsGrid collections={nodes} />
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more ↓</span>}
            </NextLink>
          </div>
        )}
      </Pagination>
    </div>
  );
}

function CollectionsGrid({collections}) {
  return (
    <div className="collections-grid" id={'collections-grid'}>
      {collections.map((collection, index) => (
        <div
          className={`card`}
          id={collection.id + 'ss'}
          style={{
            visibility: 'inherit',
            opacity: '1',
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
          }}
        >
          {/* <script>{console.log(collection.products.nodes[0])};</script> */}
          <div class="ProductItem__LabelList">
            <span class="ProductItem__Label ProductItem__Label--onSale Heading Text--subdued">
              On sale
            </span>
          </div>
          <CollectionItem
            key={collection.id}
            collection={collection}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}

function CollectionItem({collection, index}) {
  return (
    <Link
      className="collection-item"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      {collection.products.nodes[0].images.nodes[2].url &&
        (index % 2 == 0 ? (
          <Image
            alt={collection.products.nodes[0].images.nodes[0].altText}
            aspectRatio="1/1"
            data={collection.products.nodes[1].images.nodes[0]}
            loading={index < 3 ? 'eager' : undefined}
          />
        ) : (
          <Image
            alt={collection.products.nodes[0].images.nodes[0].altText}
            aspectRatio="1/1"
            data={collection.products.nodes[0].images.nodes[0]}
            loading={index < 3 ? 'eager' : undefined}
          />
        ))}
      <h5>{collection.title}</h5>
      <h5>{}</h5>
    </Link>
  );
}

const COLLECTIONS_QUERY = `#graphql
fragment Collection on Collection {
  id
  title
  handle
  description
  image {
    id
    url
    altText
    width
    height
  }
  products(first:2 ){
    nodes {
      id
      images(first:4 ){
          nodes{
             id
            url
            altText
            width
            height
          }

        
      
    }
  }
  }
}
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
