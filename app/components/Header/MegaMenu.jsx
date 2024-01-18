import {Link, useMatches} from '@remix-run/react';
import gsap from 'gsap';
import React, {forwardRef, useEffect, useImperativeHandle} from 'react';
import useIsomorphicLayoutEffect from '~/utils';

const MegaMenu = forwardRef((props, ref) => {
  const animateIsGoing = React.useRef({isGoing: false, first: true});
  const refOne = React.useRef();
  const refTwo = React.useRef();
  const tl = React.useRef();
  const tl_ = React.useRef();
  const [root] = useMatches();
  const [ctx] = React.useState(() => gsap.context(() => {}));

  useIsomorphicLayoutEffect(() => {
    ctx.add('megaMenuAni', () => {
      if (
        animateIsGoing.current.isGoing == false ||
        animateIsGoing.current.first == true
      ) {
        animateIsGoing.current = {isGoing: true, first: false};
        tl.current = gsap
          .timeline()
          .set(refOne.current, {autoAlpha: 0})
          .set(refTwo.current, {y: 7, autoAlpha: 0})
          .to(refOne.current, {
            autoAlpha: 1,
            duration: 0.3,
            ease: 'power1.inOut',
          })
          .to(
            refTwo.current,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.2,
              ease: 'power1.inOut',
            },
            '<',
          )
          .then(
            () => (animateIsGoing.current = {isGoing: false, first: false}),
          );
      }
    });

    ctx.add('removeMegamenu', () => {
      tl_.current = gsap.timeline().to(refOne.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power1.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        startAnimate: () => {
          ctx.megaMenuAni();
        },
      };
    },
    [],
  );

  const navElement = props.menu.items.filter(
    (item) => item.title === props.megaMenu.title,
  );

  useEffect(() => {
    if (!props.isHeaderHover) {
      props.setMegaMenu({...props.megaMenu, isOpen: false});
      ctx.removeMegamenu();
    }
  }, [props.isHeaderHover]);

  const stripUrl = (url) => {
    const publicStoreDomain = root?.data?.publicStoreDomain;
    const newUrl =
      url.includes('myshopify.com') || url.includes(publicStoreDomain)
        ? new URL(url).pathname
        : url;

    return newUrl;
  };

  //if (!props.megaMenu.isOpen) return undefined;
  return (
    <div
      ref={refOne}
      className={`w-full py-[20px] absolute top-[100%] invisible bg-white border-y border-[#e0e0e0] ${
        props.megaMenu.isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      onMouseEnter={() => {
        if (!props.megaMenu.isOpen) {
        }
      }}
    >
      <div
        ref={refTwo}
        className={`w-full flex justify-evenly bg-white ${props.megaMenu.className}`}
      >
        {navElement[0]?.items.map((item) => (
          <div className="flex flex-col items-start my-[20px] mx-[40px] !h-fit">
            <Link
              to={stripUrl(item.url)}
              className="mb-[20px] cursor-pointer font-avenir-heavy text-[11px] tracking-[.2em] uppercase"
            >
              {item.title}
            </Link>
            <ul>
              {item.items.map((item) => (
                <Link to={stripUrl(item.url)}>
                  <li className="capitalize hover:underline font-avenir-light text-[13px] text-left mb-[12px] leading-[1.5]">
                    {item.title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
});

export default MegaMenu;
