import {Link, useLocation, useMatches} from '@remix-run/react';
import {useContext} from 'react';
import ProductOptionContext from '~/store/productOptionsContext';

function ProductModal() {
  const matches = useMatches();
  const value = useContext(ProductOptionContext);
  const location = useLocation();
  const options = matches;
  const handleClick = () => {
    let root_ = document.documentElement.style;
    root_.setProperty('--product-options-container-visibility', 'hidden');
    root_.setProperty('--product-options-form-position', 'translateY(100%)');
    document.documentElement.style.overflowY = 'auto';
  };

  return (
    <div className="product-bar-container fixed w-full h-[100vh] z-50 flex flex-col justify-between items-center lg:hidden">
      <div
        onClick={() => handleClick()}
        className="bg-[#363636]/50 w-[100%] h-full translate-y-[0%]"
      ></div>
      <div className="absolute flex flex-col items-center bottom-0 z-[150] product-form-mobile h-min w-[100%] translate-y-[100%] bg-[#efefef]">
        <div className="value-list w-full h-full">
          <header className="w-full text-center px-5 py-[13px]  text-[#2f2f2f] text-xl font-avenir-medium tracking-[4px]">
            {value.option === 'Color' ? 'COLOR' : 'MATERIAL'}
          </header>
          {/* <button className=" text-[#2f2f2f] hover:underline text-center text-sm tracking-widest py-[10px] uppercase w-full active:bg-white select-none">
            {value.option === 'Color' ? 'Color' : 'Meterial'}
          </button> */}

          <div className="value-list w-full h-full flex flex-col py-[18px]">
            {options[1]?.data?.product?.options[
              value.option === 'Color' ? 1 : 0
            ]?.values.map((value, isAvailable, isActive, to) => {
              return (
                <Link
                  className=" text-[#2f2f2f] hover:underline text-center text-sm tracking-widest py-[10px] uppercase w-full active:bg-white select-none"
                  key={value}
                  id={to}
                  prefetch="intent"
                  preventScrollReset
                  replace
                  to={to}
                >
                  {value}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
