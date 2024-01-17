function useGenerateCollectionQuery(
  variantOptions,
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
    tags
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
