import {Await} from '@remix-run/react';
import {Suspense, useRef, useEffect, useState} from 'react';
import {Aside} from '~/components/Aside';
import {CartAside} from '~/components/CartAside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header/Header';

import {CartMain} from './Cart';
import AnnouncementBar from './AnnouncementBar';
import ProductModal from './Product Popover/ProductModal';
import {ProductContextProvider} from '~/store/productOptionsContext';

export function Layout({cart, children = null, footer, header, isLoggedIn}) {
  const ref = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <>
          <ProductContextProvider>
            <CartModal cart={cart} />
            <MobileMenuAside menu={header.menu} />
            <ProductModal />
            <div ref={ref}>
              <AnnouncementBar />
              <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />
            </div>
            <main className="relative">{children}</main>
            <Suspense>
              <Await resolve={footer}>
                {(footer) => <Footer menu={footer.menu} />}
              </Await>
            </Suspense>
          </ProductContextProvider>
        </>
      )}
    </>
  );
}

function CartModal({cart}) {
  const closeCart = () => {
    let root_ = document.documentElement.style;
    root_.setProperty('--cart-overlay-opacity', '0');
    root_.setProperty('--cart-overlay-visibility', 'hidden');
    root_.setProperty('--cart-aside-position', 'translateX(100%)');
    root_.setProperty('--cart-aside-visibility', 'hidden');
    document.documentElement.style.overflowY = 'auto';
  };
  return (
    <div className="cart-container">
      <div
        onClick={() => closeCart()}
        className="cart-overlay bg-[#363636]/50 w-[100%] z-50 translate-x-[0%] h-[100vh] fixed top-0 "
      ></div>
      <CartAside closeCart={closeCart}>
        <Suspense fallback={<p>Loading cart ...</p>}>
          <Await resolve={cart}>
            {(cart) => {
              return <CartMain cart={cart} layout="aside" />;
            }}
          </Await>
        </Suspense>
      </CartAside>
    </div>
  );
}

function MobileMenuAside({menu}) {
  return (
    <Aside id="mobile-menu-aside" heading="MENU">
      <HeaderMenu menu={menu} viewport="mobile" />
    </Aside>
  );
}
