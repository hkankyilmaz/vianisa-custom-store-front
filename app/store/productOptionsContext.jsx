import React, {useState, createContext} from 'react';

const ProductOptionContext = createContext();

export const ProductContextProvider = ({children}) => {
  const [option, setOption] = useState('');

  const value = {
    option,
    setOption,
  };

  return (
    <ProductOptionContext.Provider value={value}>
      {' '}
      {children}{' '}
    </ProductOptionContext.Provider>
  );
};

export default ProductOptionContext;
