import React, {useRef, useState} from 'react';
import {BsChevronRight, BsChevronLeft} from 'react-icons/bs';
import gsap from 'gsap';

function FeaturedCollection({data}) {
  const [panigate, setPanigate] = useState(0);
  const [width, setWidth] = useState(0);
  const refOne = useRef();
  const refTwo = useRef();

  const handleClick = (j) => {
    if (j == 'right') {
      setWidth((prev) => prev + refOne.current.offsetWidth);
      setPanigate((prev) => prev + 1);
      const Iwidth = width + refOne.current.offsetWidth;
      console.log(width, Iwidth);
      document.documentElement.style.setProperty('--x', `${-Iwidth}px`);
    }

    if (j == 'left') {
      setWidth((prev) => prev - refOne.current.offsetWidth);
      setPanigate((prev) => prev - 1);
      const Iwidth = width - refOne.current.offsetWidth;
      console.log(width, Iwidth);
      document.documentElement.style.setProperty('--x', `${-Iwidth}px`);
    }
  };

  // const handleClick = (j) => {
  //   console.log(refTwo.current.offsetWidth);
  //   if (j == 'right') {
  //     gsap.to(refTwo.current, {
  //       x: `+=${-refOne.current.offsetWidth}`,
  //     });
  //     setPanigate((prev) => prev + 1);
  //   }

  //   if (j == 'left') {
  //     gsap.to(refTwo.current, {
  //       x: `+=${refOne.current.offsetWidth}`,
  //     });
  //     setPanigate((prev) => prev - 1);
  //   }
  // };

  return (
    <section className="flex flex-col justify-center items-center my-5 relative">
      <div className="text-xl text-center uppercase mb-5 w-[95%] sm:w-[80%]">
        {data.collection.title}
      </div>
      <div
        ref={refOne}
        className="w-[85%] overflow-x-scroll whitespace-nowrap slider__featuredCol"
      >
        <div className="product-wrapper__featuredCol" ref={refTwo}>
          {data?.collection?.products?.nodes?.map((product, idx) => (
            <Item key={idx} product={product} />
          ))}
        </div>

        <button
          style={{display: panigate == 0 ? 'none' : 'initial'}}
          onClick={() => handleClick('left')}
          className="left-16 slider-btn__featuredCol"
        >
          <BsChevronLeft />
        </button>
        <button
          style={{display: panigate == 4 ? 'none' : 'initial'}}
          onClick={() => handleClick('right')}
          className="right-20 slider-btn__featuredCol"
        >
          <BsChevronRight />
        </button>
      </div>
    </section>
  );
}

export default FeaturedCollection;

function Item({product}) {
  return (
    <div className="inline-block w-[25%] pr-5 align-top">
      <div>Sale</div>
      <div className="w-full">
        <img className="w-full h-auto" src={product.images.nodes[0].url} />
      </div>
      <div className="flex justify-start items-center whitespace-normal">
        {product.title}
      </div>
      <div> {product.variants.nodes[0].price.amount} </div>
    </div>
  );
}
