import * as React from 'react';
import {Link} from '@remix-run/react';
import useEmblaCarousel from 'embla-carousel-react';
import {useEffect, useState, useCallback} from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {matches} from 'lodash';

export default function CaratOptions({
  carats,
  matches,
  modifiedStringwithCarat,
}) {
  return (
    <div className=" mb-6 flex justify-start items-center gap-[5px]">
      <h5 className="h-full font-bold text-[13px] mr-5 flex justify-center items-center font-body text-[#2f2f2f] pt-[10px]">
        Total Carat Weight:
      </h5>
      <div className="h-full flex justify-center items-center gap-[5px]">
        {carats.map((carat) => (
          <CaratItem
            name={carat}
            matches={matches}
            modifiedStringwithCarat={modifiedStringwithCarat}
            key={carat}
          />
        ))}
        {/*  <Link
          style={{
            backgroundColor: matches.includes('-1-50-ct') ? 'white' : '',
            border: matches.includes('-1-50-ct') ? '2px solid black' : '',
            color: matches.includes('-1-50-ct') ? 'black' : '',
            cursor: matches.includes('-1-50-ct') ? 'default' : '',
          }}
          className=" border-2 px-[12px] py-[15px] rounded-full hover:bg-[#DEA595] hover:text-white ease-linear duration-75 sm: text-[13px]"
          prefetch="intent"
          to={`/products/${modifiedStringwithCarat}-1-50-ct`}
          preventScrollReset
        >
          1.5ct
        </Link>
        <Link
          style={{
            backgroundColor: matches.includes('-2-00-ct') ? 'white' : '',
            border: matches.includes('-2-00-ct') ? '2px solid black' : '',
            color: matches.includes('-2-00-ct') ? 'black' : '',
            cursor: matches.includes('-2-00-ct') ? 'default' : '',
          }}
          className=" border-2 px-[12px] py-[15px] rounded-full hover:bg-[#DEA595] hover:text-white ease-linear duration-75 sm: text-[13px]"
          prefetch="intent"
          to={`/products/${modifiedStringwithCarat}-2-00-ct`}
          preventScrollReset
        >
          2.0ct
        </Link> */}
      </div>
    </div>
  );
}
function CaratItem({name, matches, modifiedStringwithCarat}) {
  let title = '';
  let handle_ = '';
  if (name === '1') {
    title = '1.00ct';
    handle_ = '-1-00-ct';
  } else if (name === '1.5') {
    title = '1.50ct';
    handle_ = '-1-50-ct';
  } else if (name === '2') {
    title = '2.00ct';
    handle_ = '-2-00-ct';
  }
  return (
    <Link
      style={{
        backgroundColor: matches.includes(handle_) ? 'white' : '',
        border: matches.includes(handle_) ? '2px solid black' : '',
        color: matches.includes(handle_) ? 'black' : '',
        cursor: matches.includes(handle_) ? 'default' : '',
      }}
      prefetch="intent"
      className=" border-2 px-[12px] py-[15px] rounded-full hover:bg-[#DEA595] hover:text-white ease-linear duration-75 sm: text-[13px]"
      to={`/products/${modifiedStringwithCarat + handle_}`}
      preventScrollReset
    >
      {title}
    </Link>
  );
}
