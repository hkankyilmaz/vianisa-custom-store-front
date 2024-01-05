import React from 'react';

export function PriceInput({value, idx}) {
  return (
    <div className="border border-[#e0e0e0] border-solid w-[100%] h-full px-[10px] py-[7px] text-[14px] flex justify-between items-center text-[#2f2f2f] font-questrial">
      <span className="text-[14px] font-questrial">$</span>
      {value[idx]}
    </div>
  );
}

export function Seperator() {
  return (
    <div className="flex justify-center text-center items-center mx-[15px] text-[#8c8c8c]">
      -
    </div>
  );
}

export function ColorOrMetarialInput({value, name}) {
  const _value = insertCharAtIndex(value, ' ', 3);

  function insertCharAtIndex(originalString, charToInsert, index) {
    return (
      originalString.slice(0, index) +
      charToInsert +
      originalString.slice(index)
    );
  }

  return (
    <>
      <div className="relative">
        <input
          className="hidden"
          type="checkbox"
          id={name == 'color' ? value : `_${value}`}
          name={name}
          value={value}
        />
        <span className={`${name == 'color' ? value : `_${value}`}`}></span>
        <label
          className="uppercase w-full block"
          htmlFor={`${name == 'color' ? value : `_${value}`}`}
        >
          {name == 'color' ? value : _value}
        </label>
      </div>
    </>
  );
}
