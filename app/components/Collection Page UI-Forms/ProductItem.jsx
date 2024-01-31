import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/utils';

export default function ProductItem({product, loading}) {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  let minPrice = params.get('minprice');
  let maxPrice = params.get('maxprice');
  let color = params.getAll('color');
  let material = params.getAll('material');
  color = color[color.length - 1];
  material = material[material.length - 1];
  // console.log(color, material?.replace('-', ' '));

  let selectedVariant = color
    ? product.variants.nodes.find((variant) =>
        variant.selectedOptions.find(
          (item) => item.value.toLowerCase() === color,
        ),
      )
    : null;
  let variant = product.variants.nodes[0];
  if (material !== 'platinum') {
    if (material && color) {
      console.log(1);

      variant = product.variants.nodes
        .filter((variant_) =>
          variant_.selectedOptions.find(
            (slOps) =>
              slOps.name === 'Color' && slOps.value.toLowerCase() === color,
          ),
        )
        .find((variant_) =>
          variant_.selectedOptions.find(
            (slOps) =>
              slOps.name === 'Material' &&
              slOps.value.toLowerCase() === material?.replace('-', ' '),
          ),
        );
    } else if (material && !color) {
      console.log(2);
      console.log(product.variants.nodes);

      variant = product.variants.nodes.find((variant_) =>
        variant_.selectedOptions.find(
          (slOps) =>
            slOps.name === 'Material' &&
            slOps.value.toLowerCase() === material?.replace('-', ' '),
        ),
      );
    } else if (!material && color) {
      console.log(3);
      variant = product.variants.nodes.find((variant_) =>
        variant_.selectedOptions.find(
          (slOps) =>
            slOps.name === 'Color' && slOps.value.toLowerCase() === color,
        ),
      );
    }
  } else {
    console.log(product.variants.nodes.length);
  }

  /*  console.log(
    product.variants.nodes.filter((variant_) =>
      variant_.selectedOptions.find(
        (slOps) =>
          slOps.name === 'Color' && slOps.value.toLowerCase() === color,
      ),
    ),
    product.variants.nodes
      .filter((variant_) =>
        variant_.selectedOptions.find(
          (slOps) =>
            slOps.name === 'Color' && slOps.value.toLowerCase() === color,
        ),
      )
      .find((variant_) =>
        variant_.selectedOptions.find(
          (slOps) =>
            slOps.name === 'Material' &&
            slOps.value.toLowerCase() === material.replace('-', ' '),
        ),
      ),
    material.replace('-', ' '),
  ); */
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return (
    <Link className="" key={product.id} prefetch="intent" to={variantUrl}>
      <div className="font-avenir-medium max-sm:text-[8px] text-[10px] tracking-[2px] text-[#2f2f2f] mb-3 md:mb-4">
        ON SALE
      </div>
      {product.featuredImage && (
        <div className="w-full relative overflow-hidden ">
          {selectedVariant ? (
            <>
              <Image
                className="transition-opacity opacity-100 hover:opacity-0"
                alt={selectedVariant?.altText || product?.title}
                aspectRatio="4/3"
                data={selectedVariant.image}
                loading={loading}
                sizes="(min-width: 45em) 400px, 100vw"
              />
              <Image
                className="transition-opacity opacity-0 hover:opacity-100 absolute top-0 "
                alt={product.images.nodes[1]?.altText || product?.title}
                aspectRatio="4/3"
                data={product.images.nodes[1]}
                loading={loading}
                sizes="(min-width: 45em) 400px, 100vw"
              />
            </>
          ) : (
            <>
              <Image
                className="transition-opacity opacity-100 hover:opacity-0"
                alt={product.featuredImage?.altText || product?.title}
                aspectRatio="4/3"
                data={product.featuredImage}
                loading={loading}
                sizes="(min-width: 45em) 400px, 100vw"
              />
              <Image
                className="transition-opacity opacity-0 hover:opacity-100 absolute top-0 "
                alt={product.images.nodes[1]?.altText || product?.title}
                aspectRatio="4/3"
                data={product.images.nodes[1]}
                loading={loading}
                sizes="(min-width: 45em) 400px, 100vw"
              />
            </>
          )}
        </div>
      )}
      <h4 className="dynamic-margin-top mt-14 mb-1 font-avenir-medium max-sm:text-[10px] text-[11px] tracking-[2.2px] text-[#2f2f2f] uppercase">
        {product.title}
      </h4>
      <div className="flex gap-[10px]">
        <Money
          className="font-avenir-medium max-sm:text-[10px] text-[11px] tracking-[2.2px] text-[#e22120]"
          data={product.priceRange.minVariantPrice}
        />
        <s className="!text-black">
          <Money
            className="font-avenir-medium max-sm:text-[10px] text-[11px] tracking-[2.2px] text-[#2f2f2f]"
            data={product.variants.nodes[0].compareAtPrice}
          />
        </s>
      </div>
    </Link>
  );
}
