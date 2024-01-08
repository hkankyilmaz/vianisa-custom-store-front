function useGenerateCollectionQuery(
  combinedSearchParams,
  sortValue,
  minPrice,
  maxPrice,
  sortKey,
  reverse,
) {
  return `#graphql
 ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first
        last: $last
        before: $startCursor
        after: $endCursor
        sortKey: ${sortKey ? sortKey : 'COLLECTION_DEFAULT'}
        reverse: ${reverse ? reverse : 'false'}
        filters : [
        ${
          maxPrice && minPrice
            ? `{ price: { min: ${minPrice}, max: ${maxPrice} } },`
            : ''
        }
      ${(() => {
        if (combinedSearchParams.length > 0) {
          let query = '';
          combinedSearchParams.map((searchParam, idx) => {
            if (
              searchParam == 'yellow' ||
              searchParam == 'white' ||
              searchParam == 'rose'
            ) {
              query += ` {variantOption: {name: "Color", value: "${
                searchParam == 'yellow'
                  ? 'Yellow'
                  : searchParam == 'white'
                  ? 'White'
                  : searchParam == 'rose'
                  ? 'Rose'
                  : ''
              }"}}${idx !== combinedSearchParams.length - 1 ? ',' : ''}`;
            } else {
              query += ` {variantOption: {name: "Material", value: "${
                searchParam == '10kgold'
                  ? '10k Gold'
                  : searchParam == '14kgold'
                  ? '14k Gold'
                  : searchParam == '18kgold'
                  ? '18k Gold'
                  : ''
              }"}}${idx !== combinedSearchParams.length - 1 ? ',' : ''}`;
            }
          });
          return query;
        } else return '';
      })()}]
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          startCursor
          hasNextPage
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
}

export default useGenerateCollectionQuery;

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
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
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    options(first:250){
      name
      values
    }
    variants(first: 250) {
      nodes {
        image{
          id
          altText
          url
          width
          height
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        
      }
    }
  }
`;
