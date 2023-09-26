/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useCartItemCount } from "../../context/CartItemCountContext";

const CheckoutForm = () => {
  // State and Hooks
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const { clearCart } = useCartItemCount();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const getToken = localStorage.getItem("userInfo");
  const token = getToken ? getToken.replace(/["']/g, "") : "";
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${apiBaseDomain}/cart/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((cartInfo) => {
        const bookData = cartInfo.cart.items.map((cartItem) => ({
          ...cartItem.book,
          quantity: cartItem.quantity,
          cartId: cartItem._id,
        }));
        setCartItems(bookData);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, [token]);

  // Calculate total whenever cart items change
  useEffect(() => {
    const calculatedTotalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotal(calculatedTotalPrice);
  }, [cartItems]);

  const deleteCart = async () => {
    fetch(`${apiBaseDomain}/cart/remove-all`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => {
      console.error("Error fetching client secret:", error);
    });
  };

  const handlePayment = async () => {
    const orderData = {
      address: address,
      city: city,
      postalCode: zip,
      items: cartItems.map((item) => ({
        itemName: item.title,
        quantity: item.quantity,
      })),
      totalAmount: total,
    };

    await fetch(`${apiBaseDomain}/order/charge/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
      });

    if (!clientSecret) {
      console.error("Invalid clientSecret");
      return;
    }
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement("card");

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        console.error("Stripe confirmCardPayment error:", error);
        toast.error("Payment Failed");
        return;
      }

      if (paymentIntent.status === "succeeded") {
        clearCart();
        deleteCart();
        toast.success("Congrats! Your Payment is Completed");
        navigate("/payment-success");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32"></div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4">
          <p className="text-xl font-medium">Order Summary</p>
          {cartItems.map((item) => (
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={item.thumbnail}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.title}</span>
                  <p className="text-lg font-bold">{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Details
            </label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "18px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                />
              </div>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/4 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="City"
              />
              <input
                type="number"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
              />
            </div>
            {/* Total */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                BDT {total.toFixed(2)}
              </p>
            </div>
          </div>
          <button
            onClick={handlePayment}
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
