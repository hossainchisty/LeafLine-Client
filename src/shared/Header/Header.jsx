/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearToken } from "../../utils/Token";
import CartCounter from "../../components/Cart/CartCounter";

const Header = ({ setSearchResults }) => {
  // State and Hooks
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const validToken = window.localStorage.getItem("userInfo");
  const isLoggedIn = !!validToken;
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  // Handlers
  const handleSearch = (searchTerm) => {
    fetch(
      `${apiBaseDomain}/books/book/search?title=${searchTerm}&author=${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => {
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

  function logout() {
    fetch(`${apiBaseDomain}/users/logout`, {
      method: "POST",
    }).then(() => {
      clearToken();
      navigate("/signin");
    });
  }

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
        {isLoggedIn && (
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
            <div className="text-3xl">
              <Link to="/cart" className="relative">
                <CartCounter />
              </Link>
            </div>
            <div className="ml-2">
              <button
                onClick={logout}
                className="text-white bg-orange-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 m-2 mr-2 focus:outline-none"
              >
                Log out
              </button>
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <div className="ml-2">
            <Link
              to="/signup"
              className="m-2 py-2 px-4 rounded-md duration-200 border-b border-gray-100 hover:bg-gray-100 text-black hide-on-small-screen"
            >
              Sign Up
            </Link>

            <Link
              to="/signin"
              className="m-2 py-2 px-4 rounded-md duration-200 border-b border-gray-100 hover:bg-gray-100 text-black hide-on-small-screen"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
      {/* Responsive Search Input (conditionally rendered) */}
      {location.pathname === "/" && (
        <div className="mt-3 md:flex md:items-center md:justify-center">
          <input
            type="text"
            placeholder="Search for books, authors..."
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
