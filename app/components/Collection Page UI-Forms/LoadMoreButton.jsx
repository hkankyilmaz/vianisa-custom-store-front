import {FaLongArrowAltDown} from 'react-icons/fa';

function LoadMoreButton() {
  return (
    <span className="flex hover:text-[#333333] hover:border-[#333333] transition-all duration-[0.7s] text-[gray] justify-center items-center space-x-1 border border-1px px-6 py-3">
      <span>Load More</span>
      <FaLongArrowAltDown />
    </span>
  );
}

export default LoadMoreButton;
