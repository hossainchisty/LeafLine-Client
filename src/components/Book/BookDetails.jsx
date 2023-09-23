/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCartItemCount } from "../../context/CartItemCountContext";
import Review from "../Review/Review";

const BookDetails = ({ books }) => {
  const { incrementItemCount } = useCartItemCount();
  const [cart, setCart] = useState([]);
  const { productId } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Check if the book exists before proceeding
  const book = books.find(
    (book) => book._id.toString() === productId.toString()
  );

  if (!book) {
    return <div>Book not found</div>;
  }

  const {
    title,
    author,
    thumbnail,
    price,
    rating,
    description,
    publishYear,
    publisher,
    ISBN,
    pages,
    language,
  } = book;

  const getToken = localStorage.getItem("userInfo");
  const token = getToken ? getToken.replace(/["']/g, "") : "";
  const isLoggedIn = !!token;
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  const addToCart = () => {
    const quantity = 1; // Quantity

    if (!isLoggedIn) {
      // For anonymous users, store the item in local storage
      const newItem = {
        productId,
        quantity,
        title,
        author,
        thumbnail,
        price,
      };
      setCart([...cart, newItem]);

      const existingCartData = localStorage.getItem("cart");
      const existingCart = existingCartData ? JSON.parse(existingCartData) : [];
      const updatedCart = [...existingCart, newItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // For logged-in users, send the item to the server
      const newItem = { productId, quantity };

      fetch(`${apiBaseDomain}/cart/add`, {
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

  // Function to generate star rating icons
  const generateStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-300 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div>
      <div className="flex rounded-lg shadow-lg overflow-hidden">
        <img className="w-64 h-80 object-cover" src={thumbnail} alt={title} />
        <div className="flex flex-col p-4 space-y-4">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {generateStarRating(rating)}
              <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {rating} out of 5
              </p>
            </div>
          </div>
          <p className="text-gray-600">
            <Link to={`/author/${author}`}>
              <span className="text-blue-400">{author}</span>
            </Link>{" "}
            — <span className="text-gray-600">{publishYear}</span> <br />
            <div className="mt-2">
              <span className="bg-gray-100 text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded-lg ">
                Historical Fiction
              </span>
            </div>
          </p>
          <p className="text-blue-600 font-semibold text-xl">BDT {price}</p>
          <div>
            {description &&
            typeof description === "string" &&
            description.length > 350 ? (
              <>
                {showFullDescription ? (
                  <div className="text-gray-700">
                    <p className="mb-5">{description}</p>
                    <p className="mb-2">
                      <span className="text-black font-semibold">ISBN:</span>{" "}
                      {ISBN}
                      <br />
                      <span className="text-black font-semibold">
                        Edition Language:
                      </span>{" "}
                      {language}
                      <br />
                      <span className="text-black font-semibold">
                        Pages:
                      </span>{" "}
                      {pages}
                      <br />
                      <span className="text-black font-semibold">
                        Publisher:
                      </span>{" "}
                      {publisher}
                      <br />
                      <span className="text-black font-semibold">
                        Edition release date:
                      </span>{" "}
                      {publishYear}
                      <br />
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-700">
                    {description.substring(0, 350)}...
                  </p>
                )}
                <button
                  className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "Show Less" : "Show More"}
                </button>
              </>
            ) : (
              <p className="text-gray-700">{description}</p>
            )}
          </div>

          <button
            className="bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-semibold"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <Review />
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
