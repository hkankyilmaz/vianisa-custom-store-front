import Slider from '@mui/material/Slider';
import {
  Form,
  useLoaderData,
  useLocation,
  useNavigate,
  useSubmit,
} from '@remix-run/react';
import {Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {json, redirect} from '@shopify/remix-oxygen';
import {useRef, useState} from 'react';
import {AiOutlineDown} from 'react-icons/ai';
import useDefaultCollectionQuery from '~/hooks/useDefaultCollectionQuery';
import useAllProductsQuery from '~/hooks/useAllProductsQuery';

import gsap from 'gsap';
import {CloseButton} from '~/components/Header/Drawer';

import {
  FilterForm,
  GridChanger,
  LoadMoreButton,
  PageHeader,
  ProductItem,
  SortForm,
} from '~/components/Collection Page UI-Forms';

export const meta = ({data}) => {
  return [{title: `All PRODUCTS`}];
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

  const COLLECTION_QUERY = useAllProductsQuery(
    [...color, ...material],
    minPrice,
    maxPrice,
    sortKey,
    reverse,
  );
  const DEFAULT_COLLECTION_QUERY = useDefaultCollectionQuery();

  // const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  // if (!handle) {
  //   return redirect('/collections');
  // }

  const [{products}] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: {...paginationVariables},
      cache: storefront.CacheLong(),
    }),
    // storefront.query(DEFAULT_COLLECTION_QUERY, {
    //   variables: {
    //     handle: handle,
    //   },
    //   cache: storefront.CacheLong(),
    // }),
  ]);

  // const defaultPriceRange = JSON.parse(
  //   defaultCollection.products.filters[0].values[0].input,
  // ).price;
  const defaultPriceRange = {min: 0, max: 9000};
  // if (!collection) {
  //   throw new Response(`Collection all not found`, {
  //     status: 404,
  //   });
  // }
  console.log(products);
  return json({products, values, defaultPriceRange});
}

export default function Collection() {
  const {products} = useLoaderData();
  const [grid, setGrid] = useState(true);
  let root_ = document.documentElement.style;

  const openMobileFilter = () => {
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

  return (
    <div className="collection" key="allpro">
      <PageHeader collection={{title: 'sa', description: 'hi'}} />
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
      <Pagination connection={products}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <>
            <ProductsGrid grid={grid} products={nodes} handle={'ata'} />
            <br />
            <NextLink className="flex justify-center w-full text-xl my-5">
              <LoadMoreButton isLoading={isLoading} />
            </NextLink>
          </>
        )}
      </Pagination>
      <SortForm closeMobileSort={closeMobileSort} />
    </div>
  );
}

function SortButton({openMobileSort, closeMobileSort}) {
  return (
    <>
      <div
        onClick={openMobileSort}
        className="max-sm:h-[44px] sm:h-[54px] border-l flex max-sm:grow justify-center items-center relative cursor-pointer select-none max-sm:px-0 px-[45px] py-[18px] text-[#2f2f2f] font-montserratMd text-xs tracking-[2.4px] "
      >
        SORT
        <AiOutlineDown className=" text-xs ml-2 text-[#2f2f2f]" />
      </div>
      <span
        onClick={closeMobileSort}
        className="sort-modal-overlay max-lg:bg-[#363636]/50 fixed left-0 top-0 bottom-0 right-0 z-[55]"
      ></span>
    </>
  );
}

function FilterButton({openMobileFilter}) {
  return (
    <div
      onClick={openMobileFilter}
      className="max-sm:h-[44px] sm:h-[54px] border-l flex max-sm:grow justify-center items-center relative cursor-pointer select-none max-sm:px-0 px-[45px] py-[18px] text-[#2f2f2f] font-montserratMd text-xs tracking-[2.4px] lg:hidden "
    >
      FILTER
    </div>
  );
}

