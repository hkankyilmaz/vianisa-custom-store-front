import React from 'react';
import {Image} from '@shopify/hydrogen';

export const Thumb = (props) => {
  const {selected, imgSrc, index, onClick} = props;

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : '',
      )}
    >
      <button
        onClick={onClick}
        className="embla-thumbs__slide__button"
        type="button"
      >
        <div className="embla-thumbs__slide__number">
          <span>{index + 1}</span>
        </div>
        <Image
          className="embla-thumbs__slide__img"
          src={imgSrc}
          alt="Your alt text"
          loading="eager"
        />
      </button>
    </div>
  );
};
