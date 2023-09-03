import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BookList from "./components/BookList";
import Profile from "./components/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch book data and set it to the books state
    fetch("http://localhost:8000/api/v1/books/list")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.books);
        setBooks(data.data.books);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, []);

  return (
    <div>
      <Header setSearchResults={setSearchResults} /> {/* Pass setSearchResults */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<BookList books={searchResults.length > 0 ? searchResults : books} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
