/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Process = () => {
  const [favoriteBooks, setFavoriteBooks] = useState({
    currentlyReading: [],
    toRead: [],
    read: [],
  });
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  const getToken = localStorage.getItem('userInfo');
  const token = getToken ? getToken.replace(/["']/g, '') : '';

  useEffect(() => {
    fetch(`${apiBaseDomain}/books/list`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((readStatus) => {
        // Categorize books based on reading status
        const categorizedBooks = {
          currentlyReading: readStatus.data.books.filter(
            (book) =>
              book.readingStatus.trim().toLowerCase() === 'currently reading'
          ),
          toRead: readStatus.data.books.filter(
            (book) => book.readingStatus.trim().toLowerCase() === 'to read'
          ),
          read: readStatus.data.books.filter(
            (book) => book.readingStatus.trim().toLowerCase() === 'read'
          ),
        };
        setFavoriteBooks(categorizedBooks);
      })
      .catch((error) => {
        console.error('Error fetching favorite books:', error);
      });
  }, [token]);

  const renderBooks = (books) => {
    return (
      <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {books.map((book) => (
          <div key={book._id} className='relative flex flex-col group'>
            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80'>
              <Link to={`/book/${book._id}`}>
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className='h-full w-full object-cover lg:h-full lg:w-full'
                />
              </Link>
            </div>
            <div className='mt-4 flex justify-between items-center'>
              <div>
                <Link to={`/book/${book._id}`}>
                  <h3 className='text-sm text-gray-700'>{book.title}</h3>
                </Link>
              </div>
              {/* Dropdown menu */}
              <div className='absolute right-0 mt-2 bg-white shadow-lg rounded-md hidden group-hover:block'>
                <div className='py-1'>
                  <button className='block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 w-full text-right'>
                    Want to Read
                  </button>
                  <button className='block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 w-full text-right'>
                    Currently Reading
                  </button>
                  <button className='block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 w-full text-right'>
                    Finished
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8'>
      <div className='text-xl font-semibold mb-2 text-black'>
        Currently Reading
      </div>
      {favoriteBooks.currentlyReading.length > 0 ? (
        <div>
          <p>
            You have {favoriteBooks.currentlyReading.length} book(s) in your
            Currently Reading List
          </p>
          {renderBooks(favoriteBooks.currentlyReading)}
        </div>
      ) : (
        <p className='border bg-slate-100 py-10 text-center font-semibold'>
          No books added yet
        </p>
      )}

      <div className='text-xl font-semibold mb-2 text-black mt-10'>
        Want to read
      </div>
      {favoriteBooks.toRead.length > 0 ? (
        <div>
          <p>
            You have {favoriteBooks.toRead.length} book(s) in your To Read List
          </p>
          {renderBooks(favoriteBooks.toRead)}
        </div>
      ) : (
        <p className='border bg-slate-100 py-10 text-center font-semibold'>
          No books added yet
        </p>
      )}

      <div className='text-xl font-semibold mb-2 text-black mt-10'>
        Finished
      </div>
      {favoriteBooks.read.length > 0 ? (
        <div>
          <p>You have {favoriteBooks.read.length} book(s) in your Read List</p>
          {renderBooks(favoriteBooks.read)}
        </div>
      ) : (
        <p className='border bg-slate-100 py-10 text-center font-semibold'>
          No books added yet
        </p>
      )}
    </div>
  );
};

export default Process;
