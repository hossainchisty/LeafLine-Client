/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

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

  const clearCart = () => {
    // Add logic here to clear the cart, e.g., remove items from cart state
    // and any other cart-related data in your application.
    setCartItemCount(0); // Reset the cart item count to 0
  };

  // Use local storage to persist the cart item count
  useEffect(() => {
    const storedCount = localStorage.getItem("cartItemCount");
    if (storedCount !== null) {
      setCartItemCount(parseInt(storedCount, 10));
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever the count changes
    localStorage.setItem("cartItemCount", cartItemCount.toString());
  }, [cartItemCount]);

  return (
    <CartItemCountContext.Provider
      value={{
        cartItemCount,
        incrementItemCount,
        decrementItemCount,
        clearCart,
      }}
    >
      {children}
    </CartItemCountContext.Provider>
  );
};

export const useCartItemCount = () => {
  return useContext(CartItemCountContext);
};
