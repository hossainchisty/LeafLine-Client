/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import BookList from "./components/Book/BookList";
import Profile from "./components/Profile/Profile";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import EmailVerification from "./components/Verification/EmailVerification";
import BookDetails from "./components/Book/BookDetails";
import Cart from "./components/Cart/Cart";
import Favorite from "./components/Favorite/Favorite";

function App() {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${apiBaseDomain}/books/list`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.data.books);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, []);

  return (
    <div>
      <Header setSearchResults={setSearchResults} />
      <div className="container mx-auto p-4">
        <Routes>
          {/* Route related to book searching and browsing */}
          <Route
            path="/"
            element={
              <BookList
                books={searchResults.length > 0 ? searchResults : books}
              />
            }
          />

          {/* Route related to authentication */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />

          {/* Route related to user profile */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wish-list" element={<Favorite />} />
          <Route path="/book/:title" element={<BookDetails books={books} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
