import React, {useRef, useEffect, useState} from 'react';
import {cubicBezier, motion} from 'framer-motion';
import {Link} from '@remix-run/react';

const Drawer = ({
  placement = 'left',
  isOpen,
  onClose,
  size = 'sm',
  className = '',
  menu,
}) => {
  const placements = {
    top: 'top-0 left-0 w-screen',
    right: 'top-0 right-0 h-screen',
    bottom: 'bottom-0 left-0 w-screen',
    left: 'top-0 left-0 h-screen',
  };
  const variants = {
    open: {
      x: 0,
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.645, 0.045, 0.355, 1),
      },
    },
    closed: {
      x: '-100%',
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.645, 0.045, 0.355, 1),
      },
    },
  };
  const sizes = {
    sm: 'w-[calc(100vw_-_65px)] sm:w-[340px]',
    md: 'w-80',
    lg: 'w-96',
    full: 'w-screen',
  };
  const drawerRef = useRef(null);

  useEffect(() => {
    drawerRef.current.setAttribute('data-open', isOpen);
    const overlay = document.querySelector('#mobile-menu-aside');
    overlay.style.visibility = isOpen ? 'visible' : 'hidden';
    overlay.style.opacity = isOpen ? '.5' : '0';
    overlay.style.background = '#363636';
    overlay.style.zIndex = '50';
    document.documentElement.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <motion.div
      className={`absolute bg-[var(--drawer-bg-color)] z-50 flex flex-col drawer ${placements[placement]} ${sizes[size]} ${className}`}
      aria-hidden={!isOpen}
      variants={variants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      ref={drawerRef}
    >
      <div className="flex justify-start items-center max-h-[80px] min-h-[60px] w-full">
        <CloseButton onClick={onClose} />
      </div>
      <div className="flex-1 flex flex-col pl-[18px] sm:pl-[30px] pr-[24px] sm:pr-[30px]">
        {menu.items.map((item, index) => (
          <Collapsible key={index} item={item} />
        ))}
      </div>
      <div className="flex justify-center items-center min-h-[48px] shadow-[0_1px_var(--drawer-border-color)_inset]">
        <InstagramButton />
      </div>
    </motion.div>
  );
};

const CloseButton = ({onClick}) => {
  return (
    <button
      className="ml-[18px] sm:ml-[30px] cursor-pointer relative before:cursor-pointer before:-inset-y-[8px] before:-inset-x-[12px] before:absolute"
      onClick={onClick}
    >
      <svg
        className="w-[15px] h-[15px] stroke-[1.25px] sm:stroke-[1.5px]"
        role="presentation"
        viewBox="0 0 16 14"
      >
        <path
          d="M15 0L1 14m14 0L1 0"
          stroke="currentColor"
          fill="none"
          fillRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

const InstagramButton = () => {
  return (
    <Link
      to={'https://www.instagram.com/vianisajewelry/'}
      target="_blank"
      rel="noopener"
      aria-label="Instagram"
    >
      <span
        className="bg-transparent relative cursor-pointer before:cursor-pointer before:-inset-y-[8px] before:-inset-x-[12px] before:absolute text-[var(--drawer-text-color-light)] hover:text-[var(--drawer-text-color)] transition-[color] duration-200 text-[13px]"
        style={{transitionTimingFunction: 'ease-in-out'}}
      >
        <svg
          className="h-[1em] w-[1em] fill-current stroke-1 pointer-events-none"
          role="presentation"
          viewBox="0 0 32 32"
        >
          <path d="M15.994 2.886c4.273 0 4.775.019 6.464.095 1.562.07 2.406.33 2.971.552.749.292 1.283.635 1.841 1.194s.908 1.092 1.194 1.841c.216.565.483 1.41.552 2.971.076 1.689.095 2.19.095 6.464s-.019 4.775-.095 6.464c-.07 1.562-.33 2.406-.552 2.971-.292.749-.635 1.283-1.194 1.841s-1.092.908-1.841 1.194c-.565.216-1.41.483-2.971.552-1.689.076-2.19.095-6.464.095s-4.775-.019-6.464-.095c-1.562-.07-2.406-.33-2.971-.552-.749-.292-1.283-.635-1.841-1.194s-.908-1.092-1.194-1.841c-.216-.565-.483-1.41-.552-2.971-.076-1.689-.095-2.19-.095-6.464s.019-4.775.095-6.464c.07-1.562.33-2.406.552-2.971.292-.749.635-1.283 1.194-1.841s1.092-.908 1.841-1.194c.565-.216 1.41-.483 2.971-.552 1.689-.083 2.19-.095 6.464-.095zm0-2.883c-4.343 0-4.889.019-6.597.095-1.702.076-2.864.349-3.879.743-1.054.406-1.943.959-2.832 1.848S1.251 4.473.838 5.521C.444 6.537.171 7.699.095 9.407.019 11.109 0 11.655 0 15.997s.019 4.889.095 6.597c.076 1.702.349 2.864.743 3.886.406 1.054.959 1.943 1.848 2.832s1.784 1.435 2.832 1.848c1.016.394 2.178.667 3.886.743s2.248.095 6.597.095 4.889-.019 6.597-.095c1.702-.076 2.864-.349 3.886-.743 1.054-.406 1.943-.959 2.832-1.848s1.435-1.784 1.848-2.832c.394-1.016.667-2.178.743-3.886s.095-2.248.095-6.597-.019-4.889-.095-6.597c-.076-1.702-.349-2.864-.743-3.886-.406-1.054-.959-1.943-1.848-2.832S27.532 1.247 26.484.834C25.468.44 24.306.167 22.598.091c-1.714-.07-2.26-.089-6.603-.089zm0 7.778c-4.533 0-8.216 3.676-8.216 8.216s3.683 8.216 8.216 8.216 8.216-3.683 8.216-8.216-3.683-8.216-8.216-8.216zm0 13.549c-2.946 0-5.333-2.387-5.333-5.333s2.387-5.333 5.333-5.333 5.333 2.387 5.333 5.333-2.387 5.333-5.333 5.333zM26.451 7.457c0 1.059-.858 1.917-1.917 1.917s-1.917-.858-1.917-1.917c0-1.059.858-1.917 1.917-1.917s1.917.858 1.917 1.917z"></path>
        </svg>
      </span>
    </Link>
  );
};

const Collapsible = ({item, className = '', classNames = {}}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const variants = {
    open: {
      height: '100%',
      overflow: 'visible',
      //visibility: 'visible',
      transition: {
        duration: 0.35,
        ease: 'easeInOut', //cubicBezier(0.645, 0.045, 0.355, 1),
      },
    },
    closed: {
      height: 0,
      overflow: 'hidden',
      //visibility: 'hidden',
      transition: {
        duration: 0.35,
        ease: 'easeInOut', //cubicBezier(0.645, 0.045, 0.355, 1),
      },
    },
  };

  return (
    <div
      className={`border-b border-solid border-[var(--drawer-border-color)] ${
        isExpanded ? 'overflow-hidden' : 'overflow-visible'
      } ${className}`}
    >
      <button
        className={`text-[var(--drawer-text-color)] text-xs leading-[18px] uppercase tracking-[.2em] w-full relative text-left cursor-pointer py-[20px] font-montserratMd font-bold collapsible ${
          classNames['button'] ?? ''
        }`}
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {item.title}
        <span className="absolute w-[11px] h-[11px] right-0 top-1/2 -translate-y-1/2 plus"></span>
      </button>
      <motion.div
        // className={`overflow-hidden max-h-0 h-full ${
        //   isExpanded ? '!overflow-visible !max-h-[1000px]' : ''
        // }`}
        // animate={isExpanded ? 'open' : 'closed'}
        // style={{transition: 'max-height .35s ease-in-out'}}
        initial="closed"
        variants={variants}
        animate={isExpanded ? 'open' : 'closed'}
      >
        <div /* className="pb-[18px]" */>
          {item.items[0].items &&
            item.items.map((subItem, index) => (
              <Collapsible
                key={index}
                item={subItem}
                className="ml-[16px] border-none"
                classNames={{
                  button:
                    '!py-[13px] !text-[11px] !text-[var(--drawer-text-color-light)] hover:!text-[var(--drawer-text-color)]',
                }}
              />
            ))}
          {!item.items[0].items && (
            <div className="flex flex-col mt-4 mb-1 ml-2 pl-[25px] pr-[20px] border-solid border-l border-[var(--drawer-border-color)] gap-[18px]">
              {item.items.map((subItem, index) => (
                <div
                  className="w-full text-left leading-[1.5]"
                  style={{transition: 'all .2s ease-in-out'}}
                  key={subItem.title + index}
                >
                  <Link
                    to={subItem.url}
                    className="text-[var(--drawer-text-color-light)] hover:text-[var(--drawer-text-color)] hover:underline w-full uppercase font-questrial text-[13px] font-normal block"
                  >
                    {subItem.title}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Drawer;
