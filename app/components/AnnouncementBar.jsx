import React from 'react';
import {useRef, useLayoutEffect, useEffect} from 'react';
import {gsap} from 'gsap';
import {useIsomorphicLayoutEffect} from '../utils';

function AnnouncementBar() {
  const ref = useRef();

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({repeat: -1});
      tl.set('.ann-item-one', {xPercent: -100});
      tl.set('.ann-item-two', {xPercent: -100});
      tl.set('.ann-item-three', {xPercent: -100});
      tl.to('.ann-item-one', {xPercent: 0, duration: 0.3});
      tl.to('.ann-item-one', {xPercent: 100, delay: 5, duration: 0.3});
      tl.to('.ann-item-two', {xPercent: 0, duration: 0.3});
      tl.to('.ann-item-two', {xPercent: 100, delay: 5, duration: 0.3});
      tl.to('.ann-item-three', {xPercent: 0, duration: 0.3});
      tl.to('.ann-item-three', {xPercent: 100, delay: 5, duration: 0.3});
    }, ref);

    return () => ctx.revert();
  }, []);
  return (
    <div
      ref={ref}
      className="flex justify-center items-center h-[40px] sm:h-[36px] w-[100vw] bg-[var(--heading-color)] relative overflow-hidden"
    >
      <span className="announce-item ann-item-one">
        15% Sale Sitewide - Use the Code "15OFF" at the Checkout
      </span>
      <span className="announce-item ann-item-two">
        Extended Sale on All Products !
      </span>
      <span className="announce-item ann-item-three">
        Spend $2000 Get 20% off - Applied at Checkout
      </span>
    </div>
  );
}

export default AnnouncementBar;
