import {useState, useEffect} from 'react';
import {json, redirect} from '@shopify/remix-oxygen';
import {Form, useLocation} from '@remix-run/react';
import {useLoaderData, useNavigate, useSubmit} from '@remix-run/react';
import {Pagination, getPaginationVariables} from '@shopify/hydrogen';
import Slider from '@mui/material/Slider';
import useGetSearchParams from '~/hooks/useGetSearchParams';
import useGenerateCollectionQuery from '~/hooks/useGenerateCollectionQuery';
import useFindCollectionMaxAndMinPrice from '~/hooks/useFindCollectionMaxAndMinPrice';
import {AiOutlineDown} from 'react-icons/ai';
import {
  ProductItem,
  GridChanger,
  SortForm,
  LoadMoreButton,
  PageHeader,
  FilterForm,
} from '~/components/Collection Page UI-Forms/Index';

export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data.collection.title} Collection`}];
};

export async function loader({request, params, context}) {
  //get the url serach params and generate the query
  const url = new URL(request.url);
  const colors = url.searchParams.getAll('color');
  const meterials = url.searchParams.getAll('meterial');
  const minPrice = url.searchParams.get('minprice');
  const maxPrice = url.searchParams.get('maxprice');
  const sortkey = url.searchParams.get('sortkey');
  const reverse = url.searchParams.get('reverse');
  const searchParams = useGetSearchParams(colors, meterials);
  const COLLECTION_QUERY = useGenerateCollectionQuery(
    searchParams,
    null,
    minPrice,
    maxPrice,
    sortkey,
    reverse,
  );
  //get handle from params for query
  const {handle} = params;
  const {storefront} = context;
  //set up pagination for query
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 48,
  });
  // get the collection max price query
  const MAX_PRICE_QUERY = useFindCollectionMaxAndMinPrice('max');
  // get the collection which has the product that has max price
  const maxValueCollection = await storefront.query(MAX_PRICE_QUERY, {
    variables: {handle},
  });
  // get the collection min price query
  const MIN_PRICE_QUERY = useFindCollectionMaxAndMinPrice('min');
  // get the collection which has the product that has min price
  const minValueCollection = await storefront.query(MIN_PRICE_QUERY, {
    variables: {handle},
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
  return json({collection, maxValueCollection, minValueCollection});
}

export default function Collection() {
  const {collection, maxValueCollection, minValueCollection} = useLoaderData();

  const maxValue =
    +maxValueCollection.collection.products.nodes[0].priceRange.maxVariantPrice
      .amount;
  const minValue =
    +minValueCollection.collection.products.nodes[0].priceRange.minVariantPrice
      .amount;

  const [openFilterDesk, setOpenFilterDesk] = useState(false);
  const [value, setValue] = useState([0, 1000]);
  const [grid, setGrid] = useState(true);
  let root_ = document.documentElement.style;

  // user visit the page first time, back to page and forward to page --> set the min and max price from url
  useEffect(() => {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let minPrice = params.get('minprice');
    let maxPrice = params.get('maxprice');
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
    <div className="collection">
      <PageHeader collection={collection} />

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
      <Pagination connection={collection.products}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <>
            <ProductsGrid
              grid={grid}
              value={value}
              setValue={setValue}
              products={nodes}
              maxValue={maxValue}
              minValue={minValue}
              handle={collection.handle}
            />
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
        className="sort-modal-overlay max-lg:bg-[#363636]/50 fixed left-0 top-0 bottom-0 right-0 z-10"
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

function ProductsGrid({products, value, setValue, maxValue, grid, handle}) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let url = useLocation();
  let params = new URLSearchParams(url.search);
  const handleOnChangeCommitted = (event, newValue) => {
    setValue(newValue);
    // Add a third parameter.
    params.set('minprice', value[0]);
    params.set('maxprice', value[1]);
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

  return (
    <div className="mt-[50px] flex max-lg:gap-0 max-[1139px]:gap-4 max-lg:m-0 max-[1139px]:ml-6 ml-[50px]">
      <div className="lg:min-w-[200px]">
        <span
          onClick={() => closeMobileFilter()}
          className="filter-modal-overlay max-lg:bg-[#363636]/50 fixed left-0 top-0 bottom-0 right-0 z-10"
        ></span>
        <Form
          method="get"
          onChange={(e) => submit(e.currentTarget)}
          className="filter-form-mobile max-lg:fixed right-0 top-0 bottom-0 max-sm:left-[65px] max-sm:w-auto  max-lg:bg-[#efefef] max-lg:z-10 max-lg:w-[400px]"
        >
          <header className="lg:hidden h-[60px] flex justify-center items-center font-playfair text-xl tracking-[4px] font-bold mb-[35px] border-b border-[#e0e0e0]">
            <span>FILTERS</span>
          </header>
          <div className="mb-8  max-lg:px-6">
            <p className="font-montserratMd text-xs text-[#2f2f2f] tracking-[2.4px] mb-2">
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
          <div className="mb-4  max-lg:px-6">
            <p className="mb-4 font-montserratMd text-xs text-[#2f2f2f] tracking-[2.4px]">
              COLOR
            </p>
            <p className="mb-3 font-questrial hover:underline hover:cursor-pointer">
              <FilterForm.ColorOrMetarialInput value="rose" name="color" />
            </p>
            <p className="mb-3 font-questrial hover:underline hover:cursor-pointer">
              <FilterForm.ColorOrMetarialInput value="white" name="color" />
            </p>
            <p className="mb-8 font-questrial hover:underline hover:cursor-pointer">
              <FilterForm.ColorOrMetarialInput value="yellow" name="color" />
            </p>
          </div>
          <div className="mb-8  max-lg:px-6">
            <p className="mb-4 font-montserratMd text-xs text-[#2f2f2f] tracking-[2.4px]">
              MATERIAL
            </p>
            <p className="mb-3 font-questrial hover:underline hover:cursor-pointer">
              <FilterForm.ColorOrMetarialInput
                value="10kgold"
                name="meterial"
              />
            </p>
            <p className="mb-3 font-questrial hover:underline hover:cursor-pointer">
              <FilterForm.ColorOrMetarialInput
                value="14kgold"
                name="meterial"
              />
            </p>
            <p className="mb-8 font-questrial hover:underline hover:cursor-pointer">
              <FilterForm.ColorOrMetarialInput
                value="18kgold"
                name="meterial"
              />
            </p>
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
                navigate(`/collections/${handle}`);
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
