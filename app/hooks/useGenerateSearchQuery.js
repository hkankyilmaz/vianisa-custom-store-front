function useGenerateSearchQuery(
  variantOptions,
  minPrice,
  maxPrice,
  sortKey,
  reverse,
) {
  return `#graphql
    fragment SearchProduct on Product(
      sortKey: ${sortKey ? sortKey : 'COLLECTION_DEFAULT'}
      reverse: ${reverse ? reverse : 'false'}
      filters : [
          ${
            maxPrice && minPrice
              ? `{ price: { min: ${minPrice}, max: ${maxPrice} } },`
              : ''
          }
        ${(() => {
          if (variantOptions && variantOptions.length > 0) {
            const variantQuery = variantOptions.map((option) => {
              return `{variantOption: {name: "${
                option.name
              }", value: "${option.value
                .split('-')
                .map((word) => {
                  return word.charAt(0).toUpperCase() + word.slice(1);
                })
                .filter((word) => {
                  return word !== '';
                })
                .join(' ')}"}}`;
            });
            return variantQuery.join(',');
          } else return '';
        })()}]
    ) {
      __typename
      handle
      id
      publishedAt
      title
      trackingParameters
      vendor
      variants(first: 1) {
        nodes {
          id
          image {
            url
            altText
            width
            height
          }
          filters{
              id
              label
              type
              values{id label count input}
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
    
    }
  `;
}

export default useGenerateSearchQuery;
