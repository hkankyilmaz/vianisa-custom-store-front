import {useState, useEffect} from 'react';
import {json, redirect} from '@shopify/remix-oxygen';
import {Form} from '@remix-run/react';
import {useLoaderData, useNavigate} from '@remix-run/react';
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
  const searchParams = useGetSearchParams(colors, meterials);
  const COLLECTION_QUERY = useGenerateCollectionQuery(
    searchParams,
    null,
    minPrice,
    maxPrice,
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

  return (
    <div className="collection">
      <div className="my-10">
        <h1 className="text-center text-4xl">{collection.title}</h1>
        <p className="flex justify-center">
          <span className="lg:max-w-lg w-full text-center">
            {collection.description}
          </span>
        </p>
      </div>

      <div className="h-[75px] w-full border-y mb-10 flex justify-center items-center">
        <GridChanger />
        <div className="w-full"></div>
        <div
          onClick={() => setOpenFilterDesk((prev) => !prev)}
          className="w-[160px] h-full border-l flex justify-center items-center relative cursor-pointer select-none"
        >
          SORT
          <FaAngleDown color="gray" className="ml-1 translate-y-[1px]" />
          <ClickAwayListener onClickAway={handleCloseFilter}>
            <>
              {openFilterDesk ? (
                <Form
                  method="get"
                  className="clip-path-filter rounded-md [&>p:hover]:underline [&>p]:cursor-pointer [&>p]:mb-2 [&>p]:text-right sortabsolute absolute top-[105%] right-0 w-[300px] py-10 px-10 h-auto text-slate-600 bg-[#e5e7eb] shadow-md"
                >
                  <p>FEATURED</p>
                  <p>BEST SELLING</p>
                  <p>ALPHABETICALLY, A-Z</p>
                  <p>ALPHABETICALLY, Z-A</p>
                  <p>PRICE, LOW TO HIGH</p>
                  <p>PRICE, HIGH TO LOW</p>
                  <p>DATE, OLD TO NEW</p>
                  <p>DATE, NEW TO OLD</p>
                </Form>
              ) : undefined}
            </>
          </ClickAwayListener>
        </div>
      </div>
      <Pagination connection={collection.products}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <>
            <ProductsGrid
              value={value}
              setValue={setValue}
              products={nodes}
              maxValue={maxValue}
              minValue={minValue}
            />
            <br />
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more ↓</span>}
            </NextLink>
          </>
        )}
      </Pagination>
    </div>
  );
}

function ProductsGrid({products, value, setValue, maxValue, minValue}) {
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOnChangeCommitted = (event, newValue) => {
    setValue(newValue);

    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    // Add a third parameter.
    params.set('minprice', value[0]);
    params.set('maxprice', value[1]);
    navigate(`?${params.toString()}`);
  };
  return (
    <div className="grid grid-cols-[auto_auto] px-5">
      <div className="lg:min-w-[320px] pl-[30px]">
        <Form method="get">
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
              <div className="border border-[#8c8c8c] border-solid w-[37%] h-[40px] relative text-right text-xl pr-2 flex justify-end items-center text-[#8c8c8c]">
                <span className="absolute left-2 top-[50%] translate-y-[-50%] text-xl ">
                  $
                </span>
                {value[0]}
              </div>
              <div className="flex justify-center items-center mx-[3%] text-[#8c8c8c]">
                -
              </div>
              <div className="border border-[#8c8c8c] border-solid w-[37%] h-[40px] relative text-right text-xl pr-2 flex justify-end items-center text-[#8c8c8c]">
                <span className="absolute left-2 top-[50%] translate-y-[-50%] text-xl ">
                  $
                </span>
                {value[1]}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-2 font-bold">COLOR</p>
            <p className="mb-1">
              <input
                className="hidden"
                type="checkbox"
                id="rose"
                name="color"
                value="rose"
              />
              <span className="hidden rose"></span>
              <label htmlFor="rose">ROSE</label>
            </p>
            <p className="mb-1">
              <input
                className="hidden"
                type="checkbox"
                id="white"
                name="color"
                value="white"
              />
              <span className="hidden white"></span>
              <label htmlFor="white">WHİTE</label>
            </p>
            <p className="mb-1">
              <input
                className="hidden"
                type="checkbox"
                id="yellow"
                name="color"
                value="yellow"
              />
              <span className="hidden yellow"></span>
              <label htmlFor="yellow">YELLOW</label>
            </p>
          </div>
          <div>
            <p className="mb-2 font-bold">METERİAL</p>
            <p className="mb-1">
              <input
                className="hidden"
                type="checkbox"
                id="_10kgold"
                name="meterial"
                value="10kgold"
              />
              <span className="hidden _10kgold"></span>
              <label htmlFor="_10kgold">10K GOLD</label>
            </p>
            <p className="mb-1">
              <input
                className="hidden"
                type="checkbox"
                id="_14kgold"
                name="meterial"
                value="14kgold"
              />
              <span className="hidden _14kgold"></span>
              <label htmlFor="_14kgold">14K GOLD</label>
            </p>
            <p className="mb-1">
              <input
                className="hidden"
                type="checkbox"
                id="_18kgold"
                name="meterial"
                value="18kgold"
              />
              <span className="hidden _18kgold"></span>
              <label htmlFor="_18kgold">18K GOLD</label>
            </p>
          </div>
          <button
            className="border block border-solid border-black w-[150px] h-[40px]  mt-4 hover:bg-black hover:text-white"
            type="submit"
          >
            Filter
          </button>
          <button
            className="block border border-solid border-black  w-[150px] h-[40px]   mt-4 hover:bg-black hover:text-white"
            type="reset"
          >
            Reset
          </button>
        </Form>
      </div>
      <div className="grid grid-cols-4 gap-10">
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
    </div>
  );
}
