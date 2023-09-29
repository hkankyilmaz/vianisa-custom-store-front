import {Await} from '@remix-run/react';
import {Suspense, useRef, useEffect} from 'react';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header/Header';
import useIsomorphicLayoutEffect from '~/utils';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';
import {CartMain} from './Cart';
import AnnouncementBar from './AnnouncementBar';
import gsap from 'gsap';

export function Layout({cart, children = null, footer, header, isLoggedIn}) {
  const ref = useRef();

  useIsomorphicLayoutEffect(() => {
    const height = ref.current.offsetHeight;
    gsap.set('.homepage-banner', {
      '--header-announcemed-height': `calc(100vh - ${height}px)`,
    });
    //ref.current.style.setProperty('header-announcemed-height', height);
  }, []);

  return (
    <>
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside menu={header.menu} />
      <div ref={ref}>
        <AnnouncementBar />
        <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />
      </div>
      <main>{children}</main>
      <Suspense>
        <Await resolve={footer}>
          {(footer) => <Footer menu={footer.menu} />}
        </Await>
      </Suspense>
    </>
  );
}

function CartAside({cart}) {
  return (
    <Aside id="cart-aside" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              &nbsp;
              <button type="submit">Search</button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

function MobileMenuAside({menu}) {
  return (
    <Aside id="mobile-menu-aside" heading="MENU">
      <HeaderMenu menu={menu} viewport="mobile" />
    </Aside>
  );
}