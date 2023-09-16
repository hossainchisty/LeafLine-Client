/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BookList from "./components/BookList";
import Profile from "./components/Profile";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import AddBook from "./pages/Admin/AddBook";
import AdminStore from "./pages/Admin/AdminStore";
import AdminDashboard from "./components/Admin/AdminDashboard";
import EmailVerification from "./components/Auth/EmailVerification";
import AdminUsers from "./pages/Admin/AdminUsers";

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

          {/* Route related to admin panel */}
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AddBook />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/books" element={<AdminStore />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
