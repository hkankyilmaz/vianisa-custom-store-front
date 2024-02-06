import {
  Await,
  Form,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useSubmit,
} from '@remix-run/react';
import {Image, Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {defer, redirect} from '@shopify/remix-oxygen';
import gsap from 'gsap';
import {Suspense, useEffect, useRef, useState} from 'react';
import {AiOutlineDown} from 'react-icons/ai';
import spinner from '~/assets/gifs/spinner.gif';
import {
  FilterForm,
  GridChanger,
  LoadMoreButton,
  PageHeader,
  ProductItem,
  SortForm,
} from '~/components/Collection Page UI-Forms';
import {CloseButton} from '~/components/Header/Drawer';
import Slider from '~/components/RangeSlider/RangeSlider';
import Spinner from '~/components/Spinner';
import useDefaultCollectionQuery from '~/hooks/useDefaultCollectionQuery';
import useGenerateCollectionQuery from '~/hooks/useGenerateCollectionQuery';
import styles from '../styles/Spinner.css';

export const links = () => [{rel: 'stylesheet', href: styles}];

export const handle = {
  breadcrumb: (match) => match.data.defaultCollection.title,
};

export const meta = ({data}) => {
  return [{title: `${data.defaultCollection.title} Collection`}];
};

export async function loader({request, params, context}) {
  const jsonifyVariantOption = (name, value) => {
    return value.map((item) => {
      return {
        name: name,
        value: item,
      };
    });
  };

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const color = jsonifyVariantOption('Color', searchParams.getAll('color'));
  const material = jsonifyVariantOption(
    'Material',
    searchParams.getAll('material'),
  );
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sortKey = searchParams.get('sortkey');
  const reverse = searchParams.get('reverse');
  const values = Array.from(searchParams.entries()).reduce(
    (acc, [key, value]) => {
      if (acc[key]) {
        if (Array.isArray(acc[key])) {
          acc[key].push(value);
        } else {
          acc[key] = [acc[key], value];
        }
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );

  const COLLECTION_QUERY = useGenerateCollectionQuery(
    [...color, ...material],
    minPrice,
    maxPrice,
    sortKey,
    reverse,
  );
  const DEFAULT_COLLECTION_QUERY = useDefaultCollectionQuery();

  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 48,
  });

  if (!handle) {
    return redirect('/collections');
  }

  const collectionPromise = storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables},
    cache: storefront.CacheLong(),
  });

  const defaultCollection = (
    await storefront.query(DEFAULT_COLLECTION_QUERY, {
      variables: {
        handle: handle,
      },
      cache: storefront.CacheLong(),
    })
  ).collection;

  if (!collectionPromise) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  return defer({collectionPromise, defaultCollection, values});
}

export default function Collection() {
  const submit = useSubmit();
  const {collectionPromise, defaultCollection, values} = useLoaderData();

  const {sortkey, reverse} = values;
  const root_ = document.documentElement.style;

  const [counter, setCounter] = useState(0);

  const [grid, setGrid] = useState(true);
  const [reversed, setReversed] = useState(reverse || false);
  const [productsLoading, setProductsLoading] = useState(true);
  const [sortValue, setSortValue] = useState(sortkey || 'COLLECTION_DEFAULT');

  const openMobileFilter = () => {
    root_.setProperty('--filter-form-opacity', '1');
    root_.setProperty('--filter-container-visibility', 'visible');
    root_.setProperty('--filter-form-position', 'translateX(0%)');
    root_.setProperty('--see-result-button-position', 'translateY(0%)');
    root_.setProperty('--see-result-button-opacity', '1');
    root_.setProperty(
      '--see-result-button-transition',
      'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.35s, opacity 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.35s',
    );
    root_.overflowY = 'hidden';
  };

  const openMobileSort = () => {
    root_.setProperty('--sort-modal-visibility', 'visible');
    root_.setProperty('--sort-modal-position', 'translateY(0%)');
    root_.overflowY = 'hidden';
  };

  const closeMobileSort = () => {
    root_.setProperty('--sort-modal-visibility', 'hidden');
    root_.setProperty('--sort-modal-position', 'translateY(100%)');
    root_.overflowY = 'auto';
  };

  const updateSorting = (sortValue, reversed) => {
    setSortValue(sortValue);
    setReversed(reversed);
  };

  useEffect(() => {
    if (counter === 0) {
      setCounter((prev) => ++prev);
      return;
    }

    const form = document.querySelector('#filter-form');
    submit(form, {preventScrollReset: true});
  }, [sortValue, reversed]);

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={collectionPromise}>
        {(collectionPromise) => (
          <div className="collection" key={collectionPromise.collection.handle}>
            <PageHeader collection={collectionPromise.collection} />
            <div className="w-full max-sm:h-[44px] sm:h-[54px] border-y flex justify-between max-sm:flex-row-reverse items-center">
              <GridChanger setGrid={setGrid} grid={grid} />

              <div className="flex max-sm:grow max-sm:flex-row-reverse">
                <SortButton
                  openMobileSort={openMobileSort}
                  closeMobileSort={closeMobileSort}
                />
                <FilterButton openMobileFilter={openMobileFilter} />
              </div>
            </div>
            <Pagination connection={collectionPromise.collection.products}>
              {({nodes, isLoading, NextLink}) => (
                <>
                  <ProductsGrid
                    defaultPriceRange={
                      JSON.parse(
                        defaultCollection.products.filters[0].values[0].input,
                      ).price
                    }
                    values={values}
                    collection={collectionPromise.collection}
                    grid={grid}
                    products={nodes}
                    handle={collectionPromise.collection.handle}
                    sortValue={sortValue}
                    reversed={reversed}
                    updateSorting={updateSorting}
                    productsLoading={productsLoading}
                    setProductsLoading={setProductsLoading}
                  />
                  <br />
                  {isLoading && !productsLoading ? (
                    <div className="flex justify-center w-full my-5">
                      <img
                        className="spinner-gif"
                        src={spinner}
                        alt="spinner"
                        width={66}
                        height={66}
                      />
                    </div>
                  ) : (
                    <NextLink className="flex justify-center w-full text-xl my-5">
                      {!productsLoading ? <LoadMoreButton /> : undefined}
                    </NextLink>
                  )}
                </>
              )}
            </Pagination>
            <SortForm
              closeMobileSort={closeMobileSort}
              update={updateSorting}
            />
          </div>
        )}
      </Await>
    </Suspense>
  );
}

