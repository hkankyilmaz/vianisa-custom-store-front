'use client';

import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {cubicBezier, motion, useAnimate, useMotionValue} from 'framer-motion';
import {useEffect, useRef, useState} from 'react';
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs';

function FeaturedCollection({data,dataRecom,title, showButton = false, className = ''}) {

  let items;

  if (dataRecom) {

     items = dataRecom.products?.nodes.map((product, index) => (
      <Item product={product} key={index} recom= {true} />
    ));

  } else {
     items = data.collection?.products?.nodes.map((product, index) => (
      <Item product={product} key={index} recom={false} />
    ));
  }
  
  const constructUrl = (collection) => {
    return `/collections/${collection.toLowerCase().replace(/ /g, '-')}`;
  };

  return (
    <section
      className={`py-[50px] lg:py-[80px] font-avenir-medium ${className}`}
    >
      <div className="mb-[40px] lg:mb-[20px] w-full">
        <h2 className="text-[20px] md:text-[28px] font-optima-normal uppercase text-center text-[var(--heading-color)] px-6 sm:px-[50px] min-[1140px]:px-[80px]">
          {title ? title : data.collection?.title}
        </h2>
      </div>
      <div className="lg:mx-[90px]">
        <Carousel items={items} itemsPerGroup={4} />
      </div>
      {showButton && (
        <div className="mt-[80px] flex justify-center items-center">
          <Link
            to={constructUrl(data.collection?.title)}
            className="inline-block text-[var(--feat-col-prod-btn-fg)] bg-[var(--feat-col-prod-btn-bg)] border border-solid border-[var(--feat-col-prod-btn-bg)] text-[11px] font-avenir-medium uppercase tracking-[.2em] transition-all ease-css-ease duration-[.35s] hover:text-[var(--feat-col-prod-btn-fg-hover)] hover:bg-[var(--feat-col-prod-btn-bg-hover)] py-[14px] px-[28px] leading-[normal]"
          >
            View all products
          </Link>
        </div>
      )}
    </section>
  );
}

export default FeaturedCollection;

/*********************************************************/

