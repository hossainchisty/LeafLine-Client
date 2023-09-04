/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BookList from "./components/BookList";
import Profile from "./components/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AddBook from "./pages/Admin/AddBook";
import AdminStore from "./pages/Admin/AdminStore";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUsers";
import BookDetails from "./pages/BookDetails";
import Cart from "./components/Cart";

function App() {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;
  // Initialize cart state with data from local storage or an empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Fetch book data and set it to the books state
    fetch(`${apiBaseDomain}/books/list`)
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
      <Header setSearchResults={setSearchResults} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <BookList
                books={searchResults.length > 0 ? searchResults : books}
              />
            }
          />

          <Route path="/:title" element={<BookDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AddBook />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/books" element={<AdminStore />} />
        </Routes>
      </div>
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
}

export default App;
