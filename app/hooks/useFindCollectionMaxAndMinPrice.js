export default function useFindCollectionMaxAndMinPrice(param) {
  return `#graphql
 ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: 1,
        ${param === 'min' ? 'reverse: false' : 'reverse: true'}
        sortKey: PRICE
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
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;
