import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useEffect, useRef} from 'react';
import {Image, Money, Script, useLoadScript, useNonce} from '@shopify/hydrogen';
import FeaturedCollection from '~/components/Featured Collections/FeaturedCollection';
import CollectionList from '~/components/Cllection List/Index';
import BannerSlider from '../components/Header/Slider';
import EtsyList from '../components/EtsyReviews/Index';

export const meta = () => {
  return [
    {title: 'Vianisa'},
    {
      property: 'og:title',
      content: 'Jewelry Website',
    },
    {
      name: 'description',
      content:
        'Our store includes products with Mozanite, lab diamond stones, 10,14,18 carat gold and platinum material options.',
    },
  ];
};

export async function loader({context}) {
  const {storefront} = context;
  const featuredCollection = await storefront.query(FEATURED_COLLECTION_QUERY, {
    variables: {
      handle: 'moissanite-engagement-rings',
    },
  });
  const featuredCollectionTwo = await storefront.query(
    FEATURED_COLLECTION_QUERY,
    {
      variables: {
        handle: 'lab-diamond-solitaire-pendants',
      },
    },
  );

  return defer({featuredCollection, featuredCollectionTwo});
}

export default function Homepage() {
  const data = useLoaderData();
  const nonce = useNonce();
  return (
    <div className="home">
      <BannerSlider />
      <FeaturedCollection data={data.featuredCollection} showButton />
      <CollectionList />
      <FeaturedCollection
        data={data.featuredCollectionTwo}
        className="!py-0 lg:!py-0"
      />
      <div className="my-10  flex flex-row text-center justify-center items-center">
        <EtsyList className="grid  grid-cols-4  gap-4" />
      </div>
      {/* <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} /> */}
  
    </div>
  );
}

// function FeaturedCollection({collection}) {
//   const image = collection.image;
//   return (
//     <Link
//       className="featured-collection"
//       to={`/collections/${collection.handle}`}
//     >
//       {image && (
//         <div className="featured-collection-image">
//           <Image data={image} sizes="100vw" />
//         </div>
//       )}
//       <h1>{collection.title}</h1>
//     </Link>
//   );
// }

// let initialized = false;
// let queue = [];

function RecommendedProducts({products}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
                <Link
                  key={product.id}
                  className="recommended-product"
                  to={`/products/${product.handle}`}
                >
                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1"
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  <h4>{product.title}</h4>
                  <small>
                    <Money data={product.priceRange.minVariantPrice} />
                  </small>
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

export const FEATURED_COLLECTION_QUERY = `#graphql

  query FeaturedCollection($country: CountryCode, $language: LanguageCode, $handle: String!)
    @inContext(country: $country, language: $language) {
    collection(handle : $handle) {
      description
      title
      products (first:8 ) {
    
          nodes  {
          title
          handle
          variants (first:5) {
            nodes {
              title
              compareAtPrice {
                amount
                currencyCode
              }          
              price {
                amount
                currencyCode
              }
              image {
                 altText
                 id
                 width
                 url
              }
              selectedOptions {
                name
                value
              }
            }
          }
          images (first:2) {
            nodes {
              altText
              id
              width
              url
    
            }
          }
        
      
      }
    }
    }
  }
`;

// const FEATURED_COLLECTION_QUERY = `#graphql
//   fragment FeaturedCollection on Collection {
//     id
//     title
//     image {
//       id
//       url
//       altText
//       width
//       height
//     }
//     handle
//   }
//   query FeaturedCollection($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
//       nodes {
//         ...FeaturedCollection
//       }
//     }
//   }
// `;

// const RECOMMENDED_PRODUCTS_QUERY = `#graphql
//   fragment RecommendedProduct on Product {
//     id
//     title
//     handle
//     priceRange {
//       minVariantPrice {
//         amount
//         currencyCode
//       }
//     }
//     images(first: 1) {
//       nodes {
//         id
//         url
//         altText
//         width
//         height
//       }
//     }
//   }
//   query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     products(first: 4, sortKey: UPDATED_AT, reverse: true) {
//       nodes {
//         ...RecommendedProduct
//       }
//     }
//   }
// `;
