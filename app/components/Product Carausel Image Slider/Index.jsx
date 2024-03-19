import React, {useState, useEffect, useCallback} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {Thumb} from './CarouselThumbsButton';
import {Image} from '@shopify/hydrogen';
import {useWishlist} from '~/store/wishlistContext';

const EmblaCarousel = (props) => {
  const {slides, options, imageByIndex, startIndex, product} = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    startIndex: startIndex,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla slider-product max-lg:hidden ml-[50px]">
      <div
        className="embla__viewport"
        ref={emblaMainRef}
        style={{position: 'relative'}}
      >
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide h-full" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <Image
                className="embla__slide__img"
                src={imageByIndex(index).url}
                alt="Your alt text"
                loading="eager"
              />
            </div>
          ))}
        </div>
        <WishlistButton
          productId={product.id}
          isInWishlist={product.isInWishlist}
        />
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={imageByIndex(index).url}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function WishlistButton({productId}) {
  // function addToWishlist(productId) {
  //   let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  //   if (!wishlist.includes(productId)) {
  //     wishlist.push(productId);
  //     localStorage.setItem('wishlist', JSON.stringify(wishlist));
  //     document.cookie = `wishlist=${JSON.stringify(wishlist)}; path=/;`;
  //     setIsInWishlist(true);
  //   }
  // }

  // function removeFromWishlist(productId) {
  //   let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  //   wishlist = wishlist.filter((id) => id !== productId);
  //   localStorage.setItem('wishlist', JSON.stringify(wishlist));
  //   document.cookie = `wishlist=${JSON.stringify(wishlist)}; path=/;`;
  //   setIsInWishlist(false);
  // }

  // function getWishlist() {
  //   return JSON.parse(localStorage.getItem('wishlist')) || [];
  // }

  // function handleToggle() {
  //   if (isInWishlist) {
  //     removeFromWishlist(productId);
  //   } else {
  //     addToWishlist(productId);
  //   }
  // }
  // const [isInWishlist, setIsInWishlist] = useState();

  // useEffect(() => {
  //   const wishlist = getWishlist();
  //   setIsInWishlist(wishlist.includes(productId));
  // }, [productId]);

  const {wishlist, addToWishlist, removeFromWishlist} = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlist.includes(productId));
  }, [wishlist, productId]);

  const handleToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
    setIsInWishlist(!isInWishlist);
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        padding: 15,
        borderRadius: 999,
        border: '1px solid #E5E7EB',
        background: 'white',
        marginLeft: 10,
        transition: 'all ease 150ms',
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
        transformOrigin: 'center',
      }}
      className="hover:bg-[#fff0e7] hover:text-[#2f2f2f] transform hover:scale-110"
    >
      <svg
        fill={isInWishlist ? '#808080' : 'none'}
        style={{
          transition: 'all 0.3s ease',
        }}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        stroke={isInWishlist ? '#808080' : '#808080'}
        stroke-width="2"
        stroke-linecap="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
}

export default EmblaCarousel;
