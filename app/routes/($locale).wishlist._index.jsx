import {Link, useFetcher, useLoaderData} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {defer} from '@shopify/remix-oxygen';
import {useEffect, useState} from 'react';
import {useWishlist} from '~/store/wishlistContext';

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

  const [theProducts, setTheProducts] = useState([]);
  useEffect(() => {
    setTheProducts(products);
  }, []);

  const {wishlist, addToWishlist, removeFromWishlist} = useWishlist();

  const removeProduct = (productId) => {
    removeFromWishlist(productId);
    const updatedProducts = theProducts.filter((product) => {
      return product.id !== productId;
    });
    setTheProducts(updatedProducts);
  };

  return (
    <div>
      <div
        className={`block w-full text-center my-[35px] sm:my-[50px] font-optima-normal text-[16px] uppercase tracking-[.2em]`}
      >
        <h1>{'Wishlist'}</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {theProducts.map((product) => (
          <Item product={product} removeFromWishlist={removeProduct} />
        ))}
      </div>
    </div>
  );
}

function Item({product, removeFromWishlist}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className={`h-autocursor-pointer w-full px-[12px] sm:px-[15px] lg:px-[30px] relative`}
      // className="w-full h-auto transition-opacity duration-300 css-ease opacity-0 hover:opacity-100 absolute top-1/2 left-0 -translate-y-1/2"
    >
      <div
        className="w-full relative h-auto flex items-center"
        style={{position: 'relative'}}
      >
        <button
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            width: 40,
            height: 40,
            padding: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 999,
            backgroundColor: 'white',
            zIndex: 1,
            transition: 'all ease 150ms',
          }}
          className="hover:bg-[#fff0e7] hover:text-[#2f2f2f] transform hover:scale-110"
          onClick={() => removeFromWishlist(product.id)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="#abababf2"
            stroke="#abababf2"
            strokeWidth="0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
              ></path>
            </g>
          </svg>
        </button>
        <Link
          prefetch="intent"
          to={`/products/${product?.handle}`}
          onDragStart={(e) => {
            setIsDragging(true);
            e.preventDefault();
          }}
          onDragEnd={() => {
            setIsDragging(false);
          }}
        >
          <Image
            className="w-full h-auto transition-opacity duration-300 css-ease opacity-100 hover:opacity-0"
            loading="eager"
            sizes="400px"
            src={product.images?.nodes[0].url}
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
        </Link>
      </div>
      <Link
        prefetch="intent"
        to={`/products/${product?.handle}`}
        onDragStart={(e) => {
          setIsDragging(true);
          e.preventDefault();
        }}
        onDragEnd={() => {
          setIsDragging(false);
        }}
      >
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
    </div>
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
