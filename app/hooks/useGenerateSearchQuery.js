function useGenerateSearchQuery(
  variantOptions,
  minPrice,
  maxPrice,
  sortKey,
  reverse,
) {
  return `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
 
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
      last: $last,
      before: $startCursor,
      after: $endCursor,
      sortKey: ${sortKey ? sortKey : 'RELEVANCE'},
      reverse: ${reverse ? reverse : 'false'},
      productFilters : { 
        ${
          maxPrice && minPrice
            ? ` price: { min: ${minPrice}, max: ${maxPrice} },`
            : ''
        }
        ${(() => {
          if (variantOptions && variantOptions.length > 0) {
            const variantQuery = variantOptions.map((option) => {
              return `variantOption: {name: "${
                option.name
              }", value: "${option.value
                .split('-')
                .map((word) => {
                  return word.charAt(0).toUpperCase() + word.slice(1);
                })
                .filter((word) => {
                  return word !== '';
                })
                .join(' ')}"}`;
            });
            return variantQuery.join(',');
          } else return '';
        })()}
       }
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
}

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

export default useGenerateSearchQuery;
