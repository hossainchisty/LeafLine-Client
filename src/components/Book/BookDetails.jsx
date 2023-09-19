import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import Star from "./Star";

const BookDetails = ({ books }) => {
  const { title } = useParams();
  // Find the book with the matching title
  const book = books.find((book) => book.title === title);

  const { author, thumbnail, price, rating, description } = book;

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
          by{" "}
          <Link>
            <span className="text-blue-400">{author}</span>
          </Link>
        </p>
        <p className="text-blue-600 font-semibold text-xl">BDT {price}</p>
        <p className="text-gray-700">{description}</p>
        <button
          className="bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-semibold"
          onClick={() => {
            // Handle the add to cart functionality here
            // You can dispatch an action or update the cart state
          }}
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
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      featured: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BookDetails;
