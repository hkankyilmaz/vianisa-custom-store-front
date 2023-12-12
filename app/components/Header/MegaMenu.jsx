import React, {forwardRef, useImperativeHandle} from 'react';
import gsap from 'gsap';
import useIsomorphicLayoutEffect from '~/utils';
import {Link} from '@remix-run/react';

const MegaMenu = forwardRef((props, ref) => {
  const [out, setOut] = React.useState(false);
  const animateIsGoing = React.useRef({isGoing: false, first: true});
  const refOne = React.useRef();
  const refTwo = React.useRef();
  const tl = React.useRef();
  const tl_ = React.useRef();

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
          .to(refOne.current, {autoAlpha: 1, duration: 0.2})
          .to(refTwo.current, {display: 'grid'}, '<')
          .set(refTwo.current, {autoAlpha: 0}, '<')
          .from(refTwo.current, {y: 7, autoAlpha: 0, duration: 0.4}, '<')
          .then(
            () => (animateIsGoing.current = {isGoing: false, first: false}),
          );
      }
    });

    ctx.add('removeMegamenu', () => {
      tl_.current = gsap
        .timeline()
        .set(refOne.current, {autoAlpha: 1})
        .to(refOne.current, {autoAlpha: 0, duration: 0.3});
    });

    return () => ctx.revert();
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        startAnimate: () => {
          ctx.megaMenuAni();
          setOut(false);
        },
      };
    },
    [],
  );

  const navElement = props.menu.items.filter(
    (item) => item.title === props.megaMenu.title,
  );
  if (typeof window !== 'undefined') {
    document.documentElement.style.setProperty(
      '--mega-menu-column',
      `${navElement[0]?.items.length}`,
    );
  }
  console.log(navElement);
  //if (!props.megaMenu.isOpen) return undefined;
  return (
    <div
      ref={refOne}
      onMouseLeave={() => {
        if (out == false) {
          setOut(true);
          props.setMegaMenu({...props.megaMenu, isOpen: false});
          ctx.removeMegamenu();
        }
      }}
      className={`w-full pt-5 pb-14 absolute top-[100%] flex invisible justify-center bg-white mega-menu`}
    >
      <div
        ref={refTwo}
        className="max-w-7xl grid grid-column-number gap-x-48 bg-white"
      >
        {navElement[0]?.items.map((item) => (
          <div className="flex flex-col items-start ">
            <p className="mb-3 font-semibold">{item.title}</p>
            <ul>
              {item.items.map((item) => (
                <Link
                  to={`${item.url.replace(
                    'https://vianisa.myshopify.com',
                    'http://localhost:3000',
                  )}`}
                >
                  <li className="capitalize text-justify mb-3 text-[13px]">
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
