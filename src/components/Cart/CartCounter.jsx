/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";

const CartCounter = () => {
  const getToken = localStorage.getItem("userInfo");
  const token = getToken ? getToken.replace(/["']/g, "") : "";
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/cart/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCartCount(data.cartItems.length);
      })
      .catch((error) => {
        console.error("Error fetching cart count:", error);
      });
  }, []);

  return (
    <div>
      <FaCartPlus className="mr-3" />
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartCounter;
