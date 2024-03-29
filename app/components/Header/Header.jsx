import {NavLink, useMatches, useNavigate} from '@remix-run/react';
import {AnimatePresence, motion} from 'framer-motion';
import React, {useEffect, useRef, useState} from 'react';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';
import Drawer from './Drawer';
import MegaMenu from './MegaMenu';
import {useWishlist} from '~/store/wishlistContext';
export function Header({header, isLoggedIn}) {
  const ref = React.useRef();
  const [megaMenu, setMegaMenu] = useState({isOpen: false, title: 'none'});
  const {menu} = header;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    setMegaMenu({isOpen: false, title: 'none'});
  }, []);

  return (
    <>
      <header
        className="bg-white text-[var(--heading-color)] relative z-[52]"
        onMouseMove={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          menu={menu}
        />
        <div
          className="relative w-full flex justify-between items-center py-[15px] sm:py-[18px] px-[18px] sm:px-[30px]  shadow-[0_-1px_var(--header-border-color)_inset] z-10"
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <MenuToggle toggle={() => setIsDrawerOpen((prev) => !prev)} />
          <NavLink prefetch="intent" to="/" style={activeLinkStyleHome} end>
            <span className="text-2xl not-italic tracking-[.2em] uppercase text-[var(--heading-color)] font-playfair_org">
              Vianisa
            </span>
          </NavLink>
          <HeaderCtas isLoggedIn={isLoggedIn} />
        </div>
        <div className="uppercase w-full flex justify-center pt-2 pb-[7px] shadow-[rgb(34,34,34)_0px_0px_2px_0px] text-center font-avenir-medium mb-[2px] max-xl:hidden z-20 relative">
          <HeaderMenu
            startAnimate={ref?.current?.startAnimate}
            setMegaMenu={setMegaMenu}
            menu={menu}
            viewport="desktop"
            isHeaderHover={isHover}
          />
          <MegaMenu
            ref={ref}
            setMegaMenu={setMegaMenu}
            megaMenu={megaMenu}
            menu={menu}
            isHeaderHover={isHover}
          />
        </div>
      </header>
      <SearchAside />
    </>
  );
}
function SearchAside() {
  const navigate = useNavigate();

  return (
    <div
      id="search-asides"
      className="search-aside z-50 block w-full py-7 px-[50px] xl:mt-[-2px]"
      heading="SEARCH"
    >
      <div className="predictive-searchs  bg-white w-full ">
        <PredictiveSearchForm className="w-full">
          {({fetchResults, inputRef}) => (
            <div className="flex justify-around ">
              <div className="w-full flex justify-center items-center">
                <svg
                  className="Icon Icon--search-desktop w-[22px] h-[22px]"
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
                <input
                  name="q"
                  onChange={fetchResults}
                  onFocus={fetchResults}
                  placeholder="SEARCH..."
                  ref={inputRef}
                  autoComplete="off"
                  id="search"
                  type="search"
                  className="w-full border-0 p-0 pl-5 bg-transparent focus:ring-0 focus:!border-[#e0e0e0] focus:!shadow-none focus:!shadow-transparent uppercase font-avenir-medium text-[17px] text-[#2f2f2f] tracking-[3.4px]"
                  autoFocus
                  onKeyDown={(e) =>
                    e.key === 'Enter'
                      ? navigate('/search?q=' + inputRef.current.value)
                      : ''
                  }
                />
                <button
                  className="w-4 h-4"
                  data-action="close-search"
                  aria-label="Close search"
                  onClick={() => {
                    closeSearch();
                  }}
                >
                  <svg
                    className="Icon Icon--close "
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
                {/* <button type="submit">Search</button> */}
              </div>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </div>
  );
}
export function MenuToggle({toggle}) {
  return (
    <div className="flex-[1_0_0] flex justify-start items-center">
      <button onClick={toggle}>
        <svg
          className="w-[24px] h-[17px] max-sm:hidden xl:hidden"
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
    </div>
  );
}

export function HeaderMenu({
  menu,
  viewport,
  setMegaMenu,
  startAnimate,
  isHeaderHover,
}) {
  const [root] = useMatches();
  const publicStoreDomain = root?.data?.publicStoreDomain;
  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }
  return (
    <nav className="flex gap-[42px]" role="navigation">
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
            ? new URL(item.url).pathname
            : item.url;
        return (
          <CustomLink
            key={item.id}
            title={item.title}
            to={url}
            onClick={closeAside}
            onHover={() => {
              setMegaMenu({
                isOpen: true,
                title: item.title,
                className: item.title == 'Jewelry' ? '!justify-between' : '',
              });
              startAnimate();
            }}
            isHeaderHover={isHeaderHover}
          />
        );
      })}
    </nav>
  );
}

