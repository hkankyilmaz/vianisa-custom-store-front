import {json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData, Link, useNavigate} from '@remix-run/react';
import {
  Pagination,
  getPaginationVariables,
  Image,
  Money,
} from '@shopify/hydrogen';
import {useVariantUrl} from '~/utils';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data.collection.title} Collection`}];
};
function valuetext(value) {
  return `${value}°C`;
}
export async function loader({request, params, context}) {
  const {handle} = params;
  const {storefront} = context;
  const url = new URL(request.url);

  const params1 = url.searchParams;

  const max = parseFloat(params1.get('price_max'));
  const min = parseFloat(params1.get('price_min'));
  const color = params1.get('color');
  const material = params1.get('material');

  console.log(params1);
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 3,
  });
  //console.log(paginationVariables);

  if (!handle) {
    return redirect('/collections');
  }

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, max, min, ...paginationVariables},
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }
  return json({collection});
}

export default function Collection() {
  const {collection} = useLoaderData();
  //console.log(collection);
  return (
    <div className="collection">
      <h1>{collection.title}</h1>
      <p className="collection-description">{collection.description}</p>
      <Pagination connection={collection.products}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
            </PreviousLink>
            <ProductsGrid
              products={nodes}
              filters={collection.products.filters}
            />
            <br />
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more ↓</span>}
            </NextLink>
          </>
        )}
      </Pagination>
    </div>
  );
}

function ProductsGrid({products, filters}) {
  const [value, setValue] = useState([0, 1927]);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(
      '/collections/jewelry?price_min=' + value[0] + '&price_max=' + value[1],
    );
  };
  const [checked, setChecked] = React.useState([]);

  const handleChange2 = (event) => {
    console.log(event.target.name);

    setChecked(event.target.name);
  };

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        className="CollectionInner__Sidebar CollectionInner__Sidebar--withTopToolbar hidden-pocket"
        style={{paddingLeft: '1%', marginRight: '2%'}}
      >
        <div className="CollectionFilters">
          <div
            className="Collapsible Collapsible--padded Collapsible--autoExpand"
            data-filter-index="0"
          >
            <button
              type="button"
              className="Collapsible__Button Heading u-h6"
              data-action="toggle-collapsible"
              aria-expanded="false"
            >
              Price<span className="Collapsible__Plus"></span>
            </button>

            <div className="Collapsible__Inner">
              <div className="Collapsible__Content">
                <Box sx={{width: 200}}>
                  <Slider
                    max={1927}
                    min={0}
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    width={'10'}
                  />
                  <div
                    className="price-range__input-group"
                    style={{display: 'flex', alignItems: 'center'}}
                  >
                    <TextField
                      id="input-with-icon-textfield"
                      // label="TextField"
                      value={value[0]}
                      size="small"
                      onChange={(news) => setValue([news, ...value[1]])}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      // variant="standard"
                    />

                    <span className="price-range__delimiter text--small">
                      -
                    </span>
                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                      <AttachMoneyIcon
                        sx={{color: 'action.active', mr: 1, my: 0.5}}
                      />
                      <TextField
                        id="input-with-sx"
                        variant="standard"
                        value={value[1]}
                      />
                    </Box>
                    {/* <TextField
                        id="input-with-icon-textfield"
                        // label="TextField"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AttachMoneyIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        // variant="standard"
                      /> */}
                  </div>
                </Box>
              </div>
            </div>
          </div>

          {filters.map((item) =>
            item.label !== 'Price' ? (
              <div>
                <Box sx={{display: 'flex', flexDirection: 'column', mb: 1}}>
                  {item.values.map((y, index) => (
                    <Button
                      name={item.label + '=' + y.label.toLowerCase()}
                      className={y.label.toLowerCase()}
                      onClick={handleChange2}
                      variant="contained"
                      color="success"
                    >
                      {y.label} ({y.count})
                    </Button>
                  ))}
                </Box>
              </div>
            ) : (
              ''
            ),
          )}
          <input type="hidden" name="sort_by" value="title-ascending" />
          {/* </form> */}
        </div>
      </div>
      <div className="products-grid" style={{display: 'block'}}>
        {products.map((product, index) => {
          return (
            <ProductItem
              key={product.id}
              product={product}
              loading={index < 8 ? 'eager' : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}

function ProductItem({product, loading}) {
  const variant = product.variants.nodes[0];
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return (
    <div style={{display: 'inline-block', width: '19%'}}>
      <Link
        className="product-item"
        key={product.id}
        prefetch="intent"
        to={variantUrl}
      >
        {product.featuredImage && (
          <Image
            alt={product.featuredImage.altText || product.title}
            aspectRatio="1/1"
            data={product.featuredImage}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
          />
        )}
        <h4>{product.title}</h4>
        <small>
          <Money data={product.priceRange.minVariantPrice} />
        </small>
      </Link>
    </div>
  );
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

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $min: Float
    $max: Float
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: [
          {price: {min:$min,max:$max} }
        ]
      ) {
        filters {
          label
          values {
            id
            label
            count
          }
        }
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;
