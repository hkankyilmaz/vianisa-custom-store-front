import {Suspense, useState, useEffect, useRef} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, Link, useLoaderData, useMatches} from '@remix-run/react';
import _ from 'lodash';
import EmblaCarousel from '~/components/Product Carausel Image Slider/Index';
import DotCarousel from '~/components/Product Carausel Image Dot Slider/EmblaCarousel';
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
import FeaturedCollection from '~/components/Featured Collections/FeaturedCollection';
import {
  ProductExtraInputType,
  ProductExtraInputTag,
} from '../components/Product Extra Inputs/Index';
import gsap from 'gsap';
import BasicBreadcrumbs from '../components/Breadcrumbs/Index';
import {duration} from '@mui/material';
import WishlistButton from '~/components/Wishlist Button/WishlistButton';

export const meta = ({data}) => {
  return [{title: `${data.product?.title}`}];
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
  const SLIDE_COUNT = 8;
  /*   useEffect(() => {
    if (window.innerWidth > 600) {
      setmob(false);
    } else {
      setmob(true);
    }
    console.log(window.innerWidth);
  }, []); */

  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <>
      <BasicBreadcrumbs
        className="product max-w-[1330px] pl-[50px] m-auto text-[13px] gap-x-2 mt-[15px] mb-[15px]"
        product={product}
      />

      <div className="product max-w-[1330px] m-auto">
        {/* <ProductImage image={selectedVariant?.image} /> */}

        <EmblaCarousel
          slides={SLIDES}
          options={OPTIONS}
          imageByIndex={imageByIndex}
        />

        <div className="flex flex-wrap flex-col max-sm:mb-[28px] mb-[65px] lg:hidden">
          <DotCarousel
            slides={SLIDES}
            options={OPTIONS}
            imageByIndex={imageByIndex}
          />
        </div>

        <ProductMain
          selectedVariant={selectedVariant}
          product={product}
          variants={variants}
        />
      </div>
      <FeaturedCollection
        data={featuredCollectionTwo}
        title="YOU MAY ALSO LIKE"
      />
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
    <div className="product-main-wrapper sm:flex sm:justify-center">
      <div className="product-main max-sm:w-auto max-sm:max-w-[500px] w-[400px] max-lg:w-[500px] max-lg:mx-auto max-2xl:mr-[100px] ml-[50px] mr-[50px] max-lg:px-6">
        <h1 className="text-[18px] font-[500] uppercase font-body text-[#2f2f2f] tracking-[3.6px] text-left max-lg:text-center">
          {title}
        </h1>

        <style></style>
        <ProductPrice selectedVariant={selectedVariant} />
        <p className="mt-3 text-[#2f2f2f]">
          <span>
            4 interest-free installments, or from <strong>$53.88</strong>/mo
            with
            <shop-pay-logo
              role="img"
              aria-label="Shop Pay"
              background-color="#ffffff"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                class="shop-pay-logo"
                viewBox="0 0 341 81"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M227.297 0C220.448 0 214.896 5.47237 214.896 12.2229V67.8125C214.896 74.563 220.448 80.0354 227.297 80.0354H328.357C335.206 80.0354 340.758 74.563 340.758 67.8125V12.2229C340.758 5.47237 335.206 0 328.357 0H227.297ZM244.999 55.8917V41.8012H253.993C262.21 41.8012 266.579 37.2604 266.579 30.379C266.579 23.4976 262.21 19.3782 253.993 19.3782H239.205V55.8917H244.999ZM244.999 24.8084H252.663C257.982 24.8084 260.595 26.9617 260.595 30.5663C260.595 34.1708 258.077 36.3242 252.9 36.3242H244.999V24.8084ZM276.795 56.6407C281.212 56.6407 284.109 54.7214 285.439 51.4445C285.819 55.0959 288.052 56.9684 292.896 55.7044L292.944 51.819C290.996 52.0063 290.616 51.3041 290.616 49.2912V39.7415C290.616 34.124 286.864 30.8003 279.93 30.8003C273.09 30.8003 269.148 34.1708 269.148 39.8819H274.468C274.468 37.1668 276.415 35.5284 279.835 35.5284C283.444 35.5284 285.107 37.0732 285.059 39.7415V40.9586L278.932 41.614C272.045 42.3629 268.246 44.9376 268.246 49.4316C268.246 53.1298 270.905 56.6407 276.795 56.6407ZM277.982 52.4276C274.99 52.4276 273.803 50.836 273.803 49.2443C273.803 47.091 276.273 46.1079 281.117 45.5462L284.917 45.1249C284.679 49.2443 281.877 52.4276 277.982 52.4276ZM310.537 57.7174C308.115 63.5221 304.22 65.2541 298.141 65.2541H295.528V60.4793H298.331C301.655 60.4793 303.27 59.4494 305.028 56.5002L294.246 31.5493H300.23L307.925 49.7593L314.764 31.5493H320.606L310.537 57.7174Z"
                  fill="rgb(90, 49, 244)"
                ></path>
                <path
                  d="M29.5136 35.1798C21.5797 33.4835 18.0451 32.8197 18.0451 29.8064C18.0451 26.9722 20.4371 25.5604 25.221 25.5604C29.4282 25.5604 32.5036 27.3726 34.7674 30.9232C34.9382 31.1972 35.2906 31.292 35.5789 31.1445L44.506 26.6983C44.8263 26.5402 44.9438 26.1399 44.7623 25.8343C41.0569 19.5022 34.2121 16.0358 25.1996 16.0358C13.3574 16.0358 6 21.7885 6 30.9338C6 40.648 14.9591 43.1029 22.9038 44.7992C30.8484 46.4955 34.3936 47.1592 34.3936 50.1725C34.3936 53.1858 31.8095 54.6082 26.6518 54.6082C21.8893 54.6082 18.3548 52.4589 16.2191 48.2866C16.059 47.981 15.6852 47.8546 15.3756 48.0127L6.46985 52.364C6.16017 52.5221 6.03203 52.8908 6.19221 53.2069C9.72673 60.2134 16.9773 64.1538 26.6625 64.1538C38.996 64.1538 46.4494 58.496 46.4494 49.0663C46.4494 39.6365 37.4476 36.8972 29.5136 35.2009V35.1798Z"
                  fill="rgb(90, 49, 244)"
                ></path>
                <path
                  d="M77.3525 16.0358C72.291 16.0358 67.8168 17.8059 64.6026 20.9561C64.3997 21.1458 64.0687 21.0088 64.0687 20.7349V0.621625C64.0687 0.273937 63.791 0 63.4387 0H52.2692C51.9168 0 51.6391 0.273937 51.6391 0.621625V63.0476C51.6391 63.3952 51.9168 63.6692 52.2692 63.6692H63.4387C63.791 63.6692 64.0687 63.3952 64.0687 63.0476V35.6644C64.0687 30.3754 68.1798 26.319 73.7219 26.319C79.2639 26.319 83.279 30.2911 83.279 35.6644V63.0476C83.279 63.3952 83.5566 63.6692 83.909 63.6692H95.0785C95.4309 63.6692 95.7085 63.3952 95.7085 63.0476V35.6644C95.7085 24.1591 88.0628 16.0464 77.3525 16.0464V16.0358Z"
                  fill="rgb(90, 49, 244)"
                ></path>
                <path
                  d="M118.389 14.2552C112.324 14.2552 106.622 16.0779 102.542 18.7224C102.265 18.9016 102.169 19.2703 102.34 19.5548L107.262 27.8466C107.444 28.1416 107.828 28.247 108.127 28.0679C111.224 26.2241 114.769 25.2653 118.389 25.2864C128.138 25.2864 135.303 32.0716 135.303 41.0377C135.303 48.6763 129.569 54.3342 122.297 54.3342C116.371 54.3342 112.26 50.9311 112.26 46.1266C112.26 43.3767 113.445 41.122 116.531 39.5311C116.851 39.3625 116.969 38.9727 116.777 38.6671L112.132 30.9126C111.982 30.6598 111.662 30.5439 111.373 30.6492C105.148 32.925 100.78 38.4037 100.78 45.7579C100.78 56.8839 109.761 65.1863 122.287 65.1863C136.916 65.1863 147.434 55.1876 147.434 40.8481C147.434 25.476 135.197 14.2446 118.368 14.2446L118.389 14.2552Z"
                  fill="rgb(90, 49, 244)"
                ></path>
                <path
                  d="M180.098 15.9515C174.449 15.9515 169.409 18.006 165.725 21.6304C165.522 21.8306 165.191 21.6831 165.191 21.4092V17.0473C165.191 16.6996 164.914 16.4256 164.561 16.4256H153.68C153.328 16.4256 153.05 16.6996 153.05 17.0473V79.3784C153.05 79.7261 153.328 80 153.68 80H164.849C165.202 80 165.48 79.7261 165.48 79.3784V58.9385C165.48 58.6645 165.811 58.5276 166.013 58.7067C169.687 62.0782 174.545 64.0485 180.109 64.0485C193.211 64.0485 203.43 53.5862 203.43 39.9947C203.43 26.4032 193.2 15.941 180.109 15.941L180.098 15.9515ZM177.995 53.4914C170.541 53.4914 164.892 47.6439 164.892 39.9104C164.892 32.177 170.53 26.3295 177.995 26.3295C185.459 26.3295 191.086 32.0822 191.086 39.9104C191.086 47.7387 185.533 53.4914 177.984 53.4914H177.995Z"
                  fill="rgb(90, 49, 244)"
                ></path>
              </svg>
            </shop-pay-logo>
          </span>
          <button className="underline">View sample plans</button>
        </p>

        {ctArr.some((item) => product.handle.includes(item)) ? (
          <div className="mt-[20px] mb-6 flex justify-start items-center gap-[5px]">
            <h5 className="h-full font-bold text-[13px] mr-5 flex justify-center items-center font-body text-[#2f2f2f] pt-[10px]">
              Total Carat Weight:
            </h5>
            <div className="h-full flex justify-center items-center gap-[5px]">
              <Link
                style={{
                  backgroundColor: matches.includes('-1-00-ct') ? 'white' : '',
                  border: matches.includes('-1-00-ct') ? '2px solid black' : '',
                  color: matches.includes('-1-00-ct') ? 'black' : '',
                  cursor: matches.includes('-1-00-ct') ? 'default' : '',
                }}
                prefetch="intent"
                className=" border-2 px-[12px] py-[15px] rounded-full hover:bg-[#DEA595] hover:text-white ease-linear duration-75 sm: text-[13px]"
                to={`/products/${modifiedStringwithCarat}-1-00-ct`}
              >
                1.0ct
              </Link>
              <Link
                style={{
                  backgroundColor: matches.includes('-1-50-ct') ? 'white' : '',
                  border: matches.includes('-1-50-ct') ? '2px solid black' : '',
                  color: matches.includes('-1-50-ct') ? 'black' : '',
                  cursor: matches.includes('-1-50-ct') ? 'default' : '',
                }}
                className=" border-2 px-[12px] py-[15px] rounded-full hover:bg-[#DEA595] hover:text-white ease-linear duration-75 sm: text-[13px]"
                prefetch="intent"
                to={`/products/${modifiedStringwithCarat}-1-50-ct`}
              >
                1.5ct
              </Link>
              <Link
                style={{
                  backgroundColor: matches.includes('-2-00-ct') ? 'white' : '',
                  border: matches.includes('-2-00-ct') ? '2px solid black' : '',
                  color: matches.includes('-2-00-ct') ? 'black' : '',
                  cursor: matches.includes('-2-00-ct') ? 'default' : '',
                }}
                className=" border-2 px-[12px] py-[15px] rounded-full hover:bg-[#DEA595] hover:text-white ease-linear duration-75 sm: text-[13px]"
                prefetch="intent"
                to={`/products/${modifiedStringwithCarat}-2-00-ct`}
              >
                2.0ct
              </Link>
            </div>
          </div>
        ) : undefined}
        <ProductDescription descriptionHtml={descriptionHtml} />
        {_.includes(matches, 'moissanite') ||
        _.includes(matches, 'lab-grown-diamond') ? (
          <ClickAwayListener onClickAway={() => setIsGemStoneOpt(false)}>
            <div className="relative mt-3 mb-[17px] w-full text-[#595959] tracking-wide">
              <select className="text-[#595959] font-body align-middle leading-[19.5px] w-full h-[41.5px] cursor-pointer bg-transparent px-[15px] py-[10px] focus:border-transparent text-[13px] focus:outline-none border border-[#E5E7EB] z-10">
                <option> Gemstone: Moissanite </option>
                <option> Gemstone: Lab Grown Diamond </option>
              </select>
              <AiOutlineDown className="absolute right-[15px] top-[14px] text-sm text-[#000] z-[-1]" />
            </div>

            {/* <div
            onClick={() => setIsGemStoneOpt((prev) => !prev)}
            className="relative flex justify-between items-center pr-[12.5px] pl-[15px] pt-[10px] pb-[10px] mt-3 mb-[15px] text-[13px] border-[1px] border-[#e0e0e0] cursor-pointer font-body"
          >
            <div>
            
            <span className="text-[#595959] tracking-wide">Gemstone</span>:
            <span className="text-[#595959] tracking-wide">
              {_.includes(matches, 'moissanite')
                ? ' Moissanite'
                : ' Lab Grown Diamond'}
            </span>
            </div>
            <AiOutlineDown className="text-sm text-[#000]" />
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
          </div> */}
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
        <div className="flex justify-center text-[#2f2f2f] text-[13px] font-body mt-3">
          <button className="link-underline link-underline-black">
            More payment options
          </button>
        </div>
        <div className="justify-center justify-items-center items-center	content-center	flex  flex-col mt-[10px] mb-[5px] font-body text-[#2f2f2f]">
          <div className="flex gap-1 justify-center	align-center items-center w-auto">
            <img
              className="w-[115px]"
              src="https://cdn.shopify.com/s/files/1/0484/1429/4167/files/One_Tree_Planted_horizontal_logo_1.png?v=1662472737"
              alt=""
            />
            <p>For each purchase</p>
          </div>
          <div className="w-auto text-[13px]">
            <a href="/pages/plant-a-tree" target="_blank" className="underline">
              Learn more
            </a>
          </div>
        </div>
        <div className="flex justify-center text-[5px]">
          <WishlistButton />
        </div>

        <div className="flex justify-center items-center my-[10px] text-[13px] font-body text-[#2f2f2f]">
          {/* <FcShipped className="text-5xl mr-3" /> */}
          <span className="">
            Order this item now and we will ship by{' '}
            <span className="font-bold">{shipDtae}</span>
          </span>{' '}
        </div>
      </div>
    </div>
  );
}

function ProductPrice({selectedVariant}) {
  return (
    <div className="product-price font-body font-medium tracking-[2px]  	">
      {selectedVariant?.compareAtPrice ? (
        <>
          {/*  <p className="text-xs underline text-black tracking-normal mb-1">
            Sale
          </p> */}
          <div className="product-price-on-sale flex flex-row	justify-items-center justify-start max-lg:justify-center mt-[15px]">
            {selectedVariant ? (
              <Money
                className="text-red-600 text-[16px] mr-2 "
                data={selectedVariant.price}
              />
            ) : null}
            <s className="!text-black">
              <Money
                className=" text-[16px] ml-[30px]"
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
    <div className="product-form border-[#bfbfbf] font-body">
      <div className=" gap-x-3 grid grid-cols-2 max-sm:flex flex-col gap-y-3  ">
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
      </div>
      <ProductExtraInputType product={product} />
      <ProductExtraInputTag product={product} />
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
                  attributes: [
                    {
                      key: 'leng',
                      value: 'hasdasakan',
                    },
                  ],
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
      <ShopPayButton
        className="mt-[20px] text-xs"
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
          className="flex justify-between relative items-center px-[14px] py-[10px]  text-[13px] border cursor-pointer text-[#595959] tracking-wide"
          key={option.name}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div>
            <span className="">{option.name}</span>:{' '}
            <span> {activeOption} </span>
            {isOpen ? (
              <div className="modal-shadow absolute z-10 right-[calc(100%+5px)] top-[50%] translate-y-[-50%]">
                <div className="  rounded-xl h-[165px] w-[390px] flex justify-center items-center flex-col clip-path bg-[#efefef]">
                  {option.values.map(({value, isAvailable, isActive, to}) => {
                    return (
                      <Link
                        className=" text-[#2f2f2f] hover:underline text-center text-sm tracking-widest py-[10px] uppercase w-full active:bg-white select-none"
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
              </div>
            ) : undefined}
          </div>
          <AiOutlineDown className="text-sm text-[#000]" />
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
            className="border flex items-center justify-center w-full align-middle 
            mt-[15px] px-2 py-3 h-auto text-[11px] font-bold uppercase bg-[#2f2f2f]
          border-[#2f2f2f] tracking-[2.2px] text-white hover:bg-[#fff0e7] hover:text-[#2f2f2f]"
            style={{transition: 'all ease 150ms'}}
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
  const refHorizontal = useRef();
  const refVertical = useRef();
  const isReverse = useRef(false);
  const handleAnimate = () => {
    if (!isReverse.current) {
      isReverse.current = true;
      gsap.to(ref.current, {height: 'auto'});
      gsap.to(refHorizontal.current, {rotate: 270, duration: 0.4, opacity: 0});
      gsap.to(refVertical.current, {rotate: 180, duration: 0.4});
    } else {
      isReverse.current = false;
      gsap.to(ref.current, {
        height: window.innerWidth < 1024 ? '58px' : '70px',
      });
      gsap.to(refHorizontal.current, {rotate: 90, duration: 0.4, opacity: 1});
      gsap.to(refVertical.current, {rotate: 0, duration: 0.4});
    }
  };

  return (
    <div
      ref={ref}
      className="h-[70px] max-lg:h-[58px] overflow-hidden border-y text-[var] text-xs font-medium tracking-wide"
    >
      <p
        onClick={() => handleAnimate()}
        className="uppercase relative cursor-pointer font-body tracking-[2px] py-[26px] max-lg:py-5 flex justify-between items-center text-[#2f2f2f]"
      >
        <strong>Description</strong>
        <span
          ref={refHorizontal}
          className='absolute right-0 after:content-[""] w-[11px] h-[1px] bg-[#2f2f2f] rotate-90'
        ></span>
        <span
          ref={refVertical}
          className='absolute right-0 after:content-[""] w-[11px] h-[1px] bg-[#2f2f2f]'
        ></span>
      </p>
      <div
        className="product-description-detail [&>div]:bg-[#f9fafb] pb-11 text-[13px] text-[#2f2f2f] leading-[19.5px] [&>p]:font-body"
        dangerouslySetInnerHTML={{__html: descriptionHtml}}
      />
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
      handle
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
      products (first:8 ) {
    
          nodes  {
          title
          handle
          variants (first:1) {
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
