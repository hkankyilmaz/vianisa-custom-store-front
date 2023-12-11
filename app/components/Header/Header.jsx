import React, {useEffect} from 'react';
import {Await, NavLink, useMatches} from '@remix-run/react';
import {Suspense, useState} from 'react';

import {GoPerson} from 'react-icons/go';
import {AiOutlineSearch} from 'react-icons/ai';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import MegaMenu from './MegaMenu';

export function Header({header, isLoggedIn, cart}) {
  const ref = React.useRef();
  const [megaMenu, setMegaMenu] = useState({isOpen: false, title: 'none'});
  const [isMobile, setIsMobile] = useState(false);
  const {shop, menu} = header;
  const matches = useMatches()[1].pathname;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    setMegaMenu({isOpen: false, title: 'none'});

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="bg-white text-[var(--heading-color)] shadow-[0_-1px_var(--header-border-color)_inset]">
      <div className="relative w-full flex justify-between items-center py-[10px] px-[30px]">
        <MenuToggle />
        <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
          <span className="text-xl not-italic tracking-[.2em] uppercase text-[var(--heading-color)] font-bold font-playfair">
            Vianisa
          </span>
        </NavLink>
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
      {/* <div
        style={{
          borderBottom: matches == '/' ? 'none' : '',
          paddingTop: matches == '/' ? '10px' : '',
        }}
        className="relative  uppercase border-solid border-gray-300 border-y-[1px] w-full flex justify-center py-1"
      >
        <HeaderMenu
          startAnimate={ref?.current?.startAnimate}
          setMegaMenu={setMegaMenu}
          menu={menu}
          viewport="desktop"
        />
        <MegaMenu
          ref={ref}
          setMegaMenu={setMegaMenu}
          megaMenu={megaMenu}
          menu={menu}
        />
      </div> */}
    </header>
  );
}

export function MenuToggle() {
  return (
    <button className="flex-[1_0_0]">
      <svg
        className="w-[24px] h-[17px] max-sm:hidden"
        role="presentation"
        viewBox="0 0 24 16"
      >
        <path
          d="M0 15.985v-2h24v2H0zm0-9h24v2H0v-2zm0-7h24v2H0v-2z"
          fill="currentColor"
        ></path>
      </svg>
      <svg
        className="w-[20px] h-[15px] sm:hidden"
        role="presentation"
        viewBox="0 0 20 14"
      >
        <path
          d="M0 14v-1h20v1H0zm0-7.5h20v1H0v-1zM0 0h20v1H0V0z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
  );
}

export function HeaderMenu({menu, viewport, setMegaMenu, startAnimate}) {
  const [root] = useMatches();
  const publicStoreDomain = root?.data?.publicStoreDomain;
  const className = `header-menu-${viewport}`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav
      style={{fontFamily: 'montserratmedium'}}
      className={className}
      role="navigation"
    >
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain)
            ? item.url
            : item.url;
        return (
          <NavLink
            onMouseEnter={() => {
              setMegaMenu({isOpen: true, title: item.title});
              startAnimate();
            }}
            className="header-menu-item !text-[#2f2f2f] tracking-wide text-sm"
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="absolute right-12 header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <GoPerson style={{color: 'gray'}} size={'1.75em'} />
      </NavLink>
      <SearchToggle />
      <WishlistToggle />
      <CartToggle />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle left-1" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return (
    <a href="#search-aside">
      <svg
        role="presentation"
        className="w-[18px] h-[17px] sm:hidden"
        viewBox="0 0 18 17"
      >
        <g
          transform="translate(1 1)"
          stroke="currentColor"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="square"
        >
          <path d="M16 16l-5.0752-5.0752"></path>
          <circle cx="6.4" cy="6.4" r="6.4"></circle>
        </g>
      </svg>
      <svg
        className="w-[21px] h-[21px] max-sm:hidden"
        role="presentation"
        viewBox="0 0 21 21"
      >
        <g
          transform="translate(1 1)"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="square"
        >
          <path d="M18 18l-5.7096-5.7096"></path>
          <circle cx="7.2" cy="7.2" r="7.2"></circle>
        </g>
      </svg>
    </a>
  );
}

function WishlistToggle() {
  return (
    <a href="#wishlist-aside">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[23px] h-[17px] sm:hidden"
        viewBox="0 0 48.96 43.71"
      >
        <g data-name="Layer 2">
          <path
            d="M24.44 13S23 7.33 19.33 4.15C15 0 8.66 2.87 6.71 4.47 3 7.52.55 14.33 3 20c3.7 8.59 21.46 21.74 21.46 21.74S42.2 28.56 45.91 20c2.43-5.64.36-12.25-3.37-15.3-2-1.6-8.69-4.68-13-.52-3.7 3.15-5.1 8.82-5.1 8.82Z"
            data-name="Layer 1"
            style={{
              fill: 'none',
              stroke: '#999',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '2.5px',
            }}
          />
        </g>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[22px] h-[21px] max-sm:hidden"
        viewBox="0 0 48.96 43.71"
      >
        <g data-name="Layer 2">
          <path
            d="M24.44 13S23 7.33 19.33 4.15C15 0 8.66 2.87 6.71 4.47 3 7.52.55 14.33 3 20c3.7 8.59 21.46 21.74 21.46 21.74S42.2 28.56 45.91 20c2.43-5.64.36-12.25-3.37-15.3-2-1.6-8.69-4.68-13-.52-3.7 3.15-5.1 8.82-5.1 8.82Z"
            data-name="Layer 1"
            style={{
              fill: 'none',
              stroke: '#999',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: 4,
            }}
          />
        </g>
      </svg>
    </a>
  );
}

function CartToggle() {
  return (
    <a className="relative" href="#cart-aside">
      <svg className="w-[17px] h-[20px] sm:hidden" viewBox="0 0 17 20">
        <path
          fill="currentColor"
          d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z"
        />
      </svg>
      <svg
        className="w-[29px] h-[23px] max-sm:hidden"
        role="presentation"
        viewBox="0 0 19 23"
      >
        <path
          d="M0 22.985V5.995L2 6v.03l17-.014v16.968H0zm17-15H2v13h15v-13zm-5-2.882c0-2.04-.493-3.203-2.5-3.203-2 0-2.5 1.164-2.5 3.203v.912H5V4.647C5 1.19 7.274 0 9.5 0 11.517 0 14 1.354 14 4.647v1.368h-2v-.912z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : '',
    color: isPending ? 'grey' : 'black',
  };
}
