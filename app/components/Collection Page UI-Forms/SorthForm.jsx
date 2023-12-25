import React from 'react';
import {useNavigate} from '@remix-run/react';

function SorthForm() {
  const navigate = useNavigate();

  const handleClick = (sort, reverse) => {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    params.set('sortkey', sort);
    params.set('reverse', reverse);
    console.log(params.toString());
    navigate(`?${params.toString()}`);
  };
  return (
    <div className="clip-path-filter rounded-md [&>p:hover]:underline [&>p]:cursor-pointer [&>p]:mb-2 [&>p]:text-right sortabsolute absolute top-[105%] right-0 w-[300px] py-10 px-10 h-auto text-slate-600 bg-[#e5e7eb] shadow-md">
      <p onClick={() => handleClick('COLLECTION_DEFAULT', false)}>FEATURED</p>
      <p onClick={() => handleClick('BEST_SELLING', false)}>BEST SELLING</p>
      <p onClick={() => handleClick('TITLE', false)}>ALPHABETICALLY, A-Z</p>
      <p onClick={() => handleClick('TITLE', true)}>ALPHABETICALLY, Z-A</p>
      <p onClick={() => handleClick('PRICE', false)}>PRICE, LOW TO HIGH</p>
      <p onClick={() => handleClick('PRICE', true)}>PRICE, HIGH TO LOW</p>
      <p onClick={() => handleClick('CREATED', false)}>DATE, OLD TO NEW</p>
      <p onClick={() => handleClick('CREATED', false)}>DATE, NEW TO OLD</p>
    </div>
  );
}

export default SorthForm;
