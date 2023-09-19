import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Featured from "./Featured/Featured";
import { FaRegHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Book = ({ book }) => {
  const { title, author, thumbnail, price, featured, rating, _id } = book;

  const addToWishlist = async () => {
    try {
      const getToken = localStorage.getItem("userInfo");
      const token = getToken ? getToken.replace(/["']/g, "") : "";

      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/wishlist/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId: _id }),
        }
      );

      // Check if the request was successful
      if (response.status === 200) {
        toast.success("Book added to wishlist successfully.");
      }
    } catch (error) {
      toast.error("Error adding book to wishlist");
    }
  };

  // Define the star icons for reviews
  const stars = Array.from({ length: rating }, (_, index) => (
    <svg
      key={index}
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-yellow-400 fill-current"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 2a.75.75 0 01.606.306l1.894 2.56 2.928.472a.75.75 0 01.416 1.287l-2.246 2.186.53 2.92a.75.75 0 01-1.088.791L10 11.347l-2.624 1.564a.75.75 0 01-1.088-.79l.53-2.92-2.246-2.186a.75.75 0 01.416-1.287l2.928-.472 1.894-2.56a.75.75 0 01.607-.306zM10 18a.75.75 0 01.75.75v-5.632l2.295 1.372a.75.75 0 01.36 1.023l-1.297 2.705 2.423-.394a.75.75 0 01.443 1.357l-3.096 1.007-1.344 2.328a.75.75 0 01-1.33 0l-1.344-2.328-3.096-1.007a.75.75 0 01.443-1.357l2.423.394-1.297-2.705a.75.75 0 01.36-1.023L9.25 13.118V18a.75.75 0 01.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  ));

  return (
    <div className="flex rounded-lg shadow-lg overflow-hidden relative">
      <img
        className="w-32 h-35 object-cover rounded-t-lg"
        src={thumbnail}
        alt={title}
      />
      <div className="flex flex-col p-4 space-y-2">
        <Featured featured={featured} id={_id} />
        <Link to={`/book/${title}`}>
          <h4 className="text-lg font-semibold">{title}</h4>
        </Link>

        <p className="text-gray-600">
          by{" "}
          <Link>
            <span className="text-blue-400">{author}</span>
          </Link>
        </p>

        <div className="flex items-center space-x-2">{stars}</div>
        <p className="text-blue-600 font-semibold text-lg">BDT {price}</p>
        <div className="flex items-center space-x-2">
          {/* Wishlist Icon/Button */}
          <button
            className="text-black hover:text-green-500 text-xs font-semibold"
            onClick={addToWishlist}
          >
            <p className="flex items-center">
              <span className="pr-1">
                <FaRegHeart />
              </span>
              Add to Booklist{" "}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};
export default Book;
