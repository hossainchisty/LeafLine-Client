import PropTypes from 'prop-types';
import Book from './Book';

const BookList = ({ books, isLoading }) => {
  return (
    <div className='container mx-auto'>
      {/* Book Lists */}
      <h2 className='mt-5 mb-5 text-xl font-bold'>
        {isLoading ? '' : `Book List`}
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
        {books.map((book, index) => (
          <Book key={index} book={book} isLoading={isLoading} />
        ))}
      </div>

      {/* Most Popular Books */}
      {books.some((book) => book.averageRating > 1000) && (
        <div>
          <h2 className='mt-5 mb-5 text-xl font-bold'>
            {isLoading ? '' : `Popular Books`}
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
            {books
              .filter((book) => book.averageRating > 1000) // Filter books with averageRating > 1000
              .map((book, index) => (
                <Book key={index} book={book} isLoading={isLoading} />
              ))}
          </div>
        </div>
      )}

      {/* Featured Books */}
      <h2 className='mt-5 mb-5 text-xl font-bold'>
        {isLoading ? '' : `Featured Books`}
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
        {books
          .filter((book) => book.featured) // Filter only featured books
          .map((book, index) => (
            <Book key={index} book={book} isLoading={isLoading} />
          ))}
      </div>

      {/* New Arrival Books */}
      <h2 className='mt-5 mb-5 text-xl font-bold'>
        {isLoading ? '' : `New Arrival Books`}
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
        {books
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort books by creation timestamp in descending order
          .map((book, index) => (
            <Book key={index} book={book} isLoading={isLoading} />
          ))}
      </div>

      {/* Show the button only when isLoading is false */}
      {!isLoading && (
        <div className='flex justify-center mt-8'>
          <button className='bg-green-800 text-white rounded-md py-2 px-5'>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default BookList;
