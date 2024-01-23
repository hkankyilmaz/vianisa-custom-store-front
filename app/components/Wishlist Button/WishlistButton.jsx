import {useState} from 'react';

const WishlistButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };

  return (
    <button
      className={`flex justify-center items-center text-[#2f2f2f] text-[13px] font-avenir-medium ${
        isClicked ? 'text-[#cfcfcf]' : ''
      }`}
      onClick={handleClick}
    >
      <svg
        className={`feather feather-heart ${
          isClicked ? 'text-[#cfcfcf]' : 'text-current'
        }`}
        fill={isClicked ? 'currentColor' : 'none'}
        height="20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="ml-1">
        {isClicked ? 'Added to Wishlist' : 'Add to Wishlist'}
      </span>
    </button>
  );
};

export default WishlistButton;
