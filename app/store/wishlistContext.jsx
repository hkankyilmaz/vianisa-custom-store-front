import React, {createContext, useContext, useState, useEffect} from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (productId) => {
    // setWishlist((prevWishlist) => [...prevWishlist, productId]);
    // localStorage.setItem('wishlist', JSON.stringify(wishlist));
    // document.cookie = `wishlist=${JSON.stringify(wishlist)}; path=/;`;

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      document.cookie = `wishlist=${JSON.stringify(wishlist)}; path=/;`;
      setWishlist((prevWishlist) => [...prevWishlist, productId]);
    }
    toast.success('Added to wishlist.', {
      position: 'top-left',
    });
  };

  const removeFromWishlist = (productId) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter((id) => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    document.cookie = `wishlist=${JSON.stringify(wishlist)}; path=/;`;
    setWishlist((prevWishlist) =>
      prevWishlist.filter((id) => id !== productId),
    );
    toast.success('Removed from wishlist.', {
      icon: '🗑️',
      position: 'top-left',
    });
  };

  useEffect(() => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(wishlist);
  }, []);

  return (
    <WishlistContext.Provider
      value={{wishlist, addToWishlist, removeFromWishlist}}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
