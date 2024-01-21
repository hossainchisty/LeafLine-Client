import PropTypes from 'prop-types';
import Book from './Book';
import SearchResults from '../../components/Book/Search/SearchResults';

import { useState } from 'react';

const BookList = ({ books, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='container mx-auto'>
      <>
        {/* Hero */}
        <div className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-5'>
          {/* Grid */}
          <div className='grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center'>
            <div>
              <h1 className='block text-3xl font-bold text-black sm:text-4xl lg:text-6xl lg:leading-tight'>
                Start your journey with Best Place to Find Your
                <span className='text-yellow-500 m-2'>Favorite Books</span>
              </h1>

              {/* Search bar */}
              <div className=' max-w-full lg:flex hidden '>
                {location.pathname === '/' && (
                  <div className='relative my-4 flex w-full'>
                    <input
                      type='text'
                      placeholder='Search for books, authors...'
                      className='w-1/2 md:w-64 bg-gray-200 border border-gray-300 rounded-full pl-6 pr-4 py-2 focus:outline-none focus:bg-white text-black'
                      value={searchTerm}
                      onChange={handleChange}
                    />
                    <div className='absolute z-10 w-full py-6 my-10'>
                      <SearchResults searchTerm={searchTerm} />
                    </div>
                  </div>
                )}
              </div>
              {/* End Search bar */}
            </div>
            {/* End Col */}
            <div className='relative ms-4'>
              <img
                className='w-full rounded-md'
                src='https://images.hiverhq.com/blog/wp-content/uploads/2023/09/tr:h-360,w-362,pr-true,cm-pad_resize,bg-FFF4F6/Best-Knowledge-Base-Article-Templates-For-Every-Business.png'
                alt='Image Description'
              />
              <div className='absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 w-full h-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6 dark:from-slate-800 dark:via-slate-900/0 dark:to-slate-900/0' />
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
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
        {/* End Hero */}
      </>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default BookList;
