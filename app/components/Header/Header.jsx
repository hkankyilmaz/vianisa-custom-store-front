import React from 'react';
import {Await, NavLink, useMatches} from '@remix-run/react';
import {Suspense, useState} from 'react';

import {GoPerson} from 'react-icons/go';
import {AiOutlineSearch} from 'react-icons/ai';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import MegaMenu from './MegaMenu';

export function Header({header, isLoggedIn, cart}) {
  const ref = React.useRef();
  const [megaMenu, setMegaMenu] = useState({isOpen: false, title: 'none'});
  const {shop, menu} = header;

  const matches = useMatches()[1].pathname;

  React.useEffect(() => {
    setMegaMenu({isOpen: false, title: 'none'});
  }, []);
  return (
    <header className="header relative flex flex-col justify-center items-center">
      <div className="relative w-full flex justify-center items-center my-[10px]">
        <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
          <span className="text-[1.5em]">VIANISA</span>
        </NavLink>
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
      <div
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
      </div>
    </header>
  );
}

export function HeaderMenu({menu, viewport, setMegaMenu, startAnimate}) {
  const [root] = useMatches();
  //console.log(root);
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
    <nav className="absolute right-12 header-ctas sm: flex" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <GoPerson style={{color: 'gray'}} size={'1.75em'} />
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
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
      <AiOutlineSearch style={{color: 'gray'}} size={'1.75em'} />
    </a>
  );
}

function CartBadge({count}) {
  return (
    <a className="relative" href="#cart-aside">
      <AiOutlineShoppingCart style={{color: 'gray'}} size={'1.75em'} />
      <span className="absolute bottom-[60%] right-[-7px] text-[.8em]">
        {count}
      </span>
    </a>
  );
}

function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
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
