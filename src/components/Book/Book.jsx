import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Featured from "./Featured/Featured";
import { FaRegHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Star from "./Star";

const Book = ({ book }) => {
  const { title, author, thumbnail, price, featured, rating, _id } = book;
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  const addToWishlist = async () => {
    try {
      const getToken = localStorage.getItem("userInfo");
      const token = getToken ? getToken.replace(/["']/g, "") : "";

      const response = await fetch(`${apiBaseDomain}/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: _id }),
      });

      // Check if the request was successful
      if (response.status === 200) {
        toast.success("Book added to wishlist successfully.");
      }
    } catch (error) {
      toast.error("Error adding book to wishlist");
    }
  };

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
        <div className="flex items-center space-x-2">
          {Array.from({ length: rating }).map((element, index) => (
            <Star element={element} key={index} />
          ))}
        </div>
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