const Carousel = ({items, itemsPerGroup = 1, loop = false}) => {
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
  const windowSizes = {
    initial: 'initial',
    mobile: 'mobile',
    desktopSmall: 'desktopSmall',
    desktopLarge: 'desktopLarge',
  };
  const itemsPerWindowSize = {
    initial: itemsPerGroup,
    mobile: 1,
    desktopSmall: 3,
    desktopLarge: itemsPerGroup,
  };
  const [windowSize, setWindowSize] = useState(windowSizes.initial);
  const prevWindowSize = useRef(windowSizes.initial);
  const [scope, animate] = useAnimate();
  const [width, setWidth] = useState(0);
  const carouselContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasCrossedThreshold, setHasCrossedThreshold] = useState(false);
  const x = useMotionValue(0);
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
    groupItems(items, itemsPerWindowSize.initial),
  );

  const handleNext = () => {
    const nextIndex = loop
      ? (activeIndex + 1) % itemGroups.length
      : Math.min(activeIndex + 1, itemGroups.length - 1);
    const nextGroupLength = itemGroups[nextIndex].length;
    const isFullGroup = nextGroupLength == itemsPerWindowSize[windowSize];
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
    const isFullGroup = prevGroupLength == itemsPerWindowSize[windowSize];
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

    if (
      dragAmount > dragTreshold &&
      !hasCrossedThreshold &&
      windowSize != 'mobile'
    ) {
      setHasCrossedThreshold(true);
      info.offset.x > 0 ? handlePrev() : handleNext();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setWidth(
        scope.current.scrollWidth -
          scope.current.offsetWidth +
          (window.innerWidth / 100) * (window.innerWidth < 640 ? 19 : 26),
      );
    }, 200);

    const handleResize = () => {
      const {scrollWidth, offsetWidth} = scope.current;
      const marginRight =
        (window.innerWidth / 100) * (window.innerWidth < 640 ? 19 : 26);
      const newWidth = scrollWidth - offsetWidth + marginRight;

      setWidth(newWidth);
      setWindowSize((prev) => {
        prevWindowSize.current = prev;
        return window.innerWidth < 1024
          ? windowSizes.mobile
          : window.innerWidth < 1280
          ? windowSizes.desktopSmall
          : windowSizes.desktopLarge;
      });

      if (renderCount.current == 0) {
        renderCount.current++;
        if (window.innerWidth < 1024) {
          setItemGroups(groupItems(items, itemsPerWindowSize.mobile));
        } else if (window.innerWidth < 1280) {
          setItemGroups(groupItems(items, itemsPerWindowSize.desktopSmall));
        }
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
    if (windowSize == 'mobile' && prevWindowSize.current != 'mobile') {
      setActiveIndex(0);
      x.jump(0);
      setItemGroups(groupItems(items, itemsPerWindowSize.mobile));
    }

    if (
      windowSize == 'desktopSmall' &&
      prevWindowSize.current != 'desktopSmall'
    ) {
      setItemGroups(groupItems(items, itemsPerWindowSize.desktopSmall));
    }

    if (
      windowSize == 'desktopLarge' &&
      prevWindowSize.current != 'desktopLarge'
    ) {
      setItemGroups(groupItems(items, itemsPerWindowSize.desktopLarge));
    }
  }, [windowSize]);

  return (
    <>
      <div className="relative">
        <div
          className={`max-lg:hidden lg:absolute lg:top-[calc(50%_-_var(--feat-col-nav-btn-top-offset))] lg:-left-[50px] lg:z-10 ${
            activeIndex == 0 ? 'invisible' : ''
          }`}
        >
          <button
            onClick={handlePrev}
            className="bg-[var(--feat-col-nav-btn-bg)] rounded-full w-[45px] h-[45px] shadow-[0_2px_10px_var(--feat-col-nav-btn-box-shadow)] prev-button flex justify-center items-center"
          >
            <BsChevronLeft className="h-[18px] w-auto text-[--feat-col-nav-btn-fg]" />
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
              left: windowSize == 'mobile' ? -width : 0,
            }}
            onDragEnd={windowSize == 'mobile' ? null : handleDragEnd}
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
                itemsPerGroup={itemsPerWindowSize[windowSize]}
              />
            ))}
          </motion.div>
        </motion.div>
        <div
          className={`max-lg:hidden lg:absolute lg:top-[calc(50%_-_var(--feat-col-nav-btn-top-offset))] lg:-right-[50px] lg:z-10 ${
            activeIndex == itemGroups.length - 1 ? 'invisible' : ''
          }`}
        >
          <button
            onClick={handleNext}
            className="bg-[var(--feat-col-nav-btn-bg)] rounded-full w-[45px] h-[45px] shadow-[0_2px_10px_var(--feat-col-nav-btn-box-shadow)] next-button flex justify-center items-center"
          >
            <BsChevronRight className="h-[18px] w-auto text-[--feat-col-nav-btn-fg]" />
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
      className="grid min-w-[62%] sm:min-w-[48%] lg:min-w-full flex-1 max-lg:first-of-type:ml-[26%] max-sm:first-of-type:ml-[19%]"
      style={{gridTemplateColumns: `repeat(${itemsPerGroup}, minmax(0, 1fr))`}}
    >
      {items.map((item, index) => (
        <CarouselItem key={index} item={item} />
      ))}
    </motion.div>
  );
};

/*********************************************************/

function Item({product, className = '',recom}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Link
      prefetch="intent"
      to={`/products/${product.handle}`}
      className={`cursor-pointer w-full px-[12px] sm:px-[15px] lg:px-[30px] ${className}`}
      onDragStart={(e) => {
        setIsDragging(true);
        e.preventDefault();
      }}
      onDragEnd={() => {
        setIsDragging(false);
      }}
    >
      <div className="w-full relative overflow-hidden aspect-square h-auto flex items-center">
        <div className="uppercase absolute top-1.5 left-2.5 my-1 py-0.5 px-1.5 tracking-[.2em] text-[var(--text-color-light)] font-avenir-medium lg:font-avenir-medium transition-[color] ease-css-ease-in-out duration-200 text-[8px] sm:text-[10px]">
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
      <div className="uppercase text-left whitespace-normal tracking-[.2em] text-[var(--heading-color)] font-avenir-medium text-[10px] mt-5 mb-1 transition-[color] ease-css-ease-in-out duration-200 sm:text-[11px]">
        {product?.title}
      </div>
      <div className="tracking-[.2em] font-avenir-medium transition-[color] ease-css-ease-in-out duration-200 text-[var(--heading-color)] text-[10px] sm:text-[11px]">
        {(() => {
            if (recom) return   <Money data={product.priceRange.minVariantPrice} />;
            else {
              return (
                product.variants.nodes[0]?.compareAtPrice ? (
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
                )

              )
            }
          })()}
      </div>
    </Link>
  );
}
