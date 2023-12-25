import React, {useState, useEffect, useCallback} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  DotButton,
  PrevButton,
  NextButton,
} from './EmblaCarouselArrowsDotsButtons';
const DotCarousel = (props) => {
  const {slides, options, imageByIndex} = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <>
      <div className="embla ">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number">
                  <span>{index + 1}</span>
                </div>
                <img
                  className="embla__slide__img"
                  src={imageByIndex(index).url}
                  alt="Your alt text"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="embla__buttons"></div>
      </div>

      <div className="embla__dots mt-5 h-7">
        <PrevButton className="w-4 flex justify-center" onClick={scrollPrev} disabled={prevBtnDisabled} />

        <div className='flex flex-wrap justify-center items-center max-[300px]:w-[50vw]'>
        {scrollSnaps.map((_, index) => (
          <DotButton
          key={index}
          onClick={() => scrollTo(index)}
          className={'embla__dot w-3 h-3 max-sm:w-[10px] max-sm:h-[10px]'.concat(
            index === selectedIndex ? ' embla__dot--selected' : '',
            )}
            />
            ))}
        </div>
        
        <NextButton className="w-4 flex justify-center" onClick={scrollNext} disabled={nextBtnDisabled} />
      </div>
    </>
  );
};

export default DotCarousel;
