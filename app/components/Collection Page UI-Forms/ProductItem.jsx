import {useVariantUrl} from '~/utils';
import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

export default function ProductItem({product, loading}) {
  console.log(product);

  const variant = product.variants.nodes[0];
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return (
    <Link className="" key={product.id} prefetch="intent" to={variantUrl}>
      <div className="font-montserratMd max-sm:text-[8px] text-[10px] tracking-[2px] text-[#2f2f2f] max-lg:mb-0 mb-3 ml-4">
        ON SALE
      </div>
      {product.featuredImage && (
        <div className="w-full relative overflow-hidden ">
          <Image
            className="transition-opacity opacity-100 hover:opacity-0"
            alt={product.featuredImage.altText || product.title}
            aspectRatio="4/3"
            data={product.featuredImage}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
          />
          <Image
            className="transition-opacity opacity-0 hover:opacity-100 absolute top-0 "
            alt={product.images.nodes[1].altText || product.title}
            aspectRatio="4/3"
            data={product.images.nodes[1]}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
          />
        </div>
      )}
      <h4 className="dynamic-margin-top mt-14 mb-1 font-montserratMd max-sm:text-[10px] text-[11px] tracking-[2.2px] text-[#2f2f2f] uppercase">
        {product.title}
      </h4>
      <div className="flex gap-[10px]">
        <Money
          className="font-montserratMd max-sm:text-[10px] text-[11px] font-bold tracking-[2.2px] text-[#e22120]"
          data={product.priceRange.minVariantPrice}
        />
        <s className="!text-black">
          <Money
            className="font-montserratMd max-sm:text-[10px] text-[11px] tracking-[2.2px] text-[#2f2f2f]"
            data={product.variants.nodes[0].compareAtPrice}
          />
        </s>
      </div>
    </Link>
  );
}
