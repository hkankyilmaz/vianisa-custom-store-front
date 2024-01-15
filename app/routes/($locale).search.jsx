import {defer} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getPaginationVariables} from '@shopify/hydrogen';
import {
  ProductItem,
  GridChanger,
  SortForm,
  LoadMoreButton,
  PageHeader,
  FilterForm,
} from '~/components/Collection Page UI-Forms';
import React, {useRef, useEffect, useState} from 'react';
import {SearchForm, SearchResults, NoSearchResults} from '~/components/Search';
import {AiOutlineDown} from 'react-icons/ai';

export const meta = () => {
  return [{title: `Hydrogen | Search`}];
};

export async function loader({request, context}) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const variables = getPaginationVariables(request, {pageBy: 8});
  const searchTerm = String(searchParams.get('q') || '');

  if (!searchTerm) {
    return {
      searchResults: {results: null, totalResults: 0},
      searchTerm,
    };
  }

  const data = await context.storefront.query(SEARCH_QUERY, {
    variables: {
      query: searchTerm,
      ...variables,
    },
  });

  if (!data) {
    throw new Error('No search data returned from Shopify API');
  }

  const totalResults = Object.values(data).reduce((total, value) => {
    return total + value.nodes.length;
  }, 0);

  const searchResults = {
    results: data,
    totalResults,
  };

  return defer({searchTerm, searchResults});
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

export default function SearchPage() {
  const {searchTerm, searchResults} = useLoaderData();
  // console.log(searchTerm, searchResults);

  const maxvalues = searchResults.results.products.nodes
    .map((product) => Number(product.priceRange.maxVariantPrice.amount))
    .sort((a, b) => b - a);
  const minvalues = searchResults.results.products.nodes
    .map((product) => Number(product.priceRange.minVariantPrice.amount))
    .sort((a, b) => a - b);
  const maxValue = maxvalues[0];
  const minValue = minvalues[0];
  // console.log(maxvalues, minvalues);
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
  console.log(searchResults.results.products);
  return (
    <div className="search">
      <div className="flex flex-col justify-center text-center my-[50px]">
        <h1 className="uppercase tracking-[3.2px] font-[sans-serif] text-[#2f2f2f]">
          Search
        </h1>
        <h2 className="font-questrial text-[13px] text-[#2f2f2f]">
          {searchResults.results.products.nodes.length} results for "
          {searchTerm}"
        </h2>
      </div>
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
      {/* <SearchForm searchTerm={searchTerm} /> */}
      {!searchTerm || !searchResults.totalResults ? (
        <NoSearchResults />
      ) : (
        <SearchResults results={searchResults.results} title={searchTerm} />
      )}
    </div>
  );
}

const SEARCH_QUERY = `#graphql
fragment MoneyProductItem on MoneyV2 {
  amount
  currencyCode
}
  fragment SearchProduct on Product {
    __typename
    handle
    id
    publishedAt
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    images(first:2){
      nodes{
        id
            altText
            url
            width
            height
      }
    }
    trackingParameters
    vendor
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 250) {
      nodes {
        id
        image {
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        product {
          handle
          title
        }
      }
    }
  }
  fragment SearchPage on Page {
     __typename
     handle
    id
    title
    trackingParameters
  }
  fragment SearchArticle on Article {
    __typename
    handle
    id
    title
    trackingParameters
  }
  query search(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $query: String!
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    products: search(
      query: $query,
      unavailableProducts: HIDE,
      types: [PRODUCT],
      first: $first,
      sortKey: RELEVANCE,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...on Product {
          ...SearchProduct
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
    pages: search(
      query: $query,
      types: [PAGE],
      first: 10
    ) {
      nodes {
        ...on Page {
          ...SearchPage
        }
      }
    }
    articles: search(
      query: $query,
      types: [ARTICLE],
      first: 10
    ) {
      nodes {
        ...on Article {
          ...SearchArticle
        }
      }
    }
  }
`;
