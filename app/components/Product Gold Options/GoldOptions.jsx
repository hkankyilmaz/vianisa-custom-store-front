import * as React from 'react';
import {Link} from '@remix-run/react';

export default function GoldOptions({types, matches, url}) {
  return (
    <div className=" mb-6 flex justify-start items-center gap-[5px]">
      <h5 className="h-full font-bold text-[13px] mr-5 flex justify-center items-center font-body text-[#2f2f2f] pt-[10px]">
        Metal Type :
      </h5>
      <div className="h-full flex justify-center items-center gap-[5px]">
        {types.map((carat) => (
          <CaratItem name={carat} url={url} key={carat} />
        ))}
      </div>
    </div>
  );
}
function CaratItem({name, url}) {
  let title = '';
  let handle_ = '';
  let handle_2 = '';
  if (name === 'goldvermeil') {
    title = 'Gold Vermeil';
    handle_ = 'gold-vermeil';
    handle_2 = 'in-14k-solid-gold';
  } else if (name === 'solid') {
    title = 'Solid Gold';
    handle_ = 'in-14k-solid-gold';
    handle_2 = 'gold-vermeil';
  }
  return (
    <Link
      style={{
        backgroundColor: url.includes(handle_) ? 'white' : '',
        border: url.includes(handle_) ? '2px solid black' : '',
        color: url.includes(handle_) ? 'black' : '',
        cursor: url.includes(handle_) ? 'default' : '',
      }}
      prefetch="intent"
      className=" border-2  min-w-[70px] px-[12px] py-[15px] text-center whitespace-pre-line rounded-full hover:bg-[#DEA595] hover:text-white ease-linear duration-75 sm: text-[13px]"
      to={`/products/` + url.replace(handle_2, handle_)}
      preventScrollReset
    >
      {title.replaceAll(' ', '\n')}
    </Link>
  );
}
