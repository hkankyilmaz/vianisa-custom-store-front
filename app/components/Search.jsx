import {
  Link,
  Form,
  useParams,
  useFetcher,
  useFetchers,
  useLocation,
} from '@remix-run/react';
import {
  Image,
  Money,
  Pagination,
  getPaginationVariables,
} from '@shopify/hydrogen';
import React, {useRef, useEffect, useState} from 'react';
import {json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData, useNavigate, useSubmit} from '@remix-run/react';
import Slider from '@mui/material/Slider';
import useGetSearchParams from '~/hooks/useGetSearchParams';
import useGenerateCollectionQuery from '~/hooks/useGenerateCollectionQuery';
import useFindCollectionMaxAndMinPrice from '~/hooks/useFindCollectionMaxAndMinPrice';
import {AiOutlineDown} from 'react-icons/ai';
import {useVariantUrl} from '~/utils';
import {
  GridChanger,
  SortForm,
  LoadMoreButton,
  PageHeader,
  FilterForm,
} from '~/components/Collection Page UI-Forms/Index';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import useIsomorphicLayoutEffect, {stripUrl} from '~/utils';
import {CloseButton} from '~/components/Header/Drawer';
export const NO_PREDICTIVE_SEARCH_RESULTS = [
  {type: 'queries', items: []},
  {type: 'products', items: []},
  {type: 'collections', items: []},
  {type: 'pages', items: []},
  {type: 'articles', items: []},
];

export function SearchForm({searchTerm}) {
  const inputRef = useRef(null);

  // focus the input when cmd+k is pressed
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'k' && event.metaKey) {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === 'Escape') {
        inputRef.current?.blur();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Form method="get">
      <input
        defaultValue={searchTerm}
        name="q"
        placeholder="Search…"
        ref={inputRef}
        type="search"
        autofocus
      />
      &nbsp;
      <button type="submit">Search</button>
    </Form>
  );
}

export function SearchResults({results, title}) {
  if (!results) {
    return null;
  }

  const keys = Object.keys(results);

  const maxvalues = results.products.nodes
    .map((product) => Number(product.priceRange.maxVariantPrice.amount))
    .sort((a, b) => b - a);
  const minvalues = results.products.nodes
    .map((product) => Number(product.priceRange.minVariantPrice.amount))
    .sort((a, b) => a - b);
  const maxValue = maxvalues[0];
  const minValue = minvalues[0];

  const [openFilterDesk, setOpenFilterDesk] = useState(false);
  const [value, setValue] = useState([0, 1000]);
  /* const [colorValue, setColorValue] = useState('yellow'); */
  const [grid, setGrid] = useState(true);
  let root_ = document.documentElement.style;

  // user visit the page first time, back to page and forward to page --> set the min and max price from url
  useEffect(() => {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let minPrice = params.get('minprice');
    let maxPrice = params.get('maxprice');
    /*  let color = params.get('color');
    console.log('useeffect color', colorValue);
    console.log('useeffect maxprice', maxPrice); */
    /* if (colorValue) {
      setColorValue(colorValue);
    } */
    if (minPrice && maxPrice) {
      setValue([+minPrice, +maxPrice]);
    }
  }, []);

  const openMobileFilter = () => {
    root_.setProperty('--filter-container-visibility', 'visible');
    root_.setProperty('--filter-form-position', 'translateX(0%)');
    root_.setProperty('--see-result-button-position', 'translateY(0%)');
    root_.setProperty('--see-result-button-opacity', '1');
    root_.setProperty(
      '--see-result-button-transition',
      'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.35s, opacity 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.35s',
    );
    document.documentElement.style.overflowY = 'hidden';
  };

  const openMobileSort = () => {
    root_.setProperty('--sort-modal-visibility', 'visible');
    root_.setProperty('--sort-modal-position', 'translateY(0%)');
    document.documentElement.style.overflowY = 'hidden';
  };
  const closeMobileSort = () => {
    root_.setProperty('--sort-modal-visibility', 'hidden');
    root_.setProperty('--sort-modal-position', 'translateY(100%)');
    document.documentElement.style.overflowY = 'auto';
  };
  return (
    <div>
      {results &&
        keys.map((type) => {
          const resourceResults = results[type];

          {
            /*  if (resourceResults.nodes[0]?.__typename === 'Page') {
            const pageResults = resourceResults;
            return resourceResults.nodes.length ? (
              <SearchResultPageGrid key="pages" pages={pageResults} />
            ) : null;
          } */
          }

          if (resourceResults.nodes[0]?.__typename === 'Product') {
            const productResults = resourceResults;
            console.log(productResults);
            return resourceResults.nodes.length ? (
              <ProductsGrid
                products={productResults.nodes}
                grid={grid}
                value={value}
                setValue={setValue}
                maxValue={maxValue}
                minValue={minValue}
                handle={title}
              />
            ) : null;
          }
          {
            /* <ProductItem key="products" products={productResults} /> */
            /* <SearchResultsProductsGrid
                key="products"
                products={productResults}
              /> 
              <ProductsGrid products={productResults} />*/
          }
          {
            /*      if (resourceResults.nodes[0]?.__typename === 'Article') {
            const articleResults = resourceResults;
            return resourceResults.nodes.length ? (
              <SearchResultArticleGrid
                key="articles"
                articles={articleResults}
              />
            ) : null;
          } */
          }

          return null;
        })}
    </div>
  );
}

