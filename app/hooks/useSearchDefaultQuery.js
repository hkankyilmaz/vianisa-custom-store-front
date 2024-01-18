function useSearchDefaultQuery() {
  return `#graphql
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

export default useSearchDefaultQuery;
