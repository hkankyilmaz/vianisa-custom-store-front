import {Suspense} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, Link, useLoaderData, useMatches} from '@remix-run/react';
import EmblaCarousel from '~/components/Product Carausel Image Slider/Index';
import {
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  CartForm,
  ShopPayButton,
} from '@shopify/hydrogen';
import {getVariantUrl} from '~/utils';
import FeaturedCollection from '~/components/Featured Collections/Index';
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data.product.title}`}];
};

export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;

  const featuredCollectionTwo = await storefront.query(
    FEATURED_COLLECTION_QUERY,
    {
      variables: {
        handle: 'lab-diamond-solitaire-pendants',
      },
    },
  );

  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      // Filter out Shopify predictive search query params
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v'),
  );

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  // await the query for the critical product data
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      return redirectToFirstVariant({product, request});
    }
  }

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.
  const variants = storefront.query(VARIANTS_QUERY, {
    variables: {handle},
  });

  return defer({product, variants, featuredCollectionTwo});
}

function redirectToFirstVariant({product, request}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  throw redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

export default function Product() {
  const {product, variants, featuredCollectionTwo} = useLoaderData();
  const {selectedVariant} = product;
  const images = product.images.nodes;
  console.log(images);
  const imageByIndex = (index) => images[index % images.length];
  const OPTIONS = {};
  const SLIDE_COUNT = 10;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <>
      <div className="product max-w-[1300px] m-auto py-10">
        {/* <ProductImage image={selectedVariant?.image} /> */}
        <EmblaCarousel
          slides={SLIDES}
          options={OPTIONS}
          imageByIndex={imageByIndex}
        />
        <ProductMain
          selectedVariant={selectedVariant}
          product={product}
          variants={variants}
        />
      </div>
      <FeaturedCollection data={featuredCollectionTwo} />
    </>
  );
}

function ProductImage({image}) {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div className="product-image">
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        sizes="(min-width: 45em) 50vw, 100vw"
      />
    </div>
  );
}

function ProductMain({selectedVariant, product, variants}) {
  const ctArr = ['-1-50-ct', '-1-00-ct', '-2-00-ct'];
  const {title, descriptionHtml} = product;
  const matches = useMatches()[1].pathname;
  const modifiedString = product.handle.slice(0, -8);

  return (
    <div className="product-main  border-b pb-1 border-[#bfbfbf]">
      <h1 className="text-xl uppercase opacity-70">{title}</h1>

      <ProductPrice selectedVariant={selectedVariant} />
      <br />
      {ctArr.some((item) => product.handle.includes(item)) ? (
        <div className="mb-10">
          <h5 className="font-bold text-md mb-10"> Total Carat Weight</h5>
          <Link
            style={{
              border: matches.includes('-1-00-ct') ? '1px solid black' : '',
            }}
            prefetch="intent"
            className=" border px-4 py-[1.4rem] rounded-full mr-4 shadow-lg hover:bg-[#DEA595] hover:text-white ease-linear duration-75"
            to={`/products/${modifiedString}-1-00-ct`}
          >
            1.0 ct
          </Link>
          <Link
            style={{
              border: matches.includes('-1-50-ct') ? '1px solid black' : '',
            }}
            className=" border px-4 py-[1.4rem] rounded-full mr-4 shadow-lg hover:bg-[#DEA595] hover:text-white ease-linear duration-75"
            prefetch="intent"
            to={`/products/${modifiedString}-1-50-ct`}
          >
            1.5 ct
          </Link>
          <Link
            style={{
              border: matches.includes('-2-00-ct') ? '1px solid black' : '',
            }}
            className=" border px-4 py-[1.4rem] rounded-full mr-4 shadow-lg hover:bg-[#DEA595] hover:text-white ease-linear duration-75"
            prefetch="intent"
            to={`/products/${modifiedString}-2-00-ct`}
          >
            2.0 ct
          </Link>
        </div>
      ) : undefined}

      <Suspense
        fallback={
          <ProductForm
            product={product}
            selectedVariant={selectedVariant}
            variants={[]}
          />
        }
      >
        <Await
          errorElement="There was a problem loading product variants"
          resolve={variants}
        >
          {(data) => (
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={data.product?.variants.nodes || []}
            />
          )}
        </Await>
      </Suspense>
      <br />
      <br />
      <p>
        <strong>Description</strong>
      </p>
      <br />
      <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
      <br />
    </div>
  );
}

function ProductPrice({selectedVariant}) {
  return (
    <div className="product-price border-b pb-3 border-[#bfbfbf]">
      {selectedVariant?.compareAtPrice ? (
        <>
          <p className="text-xs underline text-black">Sale</p>
          <div className="product-price-on-sale">
            {selectedVariant ? (
              <Money
                className="text-red-600 text-2xl mr-2"
                data={selectedVariant.price}
              />
            ) : null}
            <s className="!text-black">
              <Money
                className="text-2xl"
                data={selectedVariant.compareAtPrice}
              />
            </s>
          </div>
        </>
      ) : (
        selectedVariant?.price && <Money data={selectedVariant?.price} />
      )}
    </div>
  );
}

function ProductForm({product, selectedVariant, variants}) {
  return (
    <div className="product-form  border-b pb-6 border-[#bfbfbf]">
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>
      <br />
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          window.location.href = window.location.href + '#cart-aside';
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
      <ShopPayButton
        className="mt-3 text-xs"
        width="330px"
        storeDomain={'vianisa.myshopify.com'}
        variantIds={selectedVariant ? [selectedVariant.id] : ''}
      />
    </div>
  );
}

function ProductOptions({option}) {
  return (
    <div className="product-options" key={option.name}>
      <h5 className="font-bold">{option.name}</h5>
      <div className="product-options-grid">
        {option.values.map(({value, isAvailable, isActive, to}) => {
          return (
            <Link
              className="border px-2 py-1 w-[100px] shadow-xl rounded-sm hover:bg-[#DEA595] hover:text-white ease-linear duration-75"
              key={option.name + value}
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
              style={{
                border: isActive ? '1px solid black' : '',
              }}
            >
              {value}
            </Link>
          );
        })}
      </div>
      <br />
    </div>
  );
}

function AddToCartButton({analytics, children, disabled, lines, onClick}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            className="border w-[330px] px-2 py-2 tex-md rounded-md bg-black border-black text-white"
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    images (first:20 ) {
        nodes {
          url
          width
          altText
          height
        }
    }
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;

export const FEATURED_COLLECTION_QUERY = `#graphql

  query FeaturedCollection($country: CountryCode, $language: LanguageCode, $handle: String!)
    @inContext(country: $country, language: $language) {
    collection(handle : $handle) {
      description
      title
      products (first:20 ) {
    
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
