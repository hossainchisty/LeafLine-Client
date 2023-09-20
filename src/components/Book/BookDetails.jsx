/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Star from "./Star";
import toast from "react-hot-toast";
import { useCartItemCount } from "../../context/CartItemCountContext";

const BookDetails = ({ books }) => {
  const { incrementItemCount } = useCartItemCount();
  const [cart, setCart] = useState([]);
  const { productId } = useParams();

  // Check if the book exists before proceeding
  const book = books.find(
    (book) => book._id.toString() === productId.toString()
  );

  if (!book) {
    return <div>Book not found</div>;
  }

  const { title, author, thumbnail, price, rating, description } = book;

  const getToken = localStorage.getItem("userInfo");
  const token = getToken ? getToken.replace(/["']/g, "") : "";
  const isLoggedIn = !!token;

  const addToCart = () => {
    const quantity = 1; // Quantity

    if (!isLoggedIn) {
      // For anonymous users, store the item in local storage
      const newItem = { productId, quantity, title, author, thumbnail, price };
      setCart([...cart, newItem]);

      const existingCartData = localStorage.getItem("cart");
      const existingCart = existingCartData ? JSON.parse(existingCartData) : [];
      const updatedCart = [...existingCart, newItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // For logged-in users, send the item to the server
      const newItem = { productId, quantity };

      fetch("http://localhost:8000/api/v1/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newItem), // Include productId and quantity
      })
        .then((response) => {
          if (response.ok) {
            incrementItemCount();
          } else {
            toast.error("Failed to add to cart");
          }
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
          toast.error("Failed to add to cart");
        });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const existingCartData = localStorage.getItem("cart");
      if (existingCartData) {
        setCart(JSON.parse(existingCartData));
      }
    }
  }, []);

  return (
    <div className="flex rounded-lg shadow-lg overflow-hidden">
      <img className="w-64 h-80 object-cover" src={thumbnail} alt={title} />
      <div className="flex flex-col p-4 space-y-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex items-center space-x-2">
          {Array.from({ length: rating }).map((element, index) => (
            <Star element={element} key={index} />
          ))}
        </div>
        <p className="text-gray-600">
          by <span className="text-blue-400">{author}</span>
        </p>
        <p className="text-blue-600 font-semibold text-xl">BDT {price}</p>
        <p className="text-gray-700">{description}</p>
        <button
          className="bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-semibold"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

BookDetails.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BookDetails;
