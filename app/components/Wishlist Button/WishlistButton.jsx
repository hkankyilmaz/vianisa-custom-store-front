import {useEffect, useState} from 'react';
import {useWishlist} from '~/store/wishlistContext';

function WishlistButton({productId, style}) {
  const {wishlist, addToWishlist, removeFromWishlist} = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlist.includes(productId));
  }, [wishlist, productId]);

  const handleToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
    setIsInWishlist(!isInWishlist);
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        padding: 15,
        borderRadius: 999,
        border: '1px solid #E5E7EB',
        background: 'white',
        marginLeft: 10,
        transition: 'all ease 150ms',
        position: 'absolute',
        zIndex: 1,
        transformOrigin: 'center',
        ...style,
      }}
      className="hover:bg-[#fff0e7] hover:text-[#2f2f2f] transform hover:scale-110"
    >
      <svg
        fill={isInWishlist ? '#808080' : 'none'}
        style={{
          transition: 'all 0.3s ease',
        }}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        stroke={isInWishlist ? '#808080' : '#808080'}
        stroke-width="2"
        stroke-linecap="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
}

export default WishlistButton;
