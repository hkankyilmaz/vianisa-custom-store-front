import {Suspense, useState, useEffect, useRef} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, Link, useLoaderData, useMatches} from '@remix-run/react';
import _ from 'lodash';
import EmblaCarousel from '~/components/Product Carausel Image Slider/Index';
import {FcShipped} from 'react-icons/fc';
import useCalculateShipDay from '~/hooks/useCalculateShipDay';
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import {AiOutlineDown} from 'react-icons/ai';
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
import ProductExtraInput from '../components/Product Extra Inputs/Index';
import gsap from 'gsap';

export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data.product?.title}`}];
};

export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;
  let randomNumber = _.random(0, 1);

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
  const featuredCollectionTwo = await storefront.query(
    FEATURED_COLLECTION_QUERY,
    {
      variables: {
        handle: [
          'lab-diamond-solitaire-pendants',
          'three-stone-engagement-rings',
        ][randomNumber],
      },
    },
  );
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

function ProductMain({selectedVariant, product, variants}) {
  const [isOpenGemStoneOpt, setIsGemStoneOpt] = useState(false);
  const ctArr = ['-1-50-ct', '-1-00-ct', '-2-00-ct'];
  const {title, descriptionHtml, tags} = product;
  const matches = useMatches()[1].pathname;
  const modifiedStringwithCarat = product.handle.slice(0, -8);
  const modifiedStringwithGemStone = _.includes(matches, 'moissanite')
    ? _.replace(product.handle, 'moissanite', 'lab-grown-diamond')
    : _.replace(product.handle, 'lab-grown-diamond', 'moissanite');
  const shipDtae = useCalculateShipDay(tags);

  useEffect(() => {
    setIsGemStoneOpt(false);
  }, [matches]);

  return (
    <div className="product-main">
      <h1 className="text-xl uppercase opacity-70">{title}</h1>

      <ProductPrice selectedVariant={selectedVariant} />
      <br />

      {ctArr.some((item) => product.handle.includes(item)) ? (
        <div className="mb-8 flex justify-start items-center">
          <h5 className="h-full font-bold text-md mr-5 flex justify-center items-center translate-y-1">
            Total Carat Weight:
          </h5>
          <div className="h-full flex justify-center items-center">
            <Link
              style={{
                border: matches.includes('-1-00-ct') ? '1px solid black' : '',
              }}
              prefetch="intent"
              className=" border px-4 py-[1.4rem] rounded-full shadow-lg mr-3 hover:bg-[#DEA595] hover:text-white ease-linear duration-75"
              to={`/products/${modifiedStringwithCarat}-1-00-ct`}
            >
              1.0 ct
            </Link>
            <Link
              style={{
                border: matches.includes('-1-50-ct') ? '1px solid black' : '',
              }}
              className=" border px-4 py-[1.4rem] rounded-full shadow-lg mr-3 hover:bg-[#DEA595] hover:text-white ease-linear duration-75"
              prefetch="intent"
              to={`/products/${modifiedStringwithCarat}-1-50-ct`}
            >
              1.5 ct
            </Link>
            <Link
              style={{
                border: matches.includes('-2-00-ct') ? '1px solid black' : '',
              }}
              className=" border px-4 py-[1.4rem] rounded-full shadow-lg mr-3 hover:bg-[#DEA595] hover:text-white ease-linear duration-75"
              prefetch="intent"
              to={`/products/${modifiedStringwithCarat}-2-00-ct`}
            >
              2.0 ct
            </Link>
          </div>
        </div>
      ) : undefined}
      <ProductDescription descriptionHtml={descriptionHtml} />
      {_.includes(matches, 'moissanite') ||
      _.includes(matches, 'lab-grown-diamond') ? (
        <ClickAwayListener onClickAway={() => setIsGemStoneOpt(false)}>
          <div
            onClick={() => setIsGemStoneOpt((prev) => !prev)}
            className="relative px-2 py-4 mb-3 text-normal border-2 cursor-pointer"
          >
            <span className="font-bold">Gemstone</span> :
            <span>
              {_.includes(matches, 'moissanite')
                ? ' Moissanite'
                : ' Lab Grown Diamond'}
            </span>
            <AiOutlineDown className="absolute right-3 top-5 text-lg" />
            {isOpenGemStoneOpt ? (
              <div className="absolute rounded-xl px-24 py-12 shadow-2xl right-[calc(100%+5px)] top-[50%] translate-y-[-50%] grid grid-col-1 gap-2 clip-path bg-[#e5e7eb]">
                {_.fill(Array(2), '').map((i, j) => (
                  <Link
                    className=" text-slate-600 hover:underline w-[200px] text-center text-lg font-bold uppercase"
                    key={j}
                    prefetch="intent"
                    preventScrollReset
                    replace
                    to={`/products/${modifiedStringwithGemStone}`}
                  >
                    {_.includes(matches, 'moissanite') && j == 0
                      ? 'Moissanite'
                      : _.includes(matches, 'lab-grown-diamond') && j == 0
                      ? 'Lab Grown Diamond'
                      : !_.includes(matches, 'lab-grown-diamond') && j == 1
                      ? 'Lab Grown Diamond'
                      : 'Moissaniteee'}
                  </Link>
                ))}
              </div>
            ) : undefined}
          </div>
        </ClickAwayListener>
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
      <div className="flex justify-start items-center border-b pb-6 border-[#bfbfbf]">
        <FcShipped className="text-5xl mr-3" />
        <span className="">
          Order this item now and we will ship by{' '}
          <span className="font-bold underline">{shipDtae}</span>
        </span>{' '}
      </div>
    </div>
  );
}

function ProductPrice({selectedVariant}) {
  return (
    <div className="product-price">
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
      <div className="gap-x-3 grid grid-cols-2">
        <VariantSelector
          handle={product.handle}
          options={product.options}
          variants={variants}
        >
          {({option}) => (
            <ProductOptions
              product={product}
              key={option.name}
              option={option}
            />
          )}
        </VariantSelector>
        <ProductExtraInput product={product} />
      </div>
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
        width="100%"
        storeDomain="vianisa.myshopify.com"
        variantIds={selectedVariant ? [selectedVariant.id] : ''}
      />
    </div>
  );
}

function ProductOptions({option}) {
  useEffect(() => {
    setIsOpen(false);
  }, [option]);

  const [isOpen, setIsOpen] = useState(false);
  let activeOption = _.find(option.values, {isActive: true}).value;

  return (
    <>
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <div
          className="relative px-2 py-4 text-normal border-2 cursor-pointer"
          key={option.name}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="font-bold">{option.name}</span> :
          <span> {activeOption} </span>
          {isOpen ? (
            <div className="absolute rounded-xl px-24  py-12 shadow-2xl right-[calc(100%+5px)] top-[50%] translate-y-[-50%] grid grid-col-1 gap-2 clip-path bg-[#e5e7eb]">
              {option.values.map(({value, isAvailable, isActive, to}) => {
                return (
                  <Link
                    className=" text-slate-600 hover:underline text-center text-lg font-bold uppercase w-[200px]"
                    key={option.name + value}
                    prefetch="intent"
                    preventScrollReset
                    replace
                    to={to}
                  >
                    {value}
                  </Link>
                );
              })}
            </div>
          ) : undefined}
          <br />
          <AiOutlineDown className="absolute right-3 top-5 text-lg" />
        </div>
      </ClickAwayListener>
     
    </>
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
            className="border w-full px-2 py-3 h-[42px] text- uppercase  rounded-md bg-black border-black tracking-wider text-white"
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

function ProductDescription({descriptionHtml}) {
  const ref = useRef();
  const ref_ = useRef();
  const isReverse = useRef(false);
  const handleAnimate = () => {
    if (!isReverse.current) {
      isReverse.current = true;
      gsap.to(ref.current, {height: 'auto'});
      gsap.to(ref_.current, {rotate: -180});
    } else {
      isReverse.current = false;
      gsap.to(ref.current, {height: '50px'});
      gsap.to(ref_.current, {rotate: 360});
    }
  };

  return (
    <div
      ref={ref}
      className="h-[50px] mb-4 overflow-hidden border-y py-6 border-[#bfbfbf]"
    >
      <p
        onClick={() => handleAnimate()}
        className="uppercase tracking-widest relative cursor-pointer"
      >
        <strong>Description</strong>
        <span className="absolute right-3 top-1 text-lg" ref={ref_}>
          <AiOutlineDown />
        </span>
      </p>
      <br />
      <div
        className="[&>div]:bg-slate-100 [&>div]:p-4 [&>div]:mb-3"
        dangerouslySetInnerHTML={{__html: descriptionHtml}}
      />
      <br />
    </div>
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
    tags
    handle
    collections ( first :1) {
    nodes{
      title
     }
    }
    productType
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