function ProductsGrid({
  products,
  value,
  setValue,
  colorValue,
  setColorValue,
  maxValue,
  grid,
  handle,
}) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  /*   let array = products.map((product) => product.options);
  console.log(array);
  let mater = array.map((item) => item.find((it) => it.name === 'Material'));
  let cole = array.map((item) => item.find((it) => it.name === 'Color'));
  console.log(mater);
  console.log(groupedData); */
  let url = useLocation();
  let params = new URLSearchParams(url.search);
  const handleOnChangeCommitted = (event, newValue) => {
    setValue(newValue);
    /*  console.log('colorvalue', colorValue); */
    // Add a third parameter.
    params.set('minprice', value[0]);
    params.set('maxprice', value[1]);
    /*  params.set('color', colorValue); */
    navigate(`?${params.toString()}`);
  };

  const closeMobileFilter = () => {
    let root_ = document.documentElement.style;
    root_.setProperty('--filter-container-visibility', 'hidden');
    root_.setProperty('--filter-form-position', 'translateX(100%)');
    root_.setProperty('--see-result-button-position', 'translateY(100%)');
    root_.setProperty('--see-result-button-opacity', '0');
    root_.setProperty(
      '--see-result-button-transition',
      'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    );

    document.documentElement.style.overflowY = 'auto';
  };

  const [openAccordion, setOpenAccordion] = useState(null);
  const accordionRefs = useRef([]);
  const refsHorizontal = Array.from({length: 3}, () => useRef(null));
  const refsVertical = Array.from({length: 3}, () => useRef(null));

  const handleAccordionClick = (index) => {
    const refHorizontal = refsHorizontal[index];
    const refVertical = refsVertical[index];
    if (index !== openAccordion) {
      if (openAccordion !== null) {
        const currentRefHorizontal = refsHorizontal[openAccordion];
        const currentRefVertical = refsVertical[openAccordion];
        gsap.to(currentRefHorizontal.current, {
          rotate: 90,
          duration: 0.4,
          opacity: 1,
        });
        gsap.to(currentRefVertical.current, {rotate: 0, duration: 0.4});
      }
    }
    if (index !== openAccordion) {
      setOpenAccordion(index);
      gsap.to(refHorizontal.current, {rotate: 270, duration: 0.4, opacity: 0});
      gsap.to(refVertical.current, {rotate: 180, duration: 0.4});
    } else {
      setOpenAccordion(null);
      gsap.to(refHorizontal.current, {rotate: 90, duration: 0.4, opacity: 1});
      gsap.to(refVertical.current, {rotate: 0, duration: 0.4});
    }
    if (index === openAccordion) {
      gsap.to(
        accordionRefs.current[index].querySelector('.accordion__details'),
        {
          height: 0,
          duration: 0.35,
          ease: 'power1.inOut',
        },
      );
    } else {
      if (openAccordion !== null) {
        gsap.to(
          accordionRefs.current[openAccordion].querySelector(
            '.accordion__details',
          ),
          {
            height: 0,
            duration: 0.35,
            ease: 'power1.inOut',
          },
        );
      }
      setOpenAccordion(index);
      gsap.fromTo(
        accordionRefs.current[index].querySelector('.accordion__details'),
        {height: 0},
        {
          height: 'auto',
          duration: 0.35,
          ease: 'power1.inOut',
        },
      );
    }
  };

  return (
    <div className="mt-[50px] flex max-lg:gap-0 max-[1139px]:gap-4 max-lg:m-0 max-[1139px]:ml-6 ml-[50px]">
      <div className="lg:min-w-[200px]">
        <span
          onClick={() => closeMobileFilter()}
          className="filter-modal-overlay max-lg:bg-[#363636]/50 fixed left-0 top-0 bottom-0 right-0 z-10"
        ></span>
        <Form
          method="get"
          onChange={(e) => {
            /* params.set('minprice', value[0]);
            params.set('maxprice', value[1]); */
            submit(e.currentTarget);
            // console.log(e);
          }}
          className="filter-form-mobile max-lg:fixed right-0 top-0 bottom-0 max-sm:left-[65px] max-sm:w-auto  max-lg:bg-[#efefef] max-lg:z-10 max-lg:w-[400px]"
        >
          <header className="lg:hidden h-[60px] flex justify-center items-center font-playfair text-xl tracking-[4px] font-bold sm:mb-[35px] border-b border-[#e0e0e0]">
            <span>FILTERS</span>
            <div className="absolute right-[30px]">
              <CloseButton onClick={() => closeMobileFilter()} />
            </div>
          </header>
          <div className="accordion__container ">
            <div
              className={`accordion__item max-sm:border-b border-[#e0e0e0] ${
                openAccordion === 0 ? 'open' : ''
              }`}
              ref={(e) => (accordionRefs.current[0] = e)}
            >
              <div
                className="accordion__header px-6 py-5 cursor-pointer sm:hidden"
                onClick={() => handleAccordionClick(0)}
              >
                <p className=" relative accordion__name  font-montserratMd text-xs text-[#2f2f2f] tracking-[2.4px]">
                  PRICE
                  <span
                    ref={refsHorizontal[0]}
                    className='absolute bottom-2 right-0 after:content-[""] w-[11px] h-[1px] bg-[#2f2f2f] rotate-90'
                  ></span>
                  <span
                    ref={refsVertical[0]}
                    className='absolute bottom-2 right-0 after:content-[""] w-[11px] h-[1px] bg-[#2f2f2f]'
                  ></span>
                </p>
              </div>
              <div className="accordion__details sm:!overflow-visible sm:!h-auto">
                <div className="mb-8  max-lg:px-6">
                  <p className="font-montserratMd text-xs text-[#2f2f2f] tracking-[2.4px] mb-2 max-sm:hidden">
                    PRICE
                  </p>
                  <Slider
                    className="max-w-[100%] mb-1"
                    sx={{color: 'gray'}}
                    size="small"
                    value={value}
                    onChange={handleChange}
                    onChangeCommitted={handleOnChangeCommitted}
                    valueLabelDisplay="auto"
                    max={maxValue}
                    min={0}
                  />
                  <div className="flex justify-between ">
                    <FilterForm.PriceInput value={value} idx={0} />
                    <FilterForm.Seperator />
                    <FilterForm.PriceInput value={value} idx={1} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`accordion__item max-sm:border-b border-[#e0e0e0]  ${
                openAccordion === 1 ? 'open' : ''
              }`}
              ref={(e) => (accordionRefs.current[1] = e)}
            >
              <div
                className="accordion__header px-6 py-5 cursor-pointer sm:hidden"
                onClick={() => handleAccordionClick(1)}
              >
                <p className="relative accordion__name  font-montserratMd text-xs text-[#2f2f2f] tracking-[2.4px]">
                  COLOR
                  <span
                    ref={refsHorizontal[1]}
                    className='absolute bottom-2 right-0 after:content-[""] w-[11px] h-[1px] bg-[#2f2f2f] rotate-90'
                  ></span>
                  <span
                    ref={refsVertical[1]}
                    className='absolute bottom-2 right-0 after:content-[""] w-[11px] h-[1px] bg-[#2f2f2f]'
                  ></span>
                </p>
              </div>
              <div className="accordion__details sm:!h-auto">
                <div className="mb-4  max-lg:px-6">
                  <p className="mb-4 font-montserratMd text-xs text-[#2f2f2f] tracking-[2.4px] max-sm:hidden">
                    COLOR
                  </p>
                  <p
                    htmlFor="rose"
                    className="mb-3 font-questrial hover:underline hover:cursor-pointer"
                  >
                    <FilterForm.ColorOrMetarialInput
                      value="rose"
                      name="color"
                    />
                  </p>
                  <p className="mb-3 font-questrial hover:underline hover:cursor-pointer">
                    <FilterForm.ColorOrMetarialInput
                      value="white"
                      name="color"
                    />
                  </p>
                  <p className="mb-8 font-questrial hover:underline hover:cursor-pointer">
                    <FilterForm.ColorOrMetarialInput
                      value="yellow"
                      name="color"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`accordion__item max-sm:border-b border-[#e0e0e0]  ${
                openAccordion === 2 ? 'open' : ''
              }`}
              ref={(e) => (accordionRefs.current[2] = e)}
            >
              <div
                className="accordion__header px-6 py-5 cursor-pointer sm:hidden"
                onClick={() => handleAccordionClick(2)}
              >
                <p className="relative accordion__name  font-montserratMd text-xs text-[#2f2f2f] tracking-[2.4px]">
                  MATERIAL
                  <span
                    ref={refsHorizontal[2]}
                    className='absolute bottom-2 right-0 after:content-[""] w-[11px] h-[1px] bg-[#2f2f2f] rotate-90'
                  ></span>
                  <span
                    ref={refsVertical[2]}
                    className='absolute bottom-2 right-0 after:content-[""] w-[11px] h-[1px] bg-[#2f2f2f]'
                  ></span>
                </p>
              </div>
              <div className="accordion__details sm:!h-auto">
                <div className="mb-8  max-lg:px-6">
                  <p className="mb-4 font-montserratMd text-xs text-[#2f2f2f] tracking-[2.4px] max-sm:hidden">
                    MATERIAL
                  </p>
                  <p className="mb-3 font-questrial hover:underline hover:cursor-pointer">
                    <FilterForm.ColorOrMetarialInput
                      value="10kgold"
                      name="material"
                    />
                  </p>
                  <p className="mb-3 font-questrial hover:underline hover:cursor-pointer">
                    <FilterForm.ColorOrMetarialInput
                      value="14kgold"
                      name="material"
                    />
                  </p>
                  <p className="mb-8 font-questrial hover:underline hover:cursor-pointer">
                    <FilterForm.ColorOrMetarialInput
                      value="18kgold"
                      name="material"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="max-lg:hidden">
            <button
              style={{
                display: params.size > 0 ? 'block' : 'none',
                transition: 'all ease 0.35s',
              }}
              className="border flex items-center justify-center w-min h-full align-middle 
            mt-14 px-7 py-[14px] text-[11px] font-bold font-montserratMd uppercase bg-black
            border-black tracking-[2.2px] text-white hover:bg-[#fff0e7] hover:text-black"
              type="reset"
              onClick={() => {
                setValue([0, 1000]);
                navigate(`/search?q=${handle}&type=PRODUCT`);
              }}
            >
              Reset
            </button>
          </div>
          <div className="lg:hidden px-[30px] py-6 see-result-button absolute bottom-0 left-0 right-0 border-t border-[#e0e0e0]">
            <button
              style={{
                transition: 'all ease 0.35s',
              }}
              className="max-sm:w-[200px] border flex items-center justify-center align-middle max-sm:ml-5 ml-8
              px-7 py-[14px] text-[11px] font-bold font-montserratMd uppercase bg-[#2f2f2f]
            border-[#2f2f2f] tracking-[2.2px] text-white hover:bg-[#fff0e7] hover:text-[#2f2f2f]"
              onClick={() => closeMobileFilter()}
            >
              SEE RESULTS
            </button>
          </div>
        </Form>
      </div>
      {grid ? (
        <div className="grid max-sm:grid-cols-2 max-[1139px]:grid-cols-3 grid-cols-4 max-sm:gap-x-[10px] max-[1139px]:gap-x-6 gap-x-[60px] max-[1139px]:gap-y-[50px] gap-y-[75px] pl-[60px] pr-[50px] max-sm:px-3 max-[1139px]:px-6 pb-4 pt-[10px] max-lg:pt-[60px]">
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 max-[1139px]:gap-x-6 gap-x-[60px] max-[1139px]:gap-y-[50px] gap-y-[75px] pl-[60px] pr-[50px] max-sm:px-3 max-[1139px]:px-6 pb-4 pt-[10px] max-lg:pt-[60px]">
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
      )}
    </div>
  );
}
function SearchResultsProductsGrid({products}) {
  // console.log(products);
  return (
    <div className="search-result">
      <h3>Products</h3>
      <Pagination connection={products}>
        {({nodes, isLoading, NextLink, PreviousLink}) => {
          const itemsMarkup = nodes.map((product) => (
            <div className="search-results-item" key={product.id}>
              <Link prefetch="intent" to={`/products/${product.handle}`}>
                <span>{product.title}</span>
              </Link>
            </div>
          ));
          return (
            <div>
              <div>
                <PreviousLink>
                  {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
                </PreviousLink>
              </div>
              <div>
                {itemsMarkup}
                <br />
              </div>
              <div>
                <NextLink>
                  {isLoading ? 'Loading...' : <span>Load more ↓</span>}
                </NextLink>
              </div>
            </div>
          );
        }}
      </Pagination>
      <br />
    </div>
  );
}
function ProductItem({product, loading}) {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  let minPrice = params.get('minprice');
  let maxPrice = params.get('maxprice');
  let color = params.getAll('color');
  color = color[color.length - 1];
  let selectedVariant = color
    ? product.variants.nodes.find((variant) =>
        variant.selectedOptions.find(
          (item) => item.value.toLowerCase() === color,
        ),
      )
    : null;

  const variant = product.variants.nodes[0];
  // const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return (
    <Link className="" key={product.id} prefetch="intent" to={product.handle}>
      <div className="font-montserratMd max-sm:text-[8px] text-[10px] tracking-[2px] text-[#2f2f2f] max-lg:mb-0 mb-3 ml-4">
        ON SALE
      </div>
      {product.featuredImage && (
        <div className="w-full relative overflow-hidden ">
          {selectedVariant ? (
            <>
              <Image
                className="transition-opacity opacity-100 hover:opacity-0"
                alt={selectedVariant.altText || product.title}
                aspectRatio="4/3"
                data={selectedVariant.image}
                loading={'lazy'}
                sizes="(min-width: 45em) 400px, 100vw"
              />
              <Image
                className="transition-opacity opacity-0 hover:opacity-100 absolute top-0 "
                alt={product.images.nodes[1].altText || product.title}
                aspectRatio="4/3"
                data={product.images.nodes[1]}
                loading={'lazy'}
                sizes="(min-width: 45em) 400px, 100vw"
              />
            </>
          ) : (
            <>
              <Image
                className="transition-opacity opacity-100 hover:opacity-0"
                alt={product.featuredImage.altText || product.title}
                aspectRatio="4/3"
                data={product.featuredImage}
                loading={'lazy'}
                sizes="(min-width: 45em) 400px, 100vw"
              />
              <Image
                className="transition-opacity opacity-0 hover:opacity-100 absolute top-0 "
                alt={product.images.nodes[1].altText || product.title}
                aspectRatio="4/3"
                data={product.images.nodes[1]}
                loading={'lazy'}
                sizes="(min-width: 45em) 400px, 100vw"
              />
            </>
          )}
        </div>
      )}
      <h4 className="dynamic-margin-top mt-14 mb-1 font-montserratMd max-sm:text-[10px] text-[11px] tracking-[2.2px] text-[#2f2f2f] uppercase">
        {product.title}
      </h4>
      <div className="flex gap-[10px]">
        <Money
          className="font-montserratMd max-sm:text-[10px] text-[11px] font-bold tracking-[2.2px] text-[#e22120]"
          data={product.priceRange.minVariantPrice}
        />
        <s className="!text-black">
          <Money
            className="font-montserratMd max-sm:text-[10px] text-[11px] tracking-[2.2px] text-[#2f2f2f]"
            data={product.variants.nodes[0].compareAtPrice}
          />
        </s>
      </div>
    </Link>
  );
}
/*
function SearchResultsProductsGrid({products}) {
  console.log(products);
  return (
    <div className="search-result">
      <h3>Products</h3>
      <Pagination connection={products}>
        {({nodes, isLoading, NextLink, PreviousLink}) => {
          const itemsMarkup = nodes.map((product) => (
            <div className="search-results-item" key={product.id}>
              <Link prefetch="intent" to={`/products/${product.handle}`}>
                <span>{product.title}</span>
              </Link>
            </div>
          ));
          return (
            <div>
              <div>
                <PreviousLink>
                  {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
                </PreviousLink>
              </div>
              <div>
                {itemsMarkup}
                <br />
              </div>
              <div>
                <NextLink>
                  {isLoading ? 'Loading...' : <span>Load more ↓</span>}
                </NextLink>
              </div>
            </div>
          );
        }}
      </Pagination>
      <br />
    </div>
  );
}*/
function SearchResultPageGrid({pages}) {
  return (
    <div className="search-result">
      <h2>Pages</h2>
      <div>
        {pages?.nodes?.map((page) => (
          <div className="search-results-item" key={page.id}>
            <Link prefetch="intent" to={`/pages/${page.handle}`}>
              {page.title}
            </Link>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
}

function SearchResultArticleGrid({articles}) {
  return (
    <div className="search-result">
      <h2>Articles</h2>
      <div>
        {articles?.nodes?.map((article) => (
          <div className="search-results-item" key={article.id}>
            <Link prefetch="intent" to={`/blog/${article.handle}`}>
              {article.title}
            </Link>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
}

export function NoSearchResults() {
  return <p>No results, try a different search.</p>;
}

/**
 *  Search form component that posts search requests to the `/search` route
 **/
export function PredictiveSearchForm({
  action,
  children,
  className = 'predictive-search-form',
  method = 'POST',
  ...props
}) {
  const params = useParams();
  const fetcher = useFetcher();
  const inputRef = useRef(null);

  function fetchResults(event) {
    const searchAction = action ?? '/api/predictive-search';
    const localizedAction = params.locale
      ? `/${params.locale}${searchAction}`
      : searchAction;
    const newSearchTerm = event.target.value || '';
    fetcher.submit(
      {q: newSearchTerm, limit: '6'},
      {method, action: localizedAction},
    );
  }

  // ensure the passed input has a type of search, because SearchResults
  // will select the element based on the input
  useEffect(() => {
    inputRef?.current?.setAttribute('type', 'search');
  }, []);

  return (
    <fetcher.Form
      {...props}
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!inputRef?.current || inputRef.current.value === '') {
          return;
        }
        inputRef.current.blur();
      }}
    >
      {children({fetchResults, inputRef, fetcher})}
    </fetcher.Form>
  );
}

export function PredictiveSearchResults() {
  const {results, totalResults, searchInputRef, searchResults, searchTerm} =
    usePredictiveSearch();
  // console.log(results);
  function goToSearchResult(event) {
    if (!searchInputRef.current) return;
    searchInputRef.current.blur();
    searchInputRef.current.value = '';
    // close the aside
    window.location.href = event.currentTarget.href;
  }

  if (!totalResults) {
    return <NoPredictiveSearchResults searchTerm={searchTerm} />;
  }

  return (
    <div className="predictive-search-results px-[50px]  mt-[42px]">
      {/* view all results /search?q=term */}
      <div className="mb-[34px] pb-[10px] border-b border-[#e0e0e0]">
        {searchTerm.current && (
          <Link
            onClick={goToSearchResult}
            to={`/search?q=${searchTerm.current}`}
          >
            <div className="flex justify-between">
              <p className="font-montserratMd text-[11px] tracking-[2.2px] text-[#2f2f2f]">
                {} RESULT
              </p>
              <p className="uppercase font-montserratMd text-[12px] tracking-[2.2px] text-[#2f2f2f]">
                View All
              </p>
              {/* <p>
              View all results for <q>{searchTerm.current}</q>
              &nbsp; →
              </p> */}
            </div>
          </Link>
        )}
      </div>
      <div className="py-7">
        {results.map(({type, items}) => (
          <PredictiveSearchResult
            goToSearchResult={goToSearchResult}
            items={items}
            key={type}
            searchTerm={searchTerm}
            type={type}
          />
        ))}
      </div>
    </div>
  );
}

function NoPredictiveSearchResults({searchTerm}) {
  if (!searchTerm.current) {
    return null;
  }
  return (
    <p>
      No results found for <q>{searchTerm.current}</q>
    </p>
  );
}

function PredictiveSearchResult({goToSearchResult, items, searchTerm, type}) {
  const isSuggestions = type === 'queries';
  const categoryUrl = `/search?q=${
    searchTerm.current
  }&type=${pluralToSingularSearchType(type)}`;
  // console.log(items);
  return type === 'products' ? (
    <div className="predictive-search-result" key={type}>
      {/* <Link prefetch="intent" to={categoryUrl} onClick={goToSearchResult}>
        <h5>{isSuggestions ? 'Suggestions' : type}</h5>
      </Link> */}
      <ul className="grid grid-cols-3 gap-[50px]">
        {items.slice(0, 3).map((item) => (
          <SearchResultItem
            goToSearchResult={goToSearchResult}
            item={item}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  ) : (
    ''
  );
}
/* 
function SearchResultItem({goToSearchResult, item}) {
  return (
    <li className="predictive-search-result-item" key={item.id}>
      <Link onClick={goToSearchResult} to={item.url}>
        {item.image?.url && (
          <Image
            alt={item.image.altText ?? ''}
            src={item.image.url}
            width={50}
            height={50}
          />
        )}
        <div>
          {item.styledTitle ? (
            <div
              dangerouslySetInnerHTML={{
                __html: item.styledTitle,
              }}
            />
          ) : (
            <span>{item.title}</span>
          )}
          {item?.price && (
            <small>
              <Money data={item.price} />
            </small>
          )}
        </div>
      </Link>
    </li>
  );
} */

function SearchResultItem({goToSearchResult, item}) {
  /*  const variant = item.variants.nodes[0];
  const variantUrl = useVariantUrl(item.handle, item.selectedOptions); */
  // console.log(item);
  return (
    <Link
      className="flex-1"
      key={item.id}
      prefetch="intent"
      to={'products/' + item.handle}
    >
      {/* <div className="font-montserratMd max-sm:text-[8px] text-[10px] tracking-[2px] text-[#2f2f2f] max-lg:mb-0 mb-3 ml-4">
        ON SALE
      </div> */}
      {item.image && (
        <div className="w-full relative overflow-hidden">
          <>
            {/* <div className="w-[120px] h-[120px] bg-red-400"></div> */}
            <Image
              className="transition-opacity opacity-100 hover:opacity-0"
              alt={item.image.altText || item.image.title}
              aspectRatio="4/3"
              data={item.image}
              loading={'lazy'}
              sizes="(min-width: 45em) 400px, 100vw"
            />
            {/*  <Image
              className="transition-opacity opacity-0 hover:opacity-100 absolute top-0 "
              alt={item.images.nodes[1].altText || item.title}
              aspectRatio="4/3"
              data={item.images.nodes[1]}
              loading={'lazy'}
              sizes="(min-width: 45em) 400px, 100vw"
            /> */}
          </>
        </div>
      )}
      <h4 className="dynamic-margin-top mt-14 mb-1 font-montserratMd max-sm:text-[10px] text-[11px] tracking-[2.2px] text-[#2f2f2f] uppercase">
        {item.title}
      </h4>
      {/*  <div className="flex gap-[10px]">
        <Money
          className="font-montserratMd max-sm:text-[10px] text-[11px] font-bold tracking-[2.2px] text-[#e22120]"
          data={item.priceRange.minVariantPrice}
        />
        <s className="!text-black">
          <Money
            className="font-montserratMd max-sm:text-[10px] text-[11px] tracking-[2.2px] text-[#2f2f2f]"
            data={item.variants.nodes[0].compareAtPrice}
          />
        </s>
      </div> */}
    </Link>
  );
}

function usePredictiveSearch() {
  const fetchers = useFetchers();
  const searchTerm = useRef('');
  const searchInputRef = useRef(null);
  const searchFetcher = fetchers.find((fetcher) => fetcher.data?.searchResults);
  if (searchFetcher?.state === 'loading') {
    searchTerm.current = searchFetcher.formData?.get('q') || '';
  }

  const search = searchFetcher?.data?.searchResults || {
    results: NO_PREDICTIVE_SEARCH_RESULTS,
    totalResults: 0,
  };

  // capture the search input element as a ref
  useEffect(() => {
    if (searchInputRef.current) return;
    searchInputRef.current = document.querySelector('input[type="search"]');
  }, []);

  return {...search, searchInputRef, searchTerm};
}

/**
 * Converts a plural search type to a singular search type
 * @param type - The plural search type
 * @returns The singular search type
 *
 * @example
 * ```ts
 * pluralToSingularSearchType('articles') // => 'ARTICLE'
 * pluralToSingularSearchType(['articles', 'products']) // => 'ARTICLE,PRODUCT'
 * ```
 */
function pluralToSingularSearchType(type) {
  const plural = {
    articles: 'ARTICLE',
    collections: 'COLLECTION',
    pages: 'PAGE',
    products: 'PRODUCT',
    queries: 'QUERY',
  };

  if (typeof type === 'string') {
    return plural[type];
  }

  return type.map((t) => plural[t]).join(',');
}
