function useSearchDefaultQuery() {
  return `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
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
        last: $last,
        before: $startCursor,
        after: $endCursor,
      ) {
        nodes {
          ...ProductItem
        }
        productFilters {
          id
          label
          type
          values{id label count input}
        }
    
      }
    
    }
  `;
}

const PRODUCT_ITEM_FRAGMENT = `#graphql

  fragment ProductItem on Product {
    id

  }
`;

export default useSearchDefaultQuery;
