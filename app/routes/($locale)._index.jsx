import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useEffect, useRef} from 'react';
import {Image, Money, Script, useLoadScript, useNonce} from '@shopify/hydrogen';
import FeaturedCollection from '~/components/Featured Collections/FeaturedCollection';
import CollectionList from '~/components/Cllection List/Index';
import BannerSlider from '../components/Header/Slider';
import EtsyList from '../components/EtsyReviews/Index';
import JudgemeReview from '~/components/JudgemeReviews';

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
        handle: 'classic-wedding-bands',
      },
    },
  );
  // const apiUrl = `https://judge.me/api/v1/widgets/featured_carousel?shop_domain=${context.env.PUBLIC_STORE_DOMAIN}&api_token=${context.env.PUBLIC_JUDGEME_API_TOKEN}`;
  const apiUrl = `https://judge.me/api/v1/reviews?shop_domain=${context.env.PUBLIC_STORE_DOMAIN}&api_token=${context.env.PRIVATE_JUDGEME_API_TOKEN}&rating=5&per_page=30`;

  const res = await fetch(apiUrl);

  const featuredReviews = await res.json();

  const reviews = featuredReviews.reviews?.map((coll) => {
    const date = new Date(coll.created_at);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return {
      Verified: coll.verified == 'buyer' || coll.verified == 'admin',
      Title: coll.title,
      Image: coll.pictures[0]?.urls.original,
      Star: coll.rating,
      Content: coll.body,
      User: coll.reviewer.name,
      User_link: '#',
      Date: formattedDate,
      Reviews_link: '#',
    };
  });

  return defer({featuredCollection, featuredCollectionTwo, reviews});
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
        showButton
        className="!py-0 lg:!py-0"
      />
      {/* <div className="my-10  flex flex-row text-center justify-center items-center">
        <EtsyList className="grid  grid-cols-4  gap-4" />
      </div> */}
      <div style={{marginTop: 102}}>
        <h2 className="text-[20px] md:text-[28px] font-optima-normal uppercase text-center text-[var(--heading-color)] px-6 sm:px-[50px] min-[1140px]:px-[80px]">
          {'Our Reviews'}
        </h2>
      </div>
      <div className="my-10 mt-10 flex flex-row text-center justify-center items-center">
        <JudgemeReview
          className="grid  grid-cols-4  gap-4"
          collection={data.reviews}
        />
      </div>
      {/* <Suspense fallback={<div></div>}>
        <Await resolve={data.featuredReviews}>
          {(resolvedData) => (
            // <div className="my-10  flex flex-row text-center justify-center items-center">
            <div
              dangerouslySetInnerHTML={{
                __html: resolvedData.featured_carousel,
              }}
            />
            // </div>
          )}
        </Await>
      </Suspense> */}
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
