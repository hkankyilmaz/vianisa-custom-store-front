export function CartAside({children}) {
  return (
    <div className="cart-aside fixed right-0 z-[55]">
      <header>
        <h3>CART</h3>
      </header>
      <main>{children}</main>
    </div>
  );
}
