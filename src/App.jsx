import React from "react";
import Profile from "./components/Profile";
import BookList from "./components/BookList";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { Routes, Route } from "react-router-dom";

const books = [
  {
    id: 1,
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    thumbnail:
      "https://m.media-amazon.com/images/I/51Ga5GuElyL._SX331_BO1,204,203,200_.jpg",
    price: 12.99,
    rating: 4, // Assuming a rating on a scale of 1 to 5
    featured: true,
  },
  {
    id: 2,

    name: "The Last Thing He Told Me: A Novel",
    author: "Laura Dave",
    thumbnail:
      "https://m.media-amazon.com/images/P/1501171348.01._SCLZZZZZZZ_SX500_.jpg",
    price: 14.99,
    rating: 5,
    featured: false,
  },
  {
    id: 3,
    name: "To Kill a Mockingbird",
    author: "Harper Lee",
    thumbnail:
      "https://i.pinimg.com/564x/21/63/cf/2163cf27d786817ce45c09a0d25c886e.jpg",
    price: 10.99,
    rating: 4,
    featured: true,
  },
  {
    id: 4,
    name: "The Catcher in the Rye",
    author: "J.D. Salinger",
    thumbnail:
      "https://m.media-amazon.com/images/P/1501171348.01._SCLZZZZZZZ_SX500_.jpg",
    price: 11.99,
    rating: 2,
    featured: false,
  },
];

function App() {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<BookList books={books} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
