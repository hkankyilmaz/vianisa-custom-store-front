import {Link, Form, useParams, useFetcher, useFetchers} from '@remix-run/react';
import {Image, Money, Pagination} from '@shopify/hydrogen';
import React, {useRef, useEffect} from 'react';

export const NO_PREDICTIVE_SEARCH_RESULTS = [{type: 'products', items: []}];

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
        <Link onClick={goToSearchResult} to={`/search?q=${searchTerm.current}`}>
          <div className="flex justify-end pt-2 pr-10">
            <span className="border-b border-b-black pb-1 pt-1 text-lg text-[#595959]">
              View all
            </span>
          </div>
        </Link>
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
    <div className="flex justify-start pt-2 pl-10 mb-3">
      <span className=" border-b-black pb-1 pt-1 text-lg text-[#595959]">
        No results found for <q>{searchTerm.current}</q>
      </span>
    </div>
  );
}

function PredictiveSearchResult({goToSearchResult, items, searchTerm, type}) {
  const isSuggestions = type === 'queries';
  console.log(items);
  const categoryUrl = `/search?q=${
    searchTerm.current
  }&type=${pluralToSingularSearchType(type)}`;

  return (
    <div className="predictive-search-result py-10" key={type}>
      <Link prefetch="intent" to={categoryUrl} onClick={goToSearchResult}>
        {/* <h5>{isSuggestions ? 'Suggestions' : type}</h5> */}
      </Link>
      <ul className="grid grid-cols-3 mx-10 gap-x-5">
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
        {item.image?.url && (
          <Image
            loading="eager"
            alt={item.image.altText ?? ''}
            data={item.image}
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
