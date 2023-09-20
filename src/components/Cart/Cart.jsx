import { useState, useEffect } from "react";
import { useCartItemCount } from "../../context/CartItemCountContext";

const Cart = () => {
  const { decrementItemCount } = useCartItemCount();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const getToken = localStorage.getItem("userInfo");
  const token = getToken ? getToken.replace(/["']/g, "") : "";

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/cart/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data.cartItems);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, [token]);

  useEffect(() => {
    const calculatedTotalPrice = cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
    setTotalPrice(calculatedTotalPrice);
  }, [cartItems]);

  const handleRemoveItem = (productId) => {
    fetch(`http://localhost:8000/api/v1/cart/remove/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        const updatedCartItems = cartItems.filter(
          (item) => item.productId._id !== productId
        );
        decrementItemCount();
        setCartItems(updatedCartItems);
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };

  if (!Array.isArray(cartItems)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen mt-10 flex justify-center items-start">
      <div className="mx-auto max-w-5xl flex-grow px-6 flex flex-col md:flex-row">
        {/* Cart Items (Left Side) */}
        <div className="md:w-2/3 pr-6">
          {cartItems.map((item) => (
            <div
              key={item.productId._id}
              className="mb-6 rounded-lg bg-white p-6 shadow-md flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={item.productId.thumbnail}
                  alt="product-image"
                  className="w-24 h-24 rounded-lg mr-4"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {item.productId.title}
                  </h2>
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex items-center border-gray-100">
                      <span
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        // onClick={() => handleRemoveItem(item.productId._id)} // Pass product ID
                      >
                        {" "}
                        -{" "}
                      </span>
                      <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        defaultValue={item.quantity}
                        min={1}
                      />
                      <span
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        // onClick={() => handleRemoveItem(item.productId._id)} // Pass product ID
                      >
                        {" "}
                        +{" "}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">BDT {item.productId.price}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        onClick={() => handleRemoveItem(item.productId._id)} // Pass product ID
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Section (Right Side) */}
        <div className="md:w-1/3">
          <div className="rounded-lg border bg-white p-6 shadow-md">
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  BDT {totalPrice.toFixed(2)}
                </p>{" "}
              </div>
            </div>
            <hr className="my-4" />
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
