import React from 'react';

export function PriceInput({value, idx}) {
  return (
    <div className="border border-[#8c8c8c] border-solid w-[37%] h-[40px] relative text-right text-xl pr-2 flex justify-end items-center text-[#8c8c8c]">
      <span className="absolute left-2 top-[50%] translate-y-[-50%] text-xl ">
        $
      </span>
      {value[idx]}
    </div>
  );
}

export function Seperator() {
  return (
    <div className="flex justify-center items-center mx-[3%] text-[#8c8c8c]">
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
      <input
        className="hidden"
        type="checkbox"
        id={name == 'color' ? value : `_${value}`}
        name={name}
        value={value}
      />
      <span
        className={`hidden ${name == 'color' ? value : `_${value}`}`}
      ></span>
      <label
        className="uppercase"
        htmlFor={`${name == 'color' ? value : `_${value}`}`}
      >
        {name == 'color' ? value : _value}
      </label>
    </>
  );
}
