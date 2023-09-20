/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const CartItemCountContext = createContext();

export const CartItemCountProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const incrementItemCount = () => {
    setCartItemCount(cartItemCount + 1);
  };

  const decrementItemCount = () => {
    if (cartItemCount > 0) {
      setCartItemCount(cartItemCount - 1);
    }
  };

  return (
    <CartItemCountContext.Provider
      value={{ cartItemCount, incrementItemCount, decrementItemCount }}
    >
      {children}
    </CartItemCountContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCartItemCount = () => {
  return useContext(CartItemCountContext);
};
