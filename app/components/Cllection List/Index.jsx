import React from 'react';

import photo from '../../assets/E_0021.png';
import photo1 from '../../assets/E_0237.png';

function CollectionList() {
  return (
    <div className="res-margine flex flex-col">
      <div className="w-full flex max-md:flex-col max-md:px-2">
        {/* <div
          className={`w-full md:w-[50%] bg-[#DEA595] mr-2 mb-2 flex items-center max-md:text-[12px] max-md:pt-[88.6%] relative`}
        >
          <div className="flex flex-col justify-center text-white ml-3 md:ml-7 absolute bottom-[50%] translate-y-[50%]">
            <span className="text-sm">TRENDING</span>
            <span className="text-2xl">GIFT IDEAS</span>
            <span>
              Explore newest solid gold jewelry and find the perfect gift
            </span>
            <span>from customizable name jewelry to colored birthstones</span>
            <span>engravable signet rings and diamond masterpieces.</span>
          </div>
        </div> */}
        <Item width="50%" title={'ESSENTIALS'} photo={photo1} />
        <Item width="50%" title={'ESSENTIALS'} photo={photo1} />
      </div>
      <div className="w-full flex max-md:flex-wrap [&>div:nth-child(odd)]:max-md:pl-2 [&>div:nth-child(odd)]:max-md:pr-1 [&>div:nth-child(even)]:max-md:pl-1 [&>div:nth-child(even)]:max-md:pr-2">
        <Item width="50%" title={'SIGNED RINGS'} photo={photo1} />
        <Item width="50%" title={'FASHION RINGS'} photo={photo1} />
      </div>
    </div>
  );
}

function Item({title, photo, url, width}) {
  return (
    <div
      // style={{width: `${width}`}}
      className={`md:mr-2 mb-2 relative ${
        width == '50%' ? 'w-[50%]' : 'w-[33%]'
      } ${width == '50%' ? 'max-md:w-full' : 'max-md:w-[50%]'}`}
    >
      <img className="w-full" src={photo} />
      <div className="flex flex-col text-white absolute left-5 bottom-5">
        <span className="mb-1">{title} </span>
        <button className="w-[150px] py-[7px] px-[20px] border-solid bg-white hover:bg-transparent hover:text-white border-white border-[1px] text-black">
          See More
        </button>
      </div>
    </div>
  );
}

export default CollectionList;
