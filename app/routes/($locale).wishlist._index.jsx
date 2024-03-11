import {Link, useFetcher, useLoaderData} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {defer} from '@shopify/remix-oxygen';
import {useEffect, useState} from 'react';

export const handle = {
  breadcrumb: 'Wishlist',
};

export async function loader({context, request}) {
  const {storefront} = context;
  const cookieHeader = request.headers.get('Cookie');
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(';').forEach((cookie) => {
      const parts = cookie.split('=');
      cookies[parts[0].trim()] = parts[1].trim();
    });
  }

  // Extract wishlist from cookies
  const wishlist = JSON.parse(cookies['wishlist'] || '[]');

  const productsPromises = wishlist.map((productId) => {
    return storefront.query(GET_PRODUCT_BY_ID, {
      variables: {productId},
    });
  });

  const returnedproducts = await Promise.all(productsPromises);
  const products = returnedproducts.map((response) => response.product);

  return defer({
    products,
  });
}

export default function Wishlist() {
  const {products} = useLoaderData();
  return (
    <div>
      <div
        className={`block w-full text-center my-[35px] sm:my-[50px] font-optima-normal text-[16px] uppercase tracking-[.2em]`}
      >
        <h1>{'Wishlist'}</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <Item product={product} />
        ))}
      </div>
    </div>
  );
}

function Item({product}) {
  const [isDragging, setIsDragging] = useState(false);

  // const [product, setProduct] = useState(null);

  return (
    <Link
      prefetch="intent"
      to={`/products/${product?.handle}`}
      className={`cursor-pointer w-full px-[12px] sm:px-[15px] lg:px-[30px]`}
      onDragStart={(e) => {
        setIsDragging(true);
        e.preventDefault();
      }}
      onDragEnd={() => {
        setIsDragging(false);
      }}
    >
      <div className="w-full relative overflow-hidden aspect-square h-auto flex items-center">
        <Image
          className="w-full h-auto transition-opacity duration-300 css-ease opacity-100 hover:opacity-0"
          loading="eager"
          sizes="400px"
          src={product.images.nodes[0].url}
          onClick={(e) => {
            if (isDragging) {
              e.preventDefault();
            }
          }}
        />
        <Image
          className="w-full h-auto transition-opacity duration-300 css-ease opacity-0 hover:opacity-100 absolute top-1/2 left-0 -translate-y-1/2"
          loading="eager"
          sizes="400px"
          src={product?.images?.nodes[1].url}
          onClick={(e) => {
            if (isDragging) {
              e.preventDefault();
            }
          }}
        />
      </div>
      <div className="uppercase text-left whitespace-normal tracking-[.2em] text-[var(--heading-color)] font-avenir-medium text-[10px] mb-1 transition-[color] ease-css-ease-in-out duration-200 sm:text-[11px]">
        {product?.title}
      </div>
      <div className="tracking-[.2em] font-avenir-medium transition-[color] ease-css-ease-in-out duration-200 text-[var(--heading-color)] text-[10px] sm:text-[11px]">
        {(() => {
          return product.variants.nodes[0]?.compareAtPrice ? (
            <>
              <div className="flex gap-2.5">
                {product.variants.nodes[0] ? (
                  <Money
                    className="text-[var(--product-sale-price-color)]"
                    data={product.variants.nodes[0].price}
                  />
                ) : null}
                <s>
                  <Money data={product.variants.nodes[0].compareAtPrice} />
                </s>
              </div>
            </>
          ) : (
            product.variants.nodes[0]?.price && (
              <Money data={product.variants.nodes[0].price} />
            )
          );
        })()}
      </div>
    </Link>
  );
}

const GET_PRODUCT_BY_ID = `#graphql
query GetProductById($productId: ID!) {
  product(id: $productId) {
    id
    title
    handle
    images(first: 2) {
      nodes {
        url
      }
    }
    variants(first: 1) {
      nodes {
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
      }
    }
  }
}
`;
