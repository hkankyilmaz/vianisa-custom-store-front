import {useState} from 'react';

export function PriceInput({
  max,
  min,
  value,
  setValue,
  setSliderValue,
  submit,
  searchParamsValue,
}) {
  const handleOnChange = (e, defaultValue) => {
    if (e.target.value != '') {
      setValue((prev) =>
        defaultValue == min
          ? [parseInt(e.target.value), prev[1]]
          : [prev[0], parseInt(e.target.value)],
      );
    } else {
      setValue((prev) =>
        defaultValue == min ? [-Infinity, prev[1]] : [prev[0], Infinity],
      );
    }
  };

  const handleOnFocus = (e) => {
    const input = e.target;
    input.type = 'text';

    setTimeout(() => {
      const len = input.value.length;
      input.setSelectionRange(len, len);
      input.type = 'number';
    }, 0);
  };

  const handleOnBlur = (e, defaultValue) => {
    validateInput(e, defaultValue);
    conditionalSubmit(e, defaultValue);
  };

  const handleOnKeyDown = (e, defaultValue) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      validateInput(e, defaultValue);
      conditionalSubmit(e, defaultValue);
    }
  };

  const validateInput = (e, defaultValue) => {
    if (
      e.target.value == '' ||
      (defaultValue == min && parseInt(e.target.value) < min) ||
      (defaultValue == max && parseInt(e.target.value) > max)
    ) {
      e.target.value = defaultValue;
    }

    if (defaultValue == min && parseInt(e.target.value) > value[1]) {
      e.target.value = value[1] - 1;
    }

    if (defaultValue == max && parseInt(e.target.value) < value[0]) {
      e.target.value = value[0] + 1;
    }

    setValue((prev) =>
      defaultValue == min
        ? [parseInt(e.target.value), prev[1]]
        : [prev[0], parseInt(e.target.value)],
    );
    setSliderValue(
      defaultValue == min
        ? [parseInt(e.target.value), value[1]]
        : [value[0], parseInt(e.target.value)],
    );

    e.target.blur();
  };

  const conditionalSubmit = (e, defaultValue) => {
    const valueInt = parseInt(e.target.value);
    if (
      valueInt != defaultValue || // if value is not default
      (valueInt == defaultValue && // if value is default but searchParamsValue is not default
        ((defaultValue == min && searchParamsValue[0] != min) ||
          (defaultValue == max && searchParamsValue[1] != max)))
    ) {
      submit();
    }
  };

  return (
    <div className="flex justify-between">
      <div className="border border-[#e0e0e0] border-solid w-[100%] h-full px-[10px] py-[7px] text-[14px] flex justify-between items-center text-[#2f2f2f] font-questrial">
        <span className="text-[14px] font-questrial">$</span>
        <input
          className="w-full text-[14px] font-questrial p-0 appearance-none text-end border-none bg-transparent focus:ring-0"
          name={value[0] == min && value[1] == max ? '' : 'minPrice'}
          type="number"
          inputMode="numeric"
          value={value[0] == -Infinity ? '' : value[0]}
          onChange={(e) => handleOnChange(e, min)}
          onFocus={handleOnFocus}
          onBlur={(e) => handleOnBlur(e, min)}
          onKeyDown={(e) => handleOnKeyDown(e, min)}
        />
      </div>
      <div className="flex justify-center text-center items-center mx-[15px] text-[#8c8c8c]">
        -
      </div>
      <div className="border border-[#e0e0e0] border-solid w-[100%] h-full px-[10px] py-[7px] text-[14px] flex justify-between items-center text-[#2f2f2f] font-questrial">
        <span className="text-[14px] font-questrial">$</span>
        <input
          className="w-full text-[14px] font-questrial p-0 appearance-none text-end border-none bg-transparent focus:ring-0"
          name={value[0] == min && value[1] == max ? '' : 'maxPrice'}
          type="number"
          inputMode="numeric"
          value={value[1] == Infinity ? '' : value[1]}
          onChange={(e) => handleOnChange(e, max)}
          onFocus={handleOnFocus}
          onBlur={(e) => handleOnBlur(e, max)}
          onKeyDown={(e) => handleOnKeyDown(e, max)}
        />
      </div>
    </div>
  );
}

export function ColorOrMetarialInput({
  value,
  name,
  count,
  submit,
  defaultChecked,
}) {
  const _value = value.split('-').join(' ');
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleOnChange = (e) => {
    setIsChecked(e.target.checked);
    submit();
  };

  return (
    <>
      <div className="relative">
        <input
          className="hidden"
          type="checkbox"
          id={name == 'color' ? value : `_${value}`}
          name={name}
          value={value}
          onChange={handleOnChange}
          checked={isChecked}
        />
        <span className={`${name == 'color' ? value : `_${value}`}`}></span>
        <label
          className="uppercase w-full block"
          htmlFor={`${name == 'color' ? value : `_${value}`}`}
        >
          {name == 'color' ? value : _value} ({count})
        </label>
      </div>
    </>
  );
}
