import { useState, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const Favorite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [removeBookId, setRemoveBookId] = useState(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  const getToken = localStorage.getItem('userInfo');
  const token = getToken ? getToken.replace(/["']/g, '') : '';

  const fetchWishlist = useCallback(() => {
    setIsLoading(true);
    fetch(`${apiBaseDomain}/wishlist/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFavoriteBooks(data.wishlistedBooks);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching favorite books:', error);
      });
  }, [apiBaseDomain, token]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const openRemoveModal = (bookId) => {
    setRemoveBookId(bookId);
    setIsRemoveModalOpen(true);
  };

  const closeRemoveModal = () => {
    setIsRemoveModalOpen(false);
  };

  const removeBook = () => {
    // Remove the item from the UI immediately
    setFavoriteBooks((prevBooks) =>
      prevBooks.filter((book) => book._id !== removeBookId)
    );

    fetch(`${apiBaseDomain}/wishlist/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookId: removeBookId }),
    })
      .then((response) => {
        if (response.status === 204) {
          // Do nothing because the item has already been removed from the UI
        } else {
          // Revert the UI state by adding the removed item back
          setFavoriteBooks((prevBooks) => [
            ...prevBooks,
            findBookById(removeBookId),
          ]);
        }
      })
      .catch((error) => {
        console.error('Error removing book from favorites:', error);
        // Revert the UI state by adding the removed item back
        setFavoriteBooks((prevBooks) => [
          ...prevBooks,
          findBookById(removeBookId),
        ]);
      });

    setIsRemoveModalOpen(false);
  };

  // Helper function to find a book by ID
  const findBookById = (id) => {
    return favoriteBooks.find((book) => book._id === id);
  };

  return (
    <div className='mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-10'>
      <h3 className='text-xl font-semibold mb-2 text-black'>
        {isLoading ? <Skeleton width={120} /> : `My Wishlist`}
      </h3>
      <p>
        {isLoading ? (
          <Skeleton width={310} />
        ) : (
          `You have ${favoriteBooks.length} book(s) in your wishlist`
        )}
      </p>
      <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {favoriteBooks.map((book) => (
          <div key={book._id} className='group relative'>
            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80'>
              {isLoading ? (
                <Skeleton width={'100%'} height={'100%'} />
              ) : (
                <Link to={`/book/${book._id}`}>
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className='h-full w-full object-cover lg:h-full lg:w-full'
                  />
                </Link>
              )}
            </div>
            <div className='mt-4 flex justify-between'>
              <div>
                {isLoading ? (
                  <Skeleton width={120} />
                ) : (
                  <Link to={`/book/${book._id}`}>
                    <h3 className='text-sm text-gray-700'>{book.title}</h3>
                  </Link>
                )}
              </div>
              {isLoading ? (
                <Skeleton width={50} />
              ) : (
                <p className='text-sm font-medium text-gray-900'>
                  ${book.price}
                </p>
              )}
            </div>
            <div className='flex items-center mt-5'>
              <button
                className='bg-gray-100 p-1 w-full text-center rounded-lg hover:bg-gray-300 cursor-pointer'
                onClick={() => openRemoveModal(book._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {isRemoveModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-lg shadow-xl max-w-md w-full'>
            <div className='p-4 backdrop-blur-lg rounded-lg'>
              <h2 className='text-xl font-semibold mb-4'>
                Remove Book from Favorites
              </h2>
              <p className='mb-4'>
                Are you sure you want to remove this book from your favorites?
              </p>
              <div className='flex justify-center space-x-4'>
                <button
                  className='text-gray-700 hover:text-red-700 text-sm font-semibold'
                  onClick={() => {
                    removeBook();
                    closeRemoveModal();
                  }}
                >
                  Confirm
                </button>
                <button
                  className='text-gray-700 hover:text-green-500 text-sm font-semibold'
                  onClick={closeRemoveModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorite;
