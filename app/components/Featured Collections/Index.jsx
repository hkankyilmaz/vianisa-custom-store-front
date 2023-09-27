import React, {useRef, useState, useEffect} from 'react';
import {BsChevronRight, BsChevronLeft} from 'react-icons/bs';
import {Image} from '@shopify/hydrogen';
import gsap from 'gsap';

function FeaturedCollection({data}) {
  const [panigate, setPanigate] = useState(0);
  const [width, setWidth] = useState(0);
  const refOne = useRef();
  const refTwo = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', (e) => {
        document.documentElement.style.setProperty('--x', `${0}px`);
      });
    }
  }, []);

  const handleClick = (j) => {
    if (j == 'right') {
      setWidth((prev) => prev + refOne.current.offsetWidth);
      setPanigate((prev) => prev + 1);
      const Iwidth = width + refOne.current.offsetWidth;
      document.documentElement.style.setProperty('--x', `${-Iwidth}px`);
    }

    if (j == 'left') {
      setWidth((prev) => prev - refOne.current.offsetWidth);
      setPanigate((prev) => prev - 1);
      const Iwidth = width - refOne.current.offsetWidth;
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
    <section className="flex flex-col justify-center items-center my-5 relative res-margine">
      <div className="text-xl text-center uppercase mb-5 w-full">
        {data.collection.title}
      </div>
      <div
        ref={refOne}
        className="w-full overflow-x-scroll whitespace-nowrap slider__featuredCol"
      >
        <div className="product-wrapper__featuredCol" ref={refTwo}>
          {data?.collection?.products?.nodes?.map((product, idx) => (
            <Item key={idx} product={product} />
          ))}
        </div>

        <button
          style={{display: panigate == 0 ? 'none' : 'initial'}}
          onClick={() => handleClick('left')}
          className="left-[-4em] slider-btn__featuredCol"
        >
          <BsChevronLeft />
        </button>
        <button
          style={{display: panigate == 4 ? 'none' : 'initial'}}
          onClick={() => handleClick('right')}
          className="right-[-3em] slider-btn__featuredCol"
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
      <div className="text-xs">Sale</div>
      <div className="w-full">
        <Image
          className="w-full h-auto"
          width="4000"
          loading="eager"
          src={product.images.nodes[0].url}
        />
      </div>
      <div className="flex justify-start items-center whitespace-normal text-xs">
        {product.title}
      </div>
      <div className="text-xs"> {product.variants.nodes[0].price.amount} </div>
    </div>
  );
}
