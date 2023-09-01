import React from 'react';
import Book from './Book';

const BookList = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {books.map((book, index) => (
        <Book
          key={index}
          book={book}
        />
      ))}
    </div>
  );
};

export default BookList;

