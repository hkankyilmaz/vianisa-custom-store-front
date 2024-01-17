function useAllProductsQuery(
  variantOptions,
  minPrice,
  maxPrice,
  sortKey,
  reverse,
) {
  return `#graphql
 ${PRODUCT_ITEM_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    
  ) @inContext(country: $country, language: $language) {
    products(
      first: $first
      last: $last
      before: $startCursor
      after: $endCursor
      sortKey: ${sortKey ? sortKey : 'TITLE'}
      reverse: ${reverse ? reverse : 'false'}
    ) {
      nodes {
        ...ProductItem
      }
      filters{
        id
        label
        type
        values{id label count input}
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
`;
}

export default useAllProductsQuery;

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
