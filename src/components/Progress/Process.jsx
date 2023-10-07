/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

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
          <div key={book._id} className='group relative'>
            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80'>
              <img
                src={book.thumbnail}
                alt={book.title}
                className='h-full w-full object-cover lg:h-full lg:w-full'
              />
            </div>
            <div className='mt-4 flex justify-between'>
              <div>
                <h3 className='text-sm text-gray-700'>{book.title}</h3>
              </div>
            </div>
            <div className='flex items-center mt-5'>
              <button className='bg-gray-100 p-1 w-full text-center rounded-lg hover:bg-gray-300 cursor-pointer'>
                Remove
              </button>
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
      <p>
        You have {favoriteBooks.currentlyReading.length} book(s) in your
        Currently Reading List
      </p>
      {renderBooks(favoriteBooks.currentlyReading)}

      <div className='text-xl font-semibold mb-2 text-black mt-10'>To Read</div>
      <p>You have {favoriteBooks.toRead.length} book(s) in your To Read List</p>
      {renderBooks(favoriteBooks.toRead)}

      <div className='text-xl font-semibold mb-2 text-black mt-10'>Read</div>
      <p>You have {favoriteBooks.read.length} book(s) in your Read List</p>
      {renderBooks(favoriteBooks.read)}
    </div>
  );
};

export default Process;
