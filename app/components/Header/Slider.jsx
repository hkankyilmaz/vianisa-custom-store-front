'use client';

import {Link} from '@remix-run/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import {motion, useAnimation, useInView} from 'framer-motion';
import React, {useCallback, useEffect, useRef, useState} from 'react';

const SLIDE_DELAY = 4000;

const BannerSlider = () => {
  const OPTIONS = {loop: true};
  const SLIDE_COUNT = imagesDesktop.length;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return <EmblaCarousel slides={SLIDES} options={OPTIONS} />;
};

export default BannerSlider;

/*********************************************************/

const EmblaCarousel = ({slides, options}) => {
  const autoplayOptions = {
    delay: SLIDE_DELAY,
    stopOnInteraction: false,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOptions),
  ]);
  const onButtonClick = useCallback((emblaApi) => {
    const {autoplay} = emblaApi.plugins();
    if (!autoplay) return;
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop();
  }, []);
  const {selectedIndex, scrollSnaps, onDotButtonClick} = useDotButton(
    emblaApi,
    onButtonClick,
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <div className="overflow-hidden relative" ref={emblaRef}>
      <div className="flex touch-pan-y max-sm:min-h-[50vh]">
        {slides.map((index) => (
          <Banner
            imageSrc={imageByIndex(index, isMobile)}
            positionAlign="left"
            key={index}
            once={slides.length === 1}
          >
            <Banner.Header>
              {' '}
              {/* leading-[30px] tracking-wide */}
              <h2 className="font-optima-medium text-[33px] sm:text-[40px] lg:text-[48px] text-center lg:text-left">
                Moments to Cherish
              </h2>
            </Banner.Header>
            <Banner.Body>
              {' '}
              {/* sm:text-[21px] leading-[22px] sm:leading-[30px] mt-[10px] */}
              <p className="font-avenir-light text-[16px] text-center lg:text-left lg:mb-[25px]">
                Celebrating life's simple joys with timeless treasures, making
                every <br /> interaction a moment to remember.
              </p>
            </Banner.Body>
            <Banner.Footer>
              <div className="flex gap-6 max-lg:hidden">
                <Link
                  to="/collections/engagement-rings"
                  className="btn-primary btn-transparent font-avenir-light cursor-pointer !text-[14px] !capitalize !tracking-[normal] !py-1.5 !px-6"
                >
                  Shop Engagement Rings
                </Link>
                <Link
                  to="/collections/wedding-bands"
                  className="btn-primary btn-transparent font-avenir-light cursor-pointer !text-[14px] !capitalize !tracking-[normal] !py-1.5 !px-6"
                >
                  <h2>Shop Wedding Bands</h2>
                </Link>
              </div>
            </Banner.Footer>
          </Banner>
        ))}
      </div>

      <div
        className={`absolute z-10 bottom-7 left-7 flex justify-center items-center gap-3 max-lg:hidden ${
          imagesDesktop.length > 1 ? 'visible' : 'hidden'
        }`}
      >
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`w-3 h-3 rounded-full border-2 border-[#2f2f2f] ${
              index === selectedIndex ? ' bg-[#2f2f2f]' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/*********************************************************/

const useDotButton = (emblaApi, onButtonClick) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick],
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

const DotButton = ({children, ...restProps}) => {
  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

/*********************************************************/

import bannerDesktop from '~/assets/images/banner-desktop.png';
import bannerMobile from '~/assets/images/banner-mobile.png';

const imagesDesktop = [bannerDesktop];
const imagesMobile = [bannerMobile];

const imageByIndex = (index, isMobile) =>
  isMobile ? imagesMobile[index] : imagesDesktop[index];

/*********************************************************/

const getChildrenOnDisplayName = (children, displayName) =>
  React.Children.map(children, (child) =>
    child.type.displayName === displayName ? child : null,
  );

const Banner = ({
  children,
  imageSrc,
  horizontalAlign = 'left',
  verticalAlign = 'center',
  textAlign = 'left',
  once = false,
}) => {
  const header = getChildrenOnDisplayName(children, 'Header');
  const body = getChildrenOnDisplayName(children, 'Body');
  const footer = getChildrenOnDisplayName(children, 'Footer');
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, {amount: 0.5, once: once});

  const horizontalAlignment = {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0',
  }[horizontalAlign];

  const textAlignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[textAlign];

  const verticalAlignment = {
    top: 'top-0',
    center: 'top-1/2 -translate-y-1/2',
    bottom: 'bottom-[30px]',
  }[verticalAlign];

  const variants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
      },
    },
  };

  useEffect(() => {
    let timeout;
    const show = () => {
      controls.start('visible');

      if (!once) {
        timeout = setTimeout(async () => {
          controls.start('hidden');
        }, SLIDE_DELAY - 500);
      }
    };

    if (isInView) {
      show();
    } else {
      controls.start('hidden');
    }

    if (!once) {
      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  return (
    <div className="flex-[0_0_100%] relative" ref={ref}>
      <img
        className="block w-full h-full object-cover"
        alt="moissanite wedding ring"
        src={imageSrc}
      />
      <div
        className={`absolute z-10 w-full lg:w-1/2 inline-flex lg:mx-8 ${horizontalAlignment} ${verticalAlignment} ${textAlignment}`}
      >
        <motion.div
          className="w-full h-full flex flex-col max-lg:hidden"
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          {header}
          {body}
          {footer}
        </motion.div>
      </div>
    </div>
  );
};

const Header = ({children}) => {
  return <div>{children}</div>;
};
Header.displayName = 'Header';
Banner.Header = Header;

const Body = ({children}) => {
  return <div>{children}</div>;
};
Body.displayName = 'Body';
Banner.Body = Body;

const Footer = ({children}) => {
  return <div>{children}</div>;
};
Footer.displayName = 'Footer';
Banner.Footer = Footer;
