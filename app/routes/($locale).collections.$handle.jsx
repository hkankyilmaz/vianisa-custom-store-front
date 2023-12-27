import {useState, useEffect} from 'react';
import {json, redirect} from '@shopify/remix-oxygen';
import {Form, useLocation} from '@remix-run/react';
import {useLoaderData, useNavigate, useSubmit} from '@remix-run/react';
import {Pagination, getPaginationVariables} from '@shopify/hydrogen';
import Slider from '@mui/material/Slider';
import {FaAngleDown} from 'react-icons/fa';
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import useGetSearchParams from '~/hooks/useGetSearchParams';
import useGenerateCollectionQuery from '~/hooks/useGenerateCollectionQuery';
import useFindCollectionMaxAndMinPrice from '~/hooks/useFindCollectionMaxAndMinPrice';
import {
  ProductItem,
  GridChanger,
  SorthForm,
  LoadMoreButton,
  PageHeader,
  FilterForm,
  FilterBarMobile,
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
  const handleCloseFilter = () => {
    setOpenFilterDesk(false);
  };

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

  const handleMobileFilter = () => {
    let root_ = document.documentElement.style;
    root_.setProperty('--filter-container-visibility', 'visible');
    root_.setProperty('--filter-form-position', 'translateX(0%)');
    document.documentElement.style.overflowY = 'hidden';
  };

  return (
    <div className="collection">
      <PageHeader collection={collection} />

      <div className="h-[75px] w-full border-y mb-10 flex justify-center items-center">
        <GridChanger setGrid={setGrid} grid={grid} />
        <div className="w-full"></div>

        <div
          onClick={() => setOpenFilterDesk((prev) => !prev)}
          className="w-[160px] h-full border-l flex justify-center items-center relative cursor-pointer select-none"
        >
          SORT
          <FaAngleDown color="gray" className="ml-1 translate-y-[1px]" />
          <ClickAwayListener onClickAway={handleCloseFilter}>
            <>{openFilterDesk ? <SorthForm /> : undefined}</>
          </ClickAwayListener>
        </div>
        <div
          onClick={() => handleMobileFilter()}
          className="w-[160px] h-full border-l flex justify-center items-center relative cursor-pointer select-none lg:hidden"
        >
          FILTER
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
  return (
    <div className="grid grid-cols-[300px_auto] max-lg:grid-cols-1 px-5">
      <div className="lg:min-w-[320px] pl-[30px]">
        <Form
          method="get"
          onChange={(e) => submit(e.currentTarget)}
          className="max-lg:hidden"
        >
          <div className="mb-4">
            <p className="font-bold mb-2">PRİCE</p>
            <Slider
              className="max-w-[80%] mb-1"
              sx={{color: 'gray'}}
              value={value}
              onChange={handleChange}
              onChangeCommitted={handleOnChangeCommitted}
              valueLabelDisplay="auto"
              max={maxValue}
              min={0}
            />
            <div className="flex">
              <FilterForm.PriceInput value={value} idx={0} />
              <FilterForm.Seperator />
              <FilterForm.PriceInput value={value} idx={1} />
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-2 font-bold">COLOR</p>
            <p className="mb-1">
              <FilterForm.ColorOrMetarialInput value="rose" name="color" />
            </p>
            <p className="mb-1">
              <FilterForm.ColorOrMetarialInput value="white" name="color" />
            </p>
            <p className="mb-1">
              <FilterForm.ColorOrMetarialInput value="yellow" name="color" />
            </p>
          </div>
          <div>
            <p className="mb-2 font-bold">METERİAL</p>
            <p className="mb-1">
              <FilterForm.ColorOrMetarialInput
                value="10kgold"
                name="meterial"
              />
            </p>
            <p className="mb-1">
              <FilterForm.ColorOrMetarialInput
                value="14kgold"
                name="meterial"
              />
            </p>
            <p className="mb-1">
              <FilterForm.ColorOrMetarialInput
                value="18kgold"
                name="meterial"
              />
            </p>
          </div>
          <button
            style={{display: params.size > 0 ? 'block' : 'none'}}
            className="block border border-solid border-black  w-[150px] h-[40px]   mt-4 hover:bg-black hover:text-white"
            type="reset"
            onClick={() => {
              setValue([0, 1000]);
              navigate(`/collections/${handle}`);
            }}
          >
            Reset
          </button>
        </Form>
      </div>
      {grid ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
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
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
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