function ProductsGrid({products, grid, handle}) {
  const {values, defaultPriceRange} = useLoaderData();

  const url = useLocation();
  const submit = useSubmit();
  const navigate = useNavigate();

  const formRef = useRef(null);
  const accordionRefs = useRef([]);
  const refsHorizontal = Array.from({length: 3}, () => useRef(null));
  const refsVertical = Array.from({length: 3}, () => useRef(null));

  const params = new URLSearchParams(url.search);
  const filters = products.filters;

  const [openAccordion, setOpenAccordion] = useState(null);
  const [sliderPriceRange, setSliderPriceRange] = useState([
    parseInt(values.minPrice) || defaultPriceRange.min,
    parseInt(values.maxPrice) || defaultPriceRange.max,
  ]);
  const [inputPriceRange, setInputPriceRange] = useState([
    parseInt(values.minPrice) || defaultPriceRange.min,
    parseInt(values.maxPrice) || defaultPriceRange.max,
  ]);

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
      <div className="lg:min-w-[200px] lg:max-w-[200px]">
        <span
          onClick={() => closeMobileFilter()}
          className="filter-modal-overlay max-lg:bg-[#363636]/50 fixed left-0 top-0 bottom-0 right-0 z-[55]"
        ></span>
        <Form
          ref={formRef}
          method="get"
          className="filter-form-mobile max-lg:fixed right-0 top-0 bottom-0 max-sm:left-[65px] max-sm:w-auto  max-lg:bg-[#efefef] max-lg:z-[55] max-lg:w-[400px]"
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
                    value={sliderPriceRange}
                    onChange={(e, value) => {
                      setSliderPriceRange(value);
                      setInputPriceRange(value);
                    }}
                    onChangeCommitted={(e, value) => {
                      setSliderPriceRange(value);
                      setInputPriceRange(value);
                      submit(formRef.current);
                    }}
                    valueLabelDisplay="auto"
                    max={defaultPriceRange.max}
                    min={defaultPriceRange.min}
                  />
                  <FilterForm.PriceInput
                    max={defaultPriceRange.max}
                    min={defaultPriceRange.min}
                    value={inputPriceRange}
                    setValue={setInputPriceRange}
                    setSliderValue={setSliderPriceRange}
                    submit={() => submit(formRef.current)}
                    searchParamsValue={[
                      values.minPrice ?? defaultPriceRange.min,
                      values.maxPrice ?? defaultPriceRange.max,
                    ]}
                  />
                </div>
              </div>
            </div>
            {filters?.slice(1).map((filter, index) => (
              <div
                className={`accordion__item max-sm:border-b border-[#e0e0e0]  ${
                  openAccordion === index + 1 ? 'open' : ''
                }`}
                ref={(e) => (accordionRefs.current[index + 1] = e)}
                key={`${filter.label}-${index}`}
              >
                <div
                  className="accordion__header px-6 py-5 cursor-pointer sm:hidden"
                  onClick={() => handleAccordionClick(index + 1)}
                >
                  <p className="relative accordion__name uppercase font-montserratMd text-[12px] text-[#2f2f2f] tracking-[2.4px]">
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
                    <p className="mb-4 font-montserratMd text-[12px] text-[#2f2f2f] uppercase tracking-[2.4px] max-sm:hidden">
                      {filter.label}
                    </p>
                    {filter.values.map((option) => (
                      <div
                        key={option.id}
                        className="mb-3 font-questrial hover:underline hover:cursor-pointer text-[13px]"
                      >
                        <FilterForm.ColorOrMetarialInput
                          value={getOptionValue(option)}
                          name={filter.label.toLowerCase()}
                          count={option.count}
                          submit={() => submit(formRef.current)}
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
                setSliderPriceRange([
                  defaultPriceRange.min,
                  defaultPriceRange.max,
                ]);
                setInputPriceRange([
                  defaultPriceRange.min,
                  defaultPriceRange.max,
                ]);
                navigate(`/collectionsall`);
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