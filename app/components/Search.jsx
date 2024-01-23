import {
  Link,
  Form,
  useParams,
  useFetcher,
  useFetchers,
  useNavigate,
} from '@remix-run/react';
import {Image, Money, Pagination} from '@shopify/hydrogen';
import React, {useRef, useEffect} from 'react';

export const NO_PREDICTIVE_SEARCH_RESULTS = [{type: 'products', items: []}];

export function SearchForm({searchTerm}) {
  const inputRef = useRef(null);
  const navigate = useNavigate();

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
      if (event.key === 'Enter') {
        navigate('/search?q=' + inputRef.current.value);
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
        type="submit"
        autofocus
      />
      &nbsp;
      <button type="submit">Search</button>
    </Form>
  );
}

export function SearchResults({results}) {
  if (!results) {
    return null;
  }
  const keys = Object.keys(results);
  return (
    <div>
      {results &&
        keys.map((type) => {
          const resourceResults = results[type];

          if (resourceResults.nodes[0]?.__typename === 'Product') {
            const productResults = resourceResults;
            return resourceResults.nodes.length ? (
              <SearchResultsProductsGrid
                key="products"
                products={productResults}
              />
            ) : null;
          }

          return null;
        })}
    </div>
  );
}

function SearchResultsProductsGrid({products}) {
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
      {q: newSearchTerm, limit: '3'},
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
  const {results, totalResults, searchInputRef, searchTerm} =
    usePredictiveSearch();
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
    <div className="predictive-search-results">
      {searchTerm.current && (
        <div className="flex justify-between pb-[10px] mt-[70px] border-b border-x-0 border-[#e0e0e0] ">
          <p className="tracking-[2.2px] text-[#2f2f2f] text-[11px] font-body">
            RESULTS
          </p>
          <Link
            onClick={goToSearchResult}
            to={`/search?q=${searchTerm.current}`}
          >
            <p className="uppercase tracking-[2.2px] text-[#2f2f2f] text-[11px] font-body">
              View all
            </p>
          </Link>
        </div>
      )}
      <div>
        {results
          .filter((i) => i.type == 'products')
          .map(({type, items}) => (
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
    <div className="flex flex-col justify-start mb-12 mt-[70px]">
      <p className="pb-[10px] mb-[34px] border-b border-x-0 border-[#e0e0e0] tracking-[2.2px] text-[#2f2f2f] text-[11px] font-body">
        PRODUCTS
      </p>
      <span className=" border-b-black pb-1 pt-1 text-[13px] text-[#595959]">
        No results found for <q>{searchTerm.current}</q>
      </span>
    </div>
  );
}

function PredictiveSearchResult({goToSearchResult, items, searchTerm, type}) {
  const isSuggestions = type === 'queries';
  const categoryUrl = `/search?q=${
    searchTerm.current
  }&type=${pluralToSingularSearchType(type)}`;

  return (
    <div className="predictive-search-result py-10" key={type}>
      <Link prefetch="intent" to={categoryUrl} onClick={goToSearchResult}>
        {/* <h5>{isSuggestions ? 'Suggestions' : type}</h5> */}
      </Link>
      <ul className="grid grid-cols-3 max-sm:grid-cols-1 gap-x-[100px] max-xl:gap-x-[50px] max-sm:gap-y-[25px]">
        {items.map((item) => (
          <SearchResultItem
            goToSearchResult={goToSearchResult}
            item={item}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function SearchResultItem({goToSearchResult, item}) {
  return (
    <li className="flex flex-col" key={item.id}>
      <Link onClick={goToSearchResult} to={item.url}>
        <div className="max-sm:flex max-sm:flex-row gap-[25px] relative">
          {item.image?.nodes[0].url && (
            <>
              <Image
                className="max-sm:!w-[70px] max-sm:!h-[70px] transition-opacity opacity-100 hover:opacity-0"
                loading="eager"
                alt={item.image.nodes[0].altText ?? ''}
                data={item.image.nodes[0]}
              />
              <Image
                className="transition-opacity opacity-0 hover:opacity-100 absolute top-0"
                loading={'eager'}
                alt={item.image.nodes[1].altText ?? ''}
                data={item.image.nodes[1]}
              />
            </>
          )}
          <div className="sm:mt-5 max-sm:flex items-center max-sm:flex-col max-sm:items-start max-sm:justify-center">
            {item.styledTitle ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: item.styledTitle,
                }}
              />
            ) : (
              <p className="sm:mb-1 uppercase tracking-[2.2px] text-[#2f2f2f] text-[11px] font-body">
                {item.title}
              </p>
            )}
            {item?.price && (
              <p className="tracking-[2.2px] text-[#e22120] text-[11px] font-body">
                <Money data={item.price} />
              </p>
            )}
          </div>
        </div>
      </Link>
    </li>
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
