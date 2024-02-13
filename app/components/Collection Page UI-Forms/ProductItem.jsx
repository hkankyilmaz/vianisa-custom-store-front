import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/utils';

export default function ProductItem({product, color, material, loading}) {
  const variant = (() => {
    const color_ = color ? (Array.isArray(color) ? color : [color]) : [];
    const material_ = material
      ? Array.isArray(material)
        ? material
        : [material]
      : [];
    const variantOptions = [];

    if (color_.length && material_.length) {
      for (let i = color_.length - 1; i >= 0; i--) {
        for (let j = material_.length - 1; j >= 0; j--) {
          variantOptions.push({
            color: color_[i],
            material: material_[j],
          });
        }
      }
    } else {
      const singleAttribute = color_.length ? color_ : material_;
      const key = color_.length ? 'color' : 'material';

      for (let i = singleAttribute.length - 1; i >= 0; i--) {
        variantOptions.push({
          [key]: singleAttribute[i],
        });
      }
    }

    const variants = [
      ...variantOptions.map((variantOption) => {
        return product.variants.nodes.find((variant_) => {
          const colorMatch = variantOption?.color
            ? variant_.selectedOptions.some(
                (option) =>
                  option.name === 'Color' &&
                  option.value.toLowerCase() === variantOption.color,
              )
            : true;

          const materialMatch = variantOption?.material
            ? variant_.selectedOptions.some(
                (option) =>
                  option.name === 'Material' &&
                  option.value.toLowerCase() ===
                    variantOption.material.split('-').join(' '),
              )
            : true;

          return colorMatch && materialMatch;
        });
      }),
      product.variants.nodes[0],
    ];

    return variants.filter(Boolean)[0];
  })();
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);

  return (
    <Link className="" key={product.id} prefetch="intent" to={variantUrl}>
      <div className="font-avenir-medium max-sm:text-[8px] text-[10px] tracking-[2px] text-[#2f2f2f] mb-3 md:mb-4">
        ON SALE
      </div>
      {product.featuredImage && (
        <div className="w-full relative overflow-hidden ">
          <Image
            className="transition-opacity opacity-100 hover:opacity-0"
            alt={variant?.altText || product?.title}
            aspectRatio="4/3"
            data={variant.image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
          />
          <Image
            className="transition-opacity opacity-0 hover:opacity-100 absolute top-0 "
            alt={product.images.nodes[1]?.altText || product?.title}
            aspectRatio="4/3"
            data={
              variant.image.url == product.images.nodes[0].url
                ? product.images.nodes[1]
                : product.images.nodes[0]
            }
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
          />
        </div>
      )}
      <h4 className="dynamic-margin-top mt-14 mb-1 font-avenir-medium max-sm:text-[10px] text-[11px] tracking-[2.2px] text-[#2f2f2f] uppercase">
        {product.title}
      </h4>
      <div className="flex gap-[10px]">
        <Money
          className="font-avenir-medium max-sm:text-[10px] text-[11px] tracking-[2.2px] text-[#e22120]"
          data={variant.price}
        />
        <s className="!text-black">
          <Money
            className="font-avenir-medium max-sm:text-[10px] text-[11px] tracking-[2.2px] text-[#2f2f2f]"
            data={variant.compareAtPrice}
          />
        </s>
      </div>
    </Link>
  );
}
