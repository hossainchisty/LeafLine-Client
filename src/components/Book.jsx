import PropTypes from "prop-types";
import Featured from "./Featured";

const Book = ({ book }) => {
  const { title, author, thumbnail, price, featured, rating, id } = book;

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
      <img className="w-32 h-35 object-cover" src={thumbnail} alt={title} />
      <div className="flex flex-col p-4 space-y-2">
        <Featured featured={featured} id={id} />

        <h4 className="text-lg font-semibold">{title}</h4>

        <p className="text-gray-600">{author}</p>
        <div className="flex items-center space-x-2">{stars}</div>
        <p className="text-blue-600 font-semibold text-lg">BDT {price}</p>
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
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};
export default Book;
