import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';
import './multiRangeSlider.css';

const MultiRangeSlider = ({
  min,
  max,
  getSliderPriceRange,
  setSliderPriceRange,
  setInputPriceRange,
  onChangeCommitted,
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(getSliderPriceRange[0]);
    const maxPercent = getPercent(getSliderPriceRange[1]);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [getSliderPriceRange[0], getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(getSliderPriceRange[0]);
    const maxPercent = getPercent(getSliderPriceRange[1]);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [getSliderPriceRange[1], getPercent]);

  return (
    <div className="container my-5">
      <input
        type="range"
        min={min}
        max={max}
        value={getSliderPriceRange[0]}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          const pre_price = getSliderPriceRange[1];
          const newarray = [value, pre_price];
          setSliderPriceRange(newarray);
          setInputPriceRange(newarray);
          setMinVal(value);
          minValRef.current = value;
        }}
        onMouseUp={onChangeCommitted}
        className={'thumb thumb--left'}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={getSliderPriceRange[1]}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
          const pre_price = getSliderPriceRange[0];
          const newarray = [pre_price, value];
          setSliderPriceRange(newarray);
          setInputPriceRange(newarray);
        }}
        onMouseUp={onChangeCommitted}
        className={'thumb thumb--right'}
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default MultiRangeSlider;
