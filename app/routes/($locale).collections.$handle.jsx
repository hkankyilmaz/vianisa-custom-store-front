import React, {useState} from 'react';
import {json, redirect} from '@shopify/remix-oxygen';
import {Form} from '@remix-run/react';
import {useLoaderData, Link, useLocation} from '@remix-run/react';
import {
  Pagination,
  getPaginationVariables,
  Image,
  Money,
} from '@shopify/hydrogen';
import {useVariantUrl} from '~/utils';
import Slider from '@mui/material/Slider';
import ColBlog from '../components/CollectionBlog/Index';

export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data.collection.title} Collection`}];
};

export async function loader({request, params, context}) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 15,
  });

  if (!handle) {
    return redirect('/collections');
  }

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables},
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }
  return json({collection});
}

export default function Collection() {
  const [value, setValue] = React.useState([20, 37]);

  const {collection} = useLoaderData();
  console.log(collection);

  return (
    <div className="collection">
      <div className="my-10">
        <h1 className="text-center text-4xl">{collection.title}</h1>
        <p className="flex justify-center">
          <span className="lg:max-w-lg w-full text-center">
            {collection.description}
          </span>
        </p>
      </div>

      <div className="h-[75px] w-full border-y mb-10 flex justify-center items-center">
        <div className="flex w-[160px] justify-center items-center border-r h-full">
          <div className="w-[35px] h-[35px] grid grid-cols-2 grid-rows-2 gap-[0.5px] mr-2">
            {Array(4)
              .fill('')
              .map((idx) => (
                <div key={idx} className="w-[15px] h-[15px] bg-slate-200"></div>
              ))}
          </div>

          <div className="w-[35px] h-[35px] grid grid-cols-3 grid-rows-3 gap-[0.5px]">
            {Array(9)
              .fill('')
              .map((idx) => (
                <div key={idx} className="w-[10px] h-[10px] bg-slate-200"></div>
              ))}
          </div>
        </div>
        <div className="w-full"></div>
        <div className="w-[160px] h-full border-l flex justify-center items-center">
          Sort
        </div>
      </div>
      <Pagination connection={collection.products}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <>
            <ProductsGrid value={value} setValue={setValue} products={nodes} />
            <br />
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more ↓</span>}
            </NextLink>
          </>
        )}
      </Pagination>
    </div>
  );
}

function ProductsGrid({products, value, setValue}) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="grid grid-cols-[auto_auto] px-5">
      <div className="lg:min-w-[320px] pl-[30px]">
        <Form>
          <div className="mb-4">
            <p className="font-bold mb-2">PRİCE</p>
            <Slider
              className="max-w-[80%] mb-1"
              sx={{color: 'gray'}}
              getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
            />
            <div className="flex">
              <div className="border border-[#8c8c8c] border-solid w-[37%] h-[40px] relative text-right text-xl pr-2 flex justify-end items-center text-[#8c8c8c]">
                <span className="absolute left-2 top-[50%] translate-y-[-50%] text-xl ">
                  $
                </span>
                {value[0]}
              </div>
              <div className="flex justify-center items-center mx-[3%] text-[#8c8c8c]">
                -
              </div>
              <div className="border border-[#8c8c8c] border-solid w-[37%] h-[40px] relative text-right text-xl pr-2 flex justify-end items-center text-[#8c8c8c]">
                <span className="absolute left-2 top-[50%] translate-y-[-50%] text-xl ">
                  $
                </span>
                {value[1]}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-2 font-bold">COLOR</p>
            <p className="mb-1">ROSE</p>
            <p className="mb-1">WHİTE</p>
            <p>YELLOW</p>
          </div>
          <div>
            <p className="mb-2 font-bold">METERİAL</p>
            <p className="mb-1">10K GOLD</p>
            <p className="mb-1">14K GOLD</p>
            <p className="">18K GOLD</p>
          </div>
        </Form>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {products.map((product, index) => {
          return (
            <ProductItem
              key={product.id}
              product={product}
              loading={index < 8 ? 'eager' : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}

function ProductItem({product, loading}) {
  const variant = product.variants.nodes[0];
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return (
    <Link className="" key={product.id} prefetch="intent" to={variantUrl}>
      {product.featuredImage && (
        <Image
          alt={product.featuredImage.altText || product.title}
          aspectRatio="4/3"
          data={product.featuredImage}
          loading={loading}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <h4>{product.title}</h4>
      <small>
        <Money data={product.priceRange.minVariantPrice} />
      </small>
    </Link>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
   
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          startCursor
          hasNextPage
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
