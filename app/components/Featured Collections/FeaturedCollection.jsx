'use client';

import {useRef, useState, useEffect} from 'react';
import {BsChevronRight, BsChevronLeft} from 'react-icons/bs';
import {Image} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {Money} from '@shopify/hydrogen';
import {cubicBezier, motion, useAnimate, useMotionValue} from 'framer-motion';

function FeaturedCollection({data}) {
  const items = data.collection?.products?.nodes.map((product, index) => (
    <Item product={product} key={index} />
  ));

  return (
    <section className="my-16 font-montserratMd">
      <div className="text-xl text-center uppercase mb-5 w-full">
        {data.collection?.title}
      </div>
      <div className="lg:mx-[25px] xl:mx-[100px] 2xl:mx-[200px]">
        <Carousel items={items} itemsPerGroup={4} />
      </div>
    </section>
  );
}

export default FeaturedCollection;

/*********************************************************/

const Carousel = ({items, itemsPerGroup = 1, loop = false}) => {
  const [scope, animate] = useAnimate();
  const [width, setWidth] = useState(0);
  const carouselContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTabletSize, setIsTabletSize] = useState(false);
  const [hasCrossedThreshold, setHasCrossedThreshold] = useState(false);
  const x = useMotionValue(0);
  const prevIsTabletSize = useRef(isTabletSize);
  const variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };
  const renderCount = useRef(0);

  const groupItems = (items, itemsPerGroup) => {
    return items.reduce((acc, item, index) => {
      const groupIndex = Math.floor(index / itemsPerGroup);
      const group = acc[groupIndex] || [];
      group.push(item);
      acc[groupIndex] = group;
      return acc;
    }, []);
  };

  const [itemGroups, setItemGroups] = useState(
    groupItems(items, itemsPerGroup),
  );

  const handleNext = () => {
    const nextIndex = loop
      ? (activeIndex + 1) % itemGroups.length
      : Math.min(activeIndex + 1, itemGroups.length - 1);
    const nextGroupLength = itemGroups[nextIndex].length;
    const isFullGroup = nextGroupLength == itemsPerGroup;
    const translateAmount =
      (isFullGroup
        ? nextIndex
        : nextIndex - 1 / (100 - 100 / nextGroupLength)) * 100;

    animate(
      scope.current,
      {translateX: `-${translateAmount}%`},
      {ease: cubicBezier(0.4, 0, 0.2, 1), duration: 0.5},
    );
    setActiveIndex(nextIndex);
    setHasCrossedThreshold(false);
  };

  const handlePrev = () => {
    const prevIndex = loop
      ? (activeIndex - 1 + itemGroups.length) % itemGroups.length
      : Math.max(activeIndex - 1, 0);
    const prevGroupLength = itemGroups[prevIndex].length;
    const isFullGroup = prevGroupLength == itemsPerGroup;
    const translateAmount =
      (isFullGroup
        ? prevIndex
        : prevIndex + 1 / (100 - 100 / prevGroupLength)) * 100;

    animate(
      scope.current,
      {translateX: `-${translateAmount}%`},
      {ease: cubicBezier(0.4, 0, 0.2, 1), duration: 0.5},
    );
    setActiveIndex(prevIndex);
    setHasCrossedThreshold(false);
  };

  const handleDragEnd = (event, info) => {
    const dragTreshold = 0.3;
    const dragAmount = Math.abs(
      info.offset.x / carouselContainerRef.current.offsetWidth,
    );

    if (dragAmount > dragTreshold && !hasCrossedThreshold && !isTabletSize) {
      setHasCrossedThreshold(true);
      info.offset.x > 0 ? handlePrev() : handleNext();
    }
  };

  useEffect(() => {
    const marginRight =
      (window.innerWidth / 100) * (window.innerWidth < 640 ? 19 : 26);

    setTimeout(() => {
      setWidth(
        scope.current.scrollWidth - scope.current.offsetWidth + marginRight,
      );
    }, 200);

    const handleResize = () => {
      const {scrollWidth, offsetWidth} = scope.current;
      const newWidth = scrollWidth - offsetWidth + marginRight;

      setWidth(newWidth);
      setIsTabletSize((prev) => {
        prevIsTabletSize.current = prev;
        return window.innerWidth < 1024;
      });

      if (renderCount.current == 0 && window.innerWidth < 1024) {
        renderCount.current++;
        setItemGroups(groupItems(items, 1));
      }

      if (window.innerWidth < 1024) {
        x.jump(0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isTabletSize && !prevIsTabletSize.current) {
      animate(scope.current, {translateX: '0%'});
      setActiveIndex(0); //jump kullanınca burada çalışmıyor animate kullanınca çalışıyor
      //x.jump(0);
      setItemGroups(groupItems(items, 1));
    }

    if (!isTabletSize && prevIsTabletSize.current) {
      //x.jump(0);
      setItemGroups(groupItems(items, itemsPerGroup));
    }
  }, [isTabletSize]);

  return (
    <>
      <div className="relative max-xl:flex max-xl:items-center">
        <div
          className={`max-lg:hidden lg:mr-4 xl:absolute xl:top-1/2 xl:-translate-y-1/2 xl:-left-20 xl:z-10 ${
            activeIndex == 0 ? 'invisible' : ''
          }`}
        >
          <button
            className="bg-white rounded-full p-5 shadow-md prev-button"
            onClick={handlePrev}
          >
            <BsChevronLeft className="text-2xl text-gray-500" />
          </button>
        </div>
        <motion.div
          className="overflow-hidden flex flex-col justify-center max-xl:flex-1 cursor-grab"
          ref={carouselContainerRef}
        >
          <motion.div
            drag="x"
            dragConstraints={{
              right: 0,
              left: isTabletSize ? -width : 0,
            }}
            onDragEnd={isTabletSize ? null : handleDragEnd}
            style={{x}}
            className="flex flex-row items-center"
            variants={variants}
            initial="hidden"
            animate="visible"
            ref={scope}
          >
            {itemGroups.map((group, index) => (
              <CarouselItemGroup
                key={index}
                items={group}
                itemsPerGroup={isTabletSize ? 1 : itemsPerGroup}
              />
            ))}
          </motion.div>
        </motion.div>
        <div
          className={`max-lg:hidden lg:ml-4 xl:absolute xl:top-1/2 xl:-translate-y-1/2 xl:-right-20 xl:z-10 ${
            activeIndex == itemGroups.length - 1 ? 'invisible' : ''
          }`}
        >
          <button
            onClick={handleNext}
            className="bg-white rounded-full p-5 shadow-md next-button"
          >
            <BsChevronRight className="text-2xl text-gray-500" />
          </button>
        </div>
      </div>
    </>
  );
};

const CarouselItem = ({item}) => {
  return item;
};

const CarouselItemGroup = ({items, itemsPerGroup}) => {
  return (
    <motion.div
      className="grid min-w-[62%] px-[12px] sm:px-[15px] lg:px-0 sm:min-w-[48%] lg:min-w-full flex-1 max-lg:first-of-type:ml-[26%] max-sm:first-of-type:ml-[19%]"
      style={{gridTemplateColumns: `repeat(${itemsPerGroup}, minmax(0, 1fr))`}}
    >
      {items.map((item, index) => (
        <CarouselItem key={index} item={item} />
      ))}
    </motion.div>
  );
};

/*********************************************************/

function Item({product, className = ''}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Link
      prefetch="intent"
      to={`/products/${product.handle}`}
      className={`cursor-pointer w-full ${className}`}
      onDragStart={(e) => {
        setIsDragging(true);
        e.preventDefault();
      }}
      onDragEnd={() => {
        setIsDragging(false);
      }}
    >
      <div className="w-full relative overflow-hidden aspect-square h-auto flex items-center">
        <div className="uppercase absolute top-1.5 left-2.5 my-1 py-0.5 px-1.5 text-xs tracking-[.2em] text-[var(--text-color-light)] font-montserratMd font-bold transition-[color] ease-css-ease-in-out duration-200 text-[8px] sm:text-[10px]">
          on sale
        </div>
        <Image
          className="w-full h-auto transition-opacity duration-300 css-ease opacity-100 hover:opacity-0"
          loading="eager"
          sizes="400px"
          src={product.images.nodes[0].url}
          onClick={(e) => {
            if (isDragging) {
              e.preventDefault();
            }
          }}
        />
        <Image
          className="w-full h-auto transition-opacity duration-300 css-ease opacity-0 hover:opacity-100 absolute top-1/2 left-0 -translate-y-1/2"
          loading="eager"
          sizes="400px"
          src={product.images.nodes[1].url}
          onClick={(e) => {
            if (isDragging) {
              e.preventDefault();
            }
          }}
        />
      </div>
      <div className="uppercase text-left whitespace-normal tracking-[.2em] text-[var(--heading-color)] font-montserratMd font-bold text-[10px] mt-5 mb-1 transition-[color] ease-css-ease-in-out duration-200">
        {product?.title}
      </div>
      <div className="text-xs tracking-[.2em] font-montserratMd font-bold transition-[color] ease-css-ease-in-out duration-200 text-[var(--heading-color)] text-[10px]">
        {product.variants.nodes[0]?.compareAtPrice ? (
          <>
            <div className="flex gap-2.5">
              {product.variants.nodes[0] ? (
                <Money
                  className="text-[var(--product-sale-price-color)]"
                  data={product.variants.nodes[0].price}
                />
              ) : null}
              <s>
                <Money data={product.variants.nodes[0].compareAtPrice} />
              </s>
            </div>
          </>
        ) : (
          product.variants.nodes[0]?.price && (
            <Money data={selectedVariant?.price} />
          )
        )}
      </div>
    </Link>
  );
}