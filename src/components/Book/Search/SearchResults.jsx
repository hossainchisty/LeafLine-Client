import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const BookCard = ({ book, index, isLoading }) => {
  const { _id, title, thumbnail } = book;

  return (
    <div
      className={`flex rounded-lg shadow-lg overflow-hidden bg-white ${
        index === 0 ? '' : 'border-t-2'
      }`}
    >
      {isLoading ? (
        <Skeleton width={80} height={100} className='rounded-t-lg' />
      ) : (
        <img
          className='w-20 h-25 object-cover rounded-t-lg'
          src={thumbnail}
          alt={title}
        />
      )}
      <div className='flex flex-col p-2 space-y-1 w-full'>
        <Link to={`/book/${_id}`}>
          {isLoading ? (
            <Skeleton width={130} height={18} />
          ) : (
            <h4 className='text-sm font-semibold hover:text-green-600 w-full'>
              {title}
            </h4>
          )}
        </Link>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  index: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

const SearchResults = ({ searchTerm }) => {
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Only send API request if searchTerm is not empty
    if (searchTerm.trim() !== '') {
      fetch(`${apiBaseDomain}/books/search?title=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error searching for books:', error);
          setIsLoading(false);
        });
    } else {
      // If searchTerm is empty, clear the search results
      setSearchResults([]);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className='flex flex-col'>
      {searchResults.map((book, index) => (
        <BookCard
          key={book._id}
          book={book}
          index={index}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

SearchResults.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default SearchResults;