function CustomLink({title, to, onClick, onHover, isHeaderHover}) {
  const [isHover, setIsHover] = useState(false);
  const ref = useRef(null);
  const variants = {
    hidden: {
      width: '0%',
    },
    visible: {
      width: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      width: '0%',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const callback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-active'
        ) {
          if (element.getAttribute('data-active') == 'false') {
            setIsHover(false);
          }
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(element, {attributes: true});

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    ref.current.dataset.active = false;
  }, [isHeaderHover]);

  return (
    <NavLink
      onMouseEnter={() => {
        if (ref.current.dataset.active == 'true') return;

        const activeElements = document.querySelectorAll(
          '[data-active="true"]',
        );
        activeElements.forEach((el) => {
          el.dataset.active = false;
        });
        ref.current.dataset.active = true;
        onHover();
        setIsHover(true);
      }}
      className="cursor-pointer tracking-[.2em] text-[11px] font-bold !text-[var(--heading-color)] font-aveternate uppercase relative"
      end
      onClick={onClick}
      prefetch="intent"
      style={activeLinkStyle}
      to={to}
      ref={ref}
      data-active={false}
    >
      {title}

      <AnimatePresence>
        {isHover && (
          <motion.span
            className="absolute h-[2px] w-[30px] bg-[var(--heading-color)] left-0 -bottom-2 pointer-events-none z-10"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            &nbsp;
          </motion.span>
        )}
      </AnimatePresence>
    </NavLink>
  );
}

function HeaderCtas({isLoggedIn}) {
  const [wishlistCount, setWishlistCount] = useState(0);

  // useEffect(() => {
  //   const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  //   setWishlistCount(wishlist.length);
  // }, []);

  const {wishlist} = useWishlist();

  useEffect(() => {
    setWishlistCount(wishlist.length);
  }, [wishlist]);

  return (
    <nav
      className="flex items-center gap-[18px] sm:gap-[25px] text-[#808080cc] flex-[1_0_0] justify-end"
      role="navigation"
    >
      <NavLink
        prefetch="intent"
        to="/account"
        className="!text-[#808080cc] max-sm:hidden"
        style={activeLinkStyle}
      >
        <svg
          className="w-[20px] h-[20px]"
          role="presentation"
          viewBox="0 0 20 20"
        >
          <g
            transform="translate(1 1)"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="square"
          >
            <path d="M0 18c0-4.5188182 3.663-8.18181818 8.18181818-8.18181818h1.63636364C14.337 9.81818182 18 13.4811818 18 18"></path>
            <circle cx="9" cy="4.90909091" r="4.90909091"></circle>
          </g>
        </svg>
      </NavLink>
      <NavLink
        prefetch="intent"
        to={`/wishlist`}
        className="!text-[#808080cc] max-sm:hidden"
        style={{...activeLinkStyle, position: 'relative'}}
      >
        <span
          className="show-badge is-visible absolute top-0 right-0"
          data-count={wishlistCount}
          style={{
            position: 'absolute',
            top: 0,
            right: -4,
            width: 8,
            height: 8,
            borderRadius: '100%',
            backgroundColor: '#2f2f2f',
            boxShadow: '0 0 0 2px white',
            // transform: 'scale(0)',
            transition: 'all .3s ease-in-out',
            display: 'block',
            transform: wishlistCount > 0 ? 'scale(1)' : 'scale(0)',
          }}
        ></span>
        <svg
          fill={'none'}
          style={{
            transition: 'fill 0.3s ease',
          }}
          width="23"
          height="23"
          viewBox="0 0 24 24"
          stroke="#808080cc"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </NavLink>

      <SearchToggle />
      {/* <WishlistToggle /> */}
      <CartToggle />
    </nav>
  );
}

function SearchToggle() {
  let root_ = document.documentElement.style;
  return (
    <a
      onClick={() => {
        if (root_.getPropertyValue('--search-aside-visibility') === 'hidden') {
          openSearch();
        } else {
          closeSearch();
        }
        root_.setProperty('--search-overlay-opacity', '1');
        root_.setProperty('--search-overlay-visibility', 'visible');
        root_.setProperty('--search-aside-position', 'translateY(-2px)');
        root_.setProperty('--search-aside-visibility', 'visible');
        root_.setProperty('--search-aside-opacity', '1');
        document.documentElement.style.overflowY = 'hidden';
      }}
      className="cursor-pointer"
    >
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
  let root_ = document.documentElement.style;
  return (
    <a
      className="relative cursor-pointer"
      onClick={() => {
        root_.setProperty('--cart-overlay-opacity', '1');
        root_.setProperty('--cart-overlay-visibility', 'visible');
        root_.setProperty('--cart-aside-position', 'translateX(0%)');
        root_.setProperty('--cart-aside-visibility', 'visible');
        closeSearch();
        document.documentElement.style.overflowY = 'hidden';
      }}
    >
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
function activeLinkStyleHome({isActive, isPending}) {
  return {
    fontWeight: 'bold',
    color: isPending ? 'grey' : 'black',
  };
}
export function openSearch() {
  let root_ = document.documentElement.style;
  document.documentElement.style.overflowY = 'hidden';
  root_.setProperty('--search-overlay-opacity', '1');
  root_.setProperty('--search-overlay-visibility', 'visible');
  root_.setProperty('--search-aside-position', 'translateY(0)');
  root_.setProperty('--search-aside-visibility', 'visible');
  root_.setProperty('--search-aside-opacity', '1');
}
export function closeSearch() {
  let root_ = document.documentElement.style;
  document.documentElement.style.overflowY = 'auto';
  root_.setProperty('--search-overlay-opacity', '0');
  root_.setProperty('--search-overlay-visibility', 'hidden');
  root_.setProperty('--search-aside-position', 'translateY(-25px)');
  root_.setProperty('--search-aside-visibility', 'hidden');
  root_.setProperty('--search-aside-opacity', '0');
}