function SortButton({openMobileSort, closeMobileSort}) {
  return (
    <>
      <div
        onClick={openMobileSort}
        className="max-sm:h-[44px] sm:h-[54px] border-l flex max-sm:grow justify-center items-center relative cursor-pointer select-none max-sm:px-0 px-[45px] py-[18px] text-[#2f2f2f] font-avenir-medium text-xs tracking-[2.4px] "
      >
        SORT
        <AiOutlineDown className=" text-xs ml-2 text-[#2f2f2f]" />
      </div>
      <span
        onClick={closeMobileSort}
        className="sort-modal-overlay max-lg:bg-[#363636]/50 fixed left-0 top-0 bottom-0 right-0 z-[55] lg:z-10"
      ></span>
    </>
  );
}

function FilterButton({openMobileFilter}) {
  return (
    <div
      onClick={openMobileFilter}
      className="max-sm:h-[44px] sm:h-[54px] border-l flex max-sm:grow justify-center items-center relative cursor-pointer select-none max-sm:px-0 px-[45px] py-[18px] text-[#2f2f2f] font-avenir-medium text-xs tracking-[2.4px] lg:hidden "
    >
      FILTER
    </div>
  );
}

function ProductsGrid({
  products,
  grid,
  handle,
  sortValue,
  reversed,
  collection,
  values,
  defaultPriceRange,
  updateSorting,
  productsLoading,
  setProductsLoading,
}) {
  const url = useLocation();
  const submit = useSubmit();
  const navigate = useNavigate();

  const formRef = useRef(null);

  const accordionRefs = useRef([]);
  const refsHorizontal = Array.from({length: 3}, () => useRef(null));
  const refsVertical = Array.from({length: 3}, () => useRef(null));

  const params = new URLSearchParams(url.search);
  const filters = collection.products.filters;

  const [openAccordion, setOpenAccordion] = useState(null);
  const [sliderPriceRange, setSliderPriceRange] = useState([
    parseInt(values.minPrice) || defaultPriceRange.min,
    parseInt(values.maxPrice) || defaultPriceRange.max,
  ]);
  const [inputPriceRange, setInputPriceRange] = useState([
    parseInt(values.minPrice) || defaultPriceRange.min,
    parseInt(values.maxPrice) || defaultPriceRange.max,
  ]);
  const [sliderClass, setSliderClass] = useState({});

  const getOptionValue = (option) => {
    return option.id.split('.').slice(-1)[0];
  };

  const closeMobileFilter = () => {
    const root_ = document.documentElement.style;
    root_.setProperty('--filter-container-visibility', 'hidden');
    root_.setProperty('--filter-form-position', 'translateX(100%)');
    root_.setProperty('--see-result-button-position', 'translateY(100%)');
    root_.setProperty('--see-result-button-opacity', '0');
    root_.setProperty(
      '--see-result-button-transition',
      'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    );
    root_.overflowY = 'auto';
  };

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
      setSliderClass({visibility: 'hidden'});
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
      setSliderClass({});
    }
  };

  const resetFilters = () => {
    setSliderPriceRange([defaultPriceRange.min, defaultPriceRange.max]);
    setInputPriceRange([defaultPriceRange.min, defaultPriceRange.max]);
    setProductsLoading(true);
    navigate(`/collections/${handle}`);
    setTimeout(() => {
      updateSorting('COLLECTION_DEFAULT', false);
    }, 500);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        document.documentElement.style.setProperty(
          '--filter-form-opacity',
          '0',
        );
        closeMobileFilter();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setProductsLoading(false);
  }, [products]);

  return (
    <div
      className={`mt-[50px] flex max-lg:gap-0 max-[1139px]:gap-4 max-lg:m-0 max-[1139px]:ml-6 ml-[50px] ${
        productsLoading ? 'items-center' : ''
      }`}
      key={JSON.stringify(values)}
    >
      <div className="lg:min-w-[200px] lg:max-w-[200px]">
        <span
          onClick={() => closeMobileFilter()}
          className="filter-modal-overlay max-lg:bg-[#363636]/50 fixed left-0 top-0 bottom-0 right-0 z-[55]"
        ></span>
        <Form
          id="filter-form"
          ref={formRef}
          method="get"
          className="filter-form-mobile max-lg:fixed right-0 top-0 bottom-0 max-sm:left-[65px] max-sm:w-auto  max-lg:bg-[#efefef] max-lg:z-[55] max-lg:w-[400px]"
        >
          <header className="lg:hidden h-[60px] flex justify-center items-center font-avenir-medium text-xl tracking-[4px] sm:mb-[35px] border-b border-[#e0e0e0]">
            <span>FILTERS</span>
            <div className="absolute right-[30px]">
              <CloseButton onClick={() => closeMobileFilter()} />
            </div>
          </header>
          <div className="relative">
            <div
              className={`max-sm:border-b border-[#e0e0e0] ${
                openAccordion === 0 ? 'open' : ''
              }`}
              ref={(e) => (accordionRefs.current[0] = e)}
            >
              <div
                className="px-6 py-5 cursor-pointer sm:hidden"
                onClick={() => handleAccordionClick(0)}
              >
                <p className=" relative font-avenir-medium text-xs text-[#2f2f2f] tracking-[2.4px]">
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
                  <p className="font-avenir-medium text-xs text-[#2f2f2f] tracking-[2.4px] mb-2 max-sm:hidden">
                    PRICE
                  </p>
                  <Slider
                    className={sliderClass}
                    max={defaultPriceRange.max}
                    min={defaultPriceRange.min}
                    getSliderPriceRange={sliderPriceRange}
                    setSliderPriceRange={setSliderPriceRange}
                    setInputPriceRange={setInputPriceRange}
                    onChangeCommitted={() => {
                      setProductsLoading(true);
                      submit(formRef.current, {
                        preventScrollReset: true,
                      });
                    }}
                  />
                  <FilterForm.PriceInput
                    max={defaultPriceRange.max}
                    min={defaultPriceRange.min}
                    value={inputPriceRange}
                    setValue={setInputPriceRange}
                    setSliderValue={setSliderPriceRange}
                    submit={() => {
                      setProductsLoading(true);
                      submit(formRef.current, {
                        preventScrollReset: true,
                      });
                    }}
                    searchParamsValue={[
                      values.minPrice ?? defaultPriceRange.min,
                      values.maxPrice ?? defaultPriceRange.max,
                    ]}
                  />
                </div>
              </div>
            </div>
            {filters.slice(1).map((filter, index) => (
              <div
                className={`max-sm:border-b relative max-sm:bg-[#efefef] max-sm:z-10 border-[#e0e0e0] ${
                  openAccordion === index + 1 ? 'open' : ''
                }`}
                ref={(e) => (accordionRefs.current[index + 1] = e)}
                key={`${filter.label}-${index}`}
              >
                <div
                  className="px-6 py-5 cursor-pointer sm:hidden"
                  onClick={() => handleAccordionClick(index + 1)}
                >
                  <p className="relative uppercase font-avenir-medium text-[12px] text-[#2f2f2f] tracking-[2.4px]">
                    {filter.label}
                    <span
                      ref={refsHorizontal[index + 1]}
                      className='absolute bottom-2 right-0 after:content-[""] w-[11px] h-[1px] bg-[#2f2f2f] rotate-90'
                    ></span>
                    <span
                      ref={refsVertical[index + 1]}
                      className='absolute bottom-2 right-0 after:content-[""] w-[11px] h-[1px] bg-[#2f2f2f]'
                    ></span>
                  </p>
                </div>
                <div className="accordion__details sm:!h-auto">
                  <div className="mb-4  max-lg:px-6">
                    <p className="mb-4 font-avenir-medium text-[12px] text-[#2f2f2f] uppercase tracking-[2.4px] max-sm:hidden">
                      {filter.label}
                    </p>
                    {filter.values.map((option) => (
                      <div
                        key={`${option.id}-${
                          values[filter.label.toLowerCase()]?.includes(
                            getOptionValue(option),
                          ) ?? false
                        }`}
                        className="mb-3 font-avenir-light hover:underline hover:cursor-pointer text-[13px]"
                      >
                        <FilterForm.ColorOrMetarialInput
                          value={getOptionValue(option)}
                          name={filter.label.toLowerCase()}
                          count={option.count}
                          submit={() => {
                            setProductsLoading(true);
                            submit(formRef.current, {preventScrollReset: true});
                          }}
                          defaultChecked={
                            values[filter.label.toLowerCase()]?.includes(
                              getOptionValue(option),
                            ) ?? false
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="max-lg:hidden absolute top-[calc(100%_+_56px)]">
              <button
                style={{
                  display: params.size > 0 ? 'block' : 'none',
                  transition: 'all ease 0.35s',
                }}
                className="border flex items-center justify-center w-min h-full align-middle px-7 py-[14px] text-[11px] font-avenir-medium uppercase bg-black border-black tracking-[2.2px] text-white hover:bg-[#fff0e7] hover:text-black"
                type="reset"
                onClick={() => resetFilters()}
              >
                reset
              </button>
            </div>
          </div>
          <div className="lg:hidden px-[30px] py-6 see-result-button absolute bottom-0 left-0 right-0 border-t border-[#e0e0e0]">
            <button
              style={{
                transition: 'all ease 0.35s',
              }}
              className="max-sm:w-[200px] border flex items-center justify-center align-middle max-sm:ml-5 ml-8
              px-7 py-[14px] text-[11px] font-avenir-medium uppercase bg-[#2f2f2f]
            border-[#2f2f2f] tracking-[2.2px] text-white hover:bg-[#fff0e7] hover:text-[#2f2f2f]"
              onClick={() => closeMobileFilter()}
            >
              see results
            </button>
          </div>
          <input
            type="hidden"
            name={sortValue != 'COLLECTION_DEFAULT' ? 'sortkey' : undefined}
            value={sortValue}
          />
          <input
            type="hidden"
            name={reversed ? 'reverse' : undefined}
            value={reversed}
          />
        </Form>
      </div>
      {productsLoading ? (
        <div className="w-full flex flex-col justify-center items-center">
          <img
            className="spinner-gif"
            src={spinner}
            alt="spinner"
            width={66}
            height={66}
          />
        </div>
      ) : (
        <div className="flex flex-col w-full">
          {grid ? (
            <div className="grid max-sm:grid-cols-2 max-[1139px]:grid-cols-3 grid-cols-4 max-sm:gap-x-[10px] max-[1139px]:gap-x-6 gap-x-[60px] max-[1139px]:gap-y-[50px] gap-y-[75px] pl-[60px] pr-[50px] max-sm:px-3 max-[1139px]:px-6 pb-4 pt-[10px] max-lg:pt-[60px]">
              {products.map((product, index) => {
                return (
                  <ProductItem
                    key={product.id}
                    product={product}
                    loading={index < 8 ? 'eager' : undefined}
                    color={values.color}
                    material={values.material}
                  />
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 max-[1139px]:gap-x-6 gap-x-[60px] max-[1139px]:gap-y-[50px] gap-y-[75px] pl-[60px] pr-[50px] max-sm:px-3 max-[1139px]:px-6 pb-4 pt-[10px] max-lg:pt-[60px]">
              {products.map((product, index) => {
                return (
                  <ProductItem
                    key={product.id}
                    product={product}
                    loading={index < 8 ? 'eager' : undefined}
                    color={values.color}
                    material={values.material}
                  />
                );
              })}
            </div>
          )}
          {products.length === 0 && !productsLoading && (
            <div className="w-full h-full flex justify-center items-center text-center">
              <div className="flex flex-col gap-9">
                <h1 className="font-avenir-medium text-[20px] text-[#2f2f2f] uppercase tracking-widest">
                  no product
                </h1>
                <button
                  type="button"
                  className="btn-primary capitalize"
                  onClick={() => resetFilters()}
                >
                  reset filters
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
