function useDefaultCollectionQuery() {
  return `#graphql
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      products(
        first: 1
      ) {
        filters{
          id
          label
          type
          values{id label count input}
        }
        
      }
    }
  }
`;
}

export default useDefaultCollectionQuery;
