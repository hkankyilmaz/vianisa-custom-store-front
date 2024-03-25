import React, {useState, useEffect, useCallback} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {Thumb} from './CarouselThumbsButton';
import {Image} from '@shopify/hydrogen';
// import {useWishlist} from '~/store/wishlistContext';
import WishlistButton from '../Wishlist Button/WishlistButton';

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
          style={{top: 20, right: 20}}
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

export default EmblaCarousel;
