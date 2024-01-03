import React from 'react';
import {useNavigate} from '@remix-run/react';

function SorthForm({closeMobileSort}) {
  const navigate = useNavigate();
  const handleClick = (sort, reverse) => {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    params.set('sortkey', sort);
    params.set('reverse', reverse);

    closeMobileSort();

    //bug
    let root_ = document.documentElement.style;
    root_.setProperty('--sort-modal-visibility', 'hidden');
    root_.setProperty('--sort-modal-position', 'translateY(100%)');
    document.documentElement.style.overflowY = 'auto';

    navigate(`?${params.toString()}`);
  };
  return (
    <>
      <div className="modal-shadow translate-y-2 max-lg:hidden w-max z-20  rounded-md [&>p:hover]:underline cursor-[initial] [&>p]:mb-2 absolute top-[105%] right-0  h-auto">
        <div className="sort-modal-desktop rounded-xl flex justify-center items-center flex-col py-7 clip-path-filter bg-[#efefef] [&>p]:text-right">
          <p
            className="sort-btn"
            onClick={() => handleClick('COLLECTION_DEFAULT', false)}
          >
            FEATURED
          </p>
          <p
            className="sort-btn"
            onClick={() => handleClick('BEST_SELLING', false)}
          >
            BEST SELLING
          </p>
          <p className="sort-btn" onClick={() => handleClick('TITLE', false)}>
            ALPHABETICALLY, A-Z
          </p>
          <p className="sort-btn" onClick={() => handleClick('TITLE', true)}>
            ALPHABETICALLY, Z-A
          </p>
          <p className="sort-btn" onClick={() => handleClick('PRICE', false)}>
            PRICE, LOW TO HIGH
          </p>
          <p className="sort-btn" onClick={() => handleClick('PRICE', true)}>
            PRICE, HIGH TO LOW
          </p>
          <p className="sort-btn" onClick={() => handleClick('CREATED', false)}>
            DATE, OLD TO NEW
          </p>
          <p className="sort-btn" onClick={() => handleClick('CREATED', false)}>
            DATE, NEW TO OLD
          </p>
        </div>
      </div>
      <div className="modal-shadow lg:hidden w-full z-20 [&>p:hover]:underline cursor-[initial] [&>p]:mb-2 fixed left-0 right-0 bottom-0">
        <div className="sort-modal absolute bottom-0 right-0 left-0 flex justify-center h-min items-center flex-col py-[18px] bg-[#efefef] ">
          <header className="w-full text-center px-5 py-[13px]  text-[#2f2f2f] text-xl font-playfair tracking-[4px] font-bold">
            SORT
          </header>
          <p
            className="sort-btn"
            onClick={() => handleClick('COLLECTION_DEFAULT', false)}
          >
            FEATURED
          </p>
          <p
            className="sort-btn"
            onClick={() => handleClick('BEST_SELLING', false)}
          >
            BEST SELLING
          </p>
          <p className="sort-btn" onClick={() => handleClick('TITLE', false)}>
            ALPHABETICALLY, A-Z
          </p>
          <p className="sort-btn" onClick={() => handleClick('TITLE', true)}>
            ALPHABETICALLY, Z-A
          </p>
          <p className="sort-btn" onClick={() => handleClick('PRICE', false)}>
            PRICE, LOW TO HIGH
          </p>
          <p className="sort-btn" onClick={() => handleClick('PRICE', true)}>
            PRICE, HIGH TO LOW
          </p>
          <p className="sort-btn" onClick={() => handleClick('CREATED', false)}>
            DATE, OLD TO NEW
          </p>
          <p className="sort-btn" onClick={() => handleClick('CREATED', false)}>
            DATE, NEW TO OLD
          </p>
        </div>
      </div>
    </>
  );
}

export default SorthForm;
