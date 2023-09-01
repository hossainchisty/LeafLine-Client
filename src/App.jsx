import React from 'react';
import Header from './components/Header';
import BookList from './components/BookList';

// Updated book data with the specified fields
const books = [
  {
    id: 1,
    name: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    thumbnail: 'https://m.media-amazon.com/images/I/51Ga5GuElyL._SX331_BO1,204,203,200_.jpg', // Replace with a real image URL
    price: 12.99,
    rating: 4, // Assuming a rating on a scale of 1 to 5
    featured: true,
  },
  {
    id: 2,
    
    name: 'The Last Thing He Told Me: A Novel',
    author: 'Laura Dave',
    thumbnail: 'https://m.media-amazon.com/images/P/1501171348.01._SCLZZZZZZZ_SX500_.jpg', // Replace with a real image URL
    price: 14.99,
    rating: 5,
    featured: false,
  },
  {
    id: 3,
    name: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    thumbnail: 'https://i.pinimg.com/564x/21/63/cf/2163cf27d786817ce45c09a0d25c886e.jpg', // Replace with a real image URL
    price: 10.99,
    rating: 4,
    featured: true,
  },
  {
    id: 4,
    name: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    thumbnail: 'https://m.media-amazon.com/images/P/1501171348.01._SCLZZZZZZZ_SX500_.jpg', // Replace with a real image URL
    price: 11.99,
    rating: 3,
    featured: false,
  },
  // Add more books here with real data and images if needed
];

function App() {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="mt-5 mb-5 text-xl font-bold">Book List</h2>
        <BookList books={books} />
      </div>
    </div>
  );
}

export default App;


