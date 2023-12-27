import React from 'react';

function FilterBarMobile() {
  const handleClick = () => {
    let root_ = document.documentElement.style;
    root_.setProperty('--filter-container-visibility', 'hidden');
    root_.setProperty('--filter-form-position', 'translateX(100%)');
    document.documentElement.style.overflowY = 'auto';
  };

  return (
    <div className="filter-bar-container absolute w-full h-[100vh] bg-black/50 z-20 flex justify-between items-center">
      <div onClick={() => handleClick()} className="w-[50%] h-full">
        Input
      </div>
      <div className="filter-form-mobile h-full w-[50%] translate-x-[100%] bg-white">
        Form
      </div>
    </div>
  );
}

export default FilterBarMobile;
