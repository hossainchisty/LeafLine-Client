/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ setSearchResults }) => {
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [cartCount, setCartCount] = useState(0);

  const handleSearch = (searchTerm) => {
    fetch(`${apiBaseDomain}/books/book/search?title=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.books);
        setSearchResults(data.data.books);
      })
      .catch((error) => {
        console.error("Error searching for books:", error);
      });
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  const handleChange = (e) => {
    // Update the searchTerm state when the user types in the input field
    setSearchTerm(e.target.value);
  };

  return (
    <header className="p-4 bg-white text-black">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://cdn3d.iconscout.com/3d/free/thumb/free-book-4573596-3802605.png"
            alt="LeafLink Logo"
            className="h-9 w-9"
          />
          <Link to="/" className="text-3xl font-extrabold ml-2">
            LeafLine
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/profile">
            <div className="relative">
              <img
                src="https://avatars.githubusercontent.com/u/62835101?v=4"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </Link>
          <div className="ml-2">
            <Link to="/signup" className="text-gray-600 font-semibold">
              Sign Up
            </Link>
            <span className="mx-1">|</span>
            <Link to="/signin" className="text-gray-600 font-semibold">
              Sign In
            </Link>
            <span className="mx-1">|</span>
            <Link to="/admin" className="text-gray-600 font-semibold">
              Admin
            </Link>
          </div>

          <div className="flex items-center space-x-2">
          <Link to="/cart">
            {/* Cart Icon (you can use an icon library like Font Awesome) */}
            <div className="relative">
              <svg
                // Add your cart icon SVG or Font Awesome code here
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                {/* Cart icon SVG */}
              </svg>
              {cartCount > 0 && (
                <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 rounded-full w-6 h-6 text-white flex items-center justify-center text-sm">
                  {cartCount}
                </div>
              )}
            </div>
          </Link>
          {/* ... (other code) */}
        </div>
        </div>
      </div>
      {/* Responsive Search Input (conditionally rendered) */}
      {location.pathname === "/" && (
        <div className="mt-3 md:flex md:items-center md:justify-center">
          <input
            type="text"
            placeholder="Search books..."
            className="w-full md:w-64 bg-gray-200 border border-gray-300 rounded-full pl-6 pr-4 py-2 focus:outline-none focus:bg-white text-black"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  setSearchResults: PropTypes.func.isRequired,
};

export default Header;
