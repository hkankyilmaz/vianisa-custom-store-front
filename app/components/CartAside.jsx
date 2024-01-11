import {CloseButton} from '~/components/Header/Drawer';

export function CartAside({children, closeCart}) {
  return (
    <div className="cart-aside fixed right-0 z-[55] max-sm:left-[65px] sm:w-[400px] flex flex-col">
      <header className="flex justify-between items-center font-playfair text-xl font-semibold tracking-[4px] px-[30px] h-[60px] border-b border-[#e5e7eb]">
        <h3>CART</h3>
        <div className="absolute right-[30px]">
          <CloseButton onClick={() => closeCart()} />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
