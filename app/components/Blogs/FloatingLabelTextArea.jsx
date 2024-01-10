import {useState} from 'react';

const FloatingLabelTextArea = ({
  label,
  classNames = {
    wrapper: '',
    label: '',
  },
  ...props
}) => {
  const [isLabelVisible, setIsLabelVisible] = useState(false);
  const [value, setValue] = useState('');
  delete props.placeholder;

  const handleChange = (e) => {
    setValue(e.target.value);
    setIsLabelVisible(e.target.value !== '');
  };

  return (
    <div className={`relative w-full ${classNames.wrapper}`}>
      <textarea
        {...props}
        placeholder={label}
        value={value}
        onChange={handleChange}
      />
      <label
        className={`absolute bottom-[calc(100%_-_8px)] left-2.5 px-[5px] transition-all duration-300 ease-css-ease-in-out text-[11px] text-[var(--blog-text-color)] pointer-events-none bg-white ${
          isLabelVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-1/2 opacity-0'
        } ${classNames.label}`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelTextArea;
