import React from "react";
import Book from "./Book";

const BookList = ({ books }) => {
  return (
    <div>
      <h2 className="mt-5 mb-5 text-xl font-bold">Book List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <Book key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
