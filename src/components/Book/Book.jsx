import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Featured from './Featured/Featured';
import { FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Star from './Star';
import Skeleton from 'react-loading-skeleton';

const Book = ({ book, isLoading }) => {
  const [showMessage, setShowMessage] = useState(false);
  const { title, author, thumbnail, price, featured, rating, _id } = book;
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  const addToWishlist = async () => {
    try {
      const getToken = localStorage.getItem('userInfo');
      const token = getToken ? getToken.replace(/["']/g, '') : '';

      if (!token) {
        // If the user is not authenticated, show a message and prevent the API call
        setShowMessage(true);
        return;
      }

      const response = await fetch(`${apiBaseDomain}/wishlist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: _id }),
      });

      // Check if the request was successful
      if (response.status === 200) {
        toast.success('Book added to wishlist successfully.');
      }
    } catch (error) {
      toast.error('Error adding book to wishlist');
    }
  };

  return (
    <div className='flex rounded-lg shadow-lg overflow-hidden relative'>
      {isLoading ? (
        <Skeleton width={120} height={160} className='rounded-t-lg' />
      ) : (
        <img
          className='w-32 h-35 object-cover rounded-t-lg'
          src={thumbnail}
          alt={title}
        />
      )}
      <div className='flex flex-col p-4 space-y-2'>
        <Featured featured={featured} id={_id} isLoading={isLoading} />

        <Link to={`/book/${_id}`}>
          {isLoading ? (
            <Skeleton width={190} height={20} />
          ) : (
            <h4 className='text-lg font-semibold hover:text-green-600'>
              {title}
            </h4>
          )}
        </Link>
        <p className='text-gray-600'>
          <Link>
            {isLoading ? (
              <Skeleton width={90} />
            ) : (
              <span>
                by{' '}
                <span className='text-gray-800 hover:text-green-600'>
                  {author}
                </span>
              </span>
            )}
          </Link>
        </p>
        <div className='flex items-center space-x-2'>
          {Array.from({ length: rating }).map((element, index) => (
            <Star element={element} key={index} isLoading={isLoading} />
          ))}
        </div>
        <p className='text-blue-400 font-semibold text-lg'>
          {isLoading ? <Skeleton width={40} /> : `$${price}`}
        </p>

        <div className='flex items-center space-x-2'>
          {/* Wishlist Icon/Button */}
          <button
            className='text-black hover:text-green-500 text-xs font-semibold'
            onClick={() => {
              addToWishlist();
            }}
          >
            <p className='flex items-center'>
              <span className='pr-1'>
                <FaRegHeart />
              </span>
              {isLoading ? <Skeleton width={40} /> : `Went to read`}
            </p>
          </button>
          {showMessage && (
            <>
              <p className='text-red-500 text-sm'>Sign up to use</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Book.propTypes = {
  isLoading: PropTypes.bool.isRequired,
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
