import * as React from 'react';
import {Link} from '@remix-run/react';

export default function GoldOptionSolidVermeil({tags, url}) {
  const isSolid = tags?.includes('Solid_to_Vermeil');
  const isVermeil = tags?.includes('Vermeil_to_Solid');

  if (isSolid || isVermeil)
    return (
      <div className=" mb-6 flex justify-start items-center gap-[5px]">
        <h5 className="h-full font-bold text-[13px] mr-5 flex justify-center items-center font-body text-[#2f2f2f] pt-[10px]">
          Metal Type :
        </h5>
        <div className="h-full flex justify-center items-center gap-[5px]">
          <CaratItem
            isStyle={isSolid}
            name={'Solid Gold'}
            url={
              isSolid ? url : url.replace('gold-vermeil', 'in-14k-solid-gold')
            }
            key={url}
            tags={tags}
          />
          <CaratItem
            isStyle={isVermeil}
            name={'Gold Vermeil'}
            url={
              !isSolid ? url : url.replace('in-14k-solid-gold', 'gold-vermeil')
            }
            key={url}
            tags={tags}
          />
        </div>
      </div>
    );

  return undefined;
}
function CaratItem({name, url, isStyle}) {
  return (
    <Link
      style={{
        backgroundColor: isStyle ? 'white' : '',
        border: isStyle ? '2px solid black' : '',
        color: isStyle ? 'black' : '',
        cursor: isStyle ? 'default' : '',
      }}
      prefetch="intent"
      className=" border-2  min-w-[70px] px-[12px] py-[15px] text-center whitespace-pre-line rounded-full hover:bg-[#DEA595] hover:text-white ease-linear duration-75 sm: text-[13px]"
      to={`/products/` + url}
      preventScrollReset
    >
      {name.replaceAll(' ', '\n')}
    </Link>
  );
}
