'use client';
import React from 'react';
import {Image} from '@shopify/hydrogen';

function BannerSlider() {
  const OPTIONS = {containScroll: 'trimSnaps'};
  const SLIDE_COUNT = 1;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <div className="relative">
      <Slider slides={SLIDES} options={OPTIONS} />
      <div className="absolute bottom-[40%] right-[120px] translate-x-[-50%] max-md:flex max-md:flex-col max-md:item-center max-md:justify-center">
        <p className="text-3xl m-2 translate-x-[-10px]">True To You</p>
        <p className="text-sm mb-4">
          Carefully crafted designs that celebrate your story.
        </p>
        <button className="w-[300px] px-3 py-2 bg-white text-black hover:bg-black hover:text-white transition-all ease-in">
          Shop Engagement Rings
        </button>
      </div>
    </div>
  );
}

export default BannerSlider;

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import image1 from '../../assets/banner.jpg';
import image2 from '../../assets/banner2.jpg';

import _image1 from '../../assets/banner.jpg';
import _image2 from '../../assets/banner2.jpg';

import './style.css';

const imagesDesktop = [image1];
const imagesMobile = [_image1];

const imageByIndex = (index) => imagesMobile[index % imagesMobile.length];

function Slider(props) {
  const {slides, options} = props;
  const autoplayOptions = {
    delay: 7000,
    rootNode: (emblaRoot) => emblaRoot.parentElement,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOptions),
  ]);

  return (
    <div className="embla banner_">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <img
                width={1920}
                height={728}
                className="embla__slide__img"
                src={imageByIndex(index)}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
