import PropTypes from 'prop-types';
import Book from './Book';

const BookList = ({ books, isLoading }) => {
  return (
    <div className='container mx-auto'>
      <h2 className='mt-5 mb-5 text-xl font-bold'>
        {isLoading ? '' : `Book List`}
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
        {books.map((book, index) => (
          <Book key={index} book={book} isLoading={isLoading} />
        ))}
      </div>

      <h2 className='mt-5 mb-5 text-xl font-bold'>
        {isLoading ? '' : `Popular Products`}
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
        {books.map((book, index) => (
          <Book key={index} book={book} isLoading={isLoading} />
        ))}
      </div>

      <h2 className='mt-5 mb-5 text-xl font-bold'>
        {isLoading ? '' : `New Arrival Books`}
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
        {books.map((book, index) => (
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
