/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearToken } from '../../utils/Token';
import CartCounter from '../../components/Cart/CartCounter';

const Header = ({ setSearchResults }) => {
  // State and Hooks
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const validToken = window.localStorage.getItem('userInfo');
  const isLoggedIn = !!validToken;
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  // Handlers
  const handleSearch = (searchTerm) => {
    fetch(`${apiBaseDomain}/books/find/${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.data);
      })
      .catch((error) => {
        console.error('Error searching for books:', error);
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
      method: 'POST',
    }).then(() => {
      clearToken();
      navigate('/signin');
    });
  }

  return (
    <header>
      <nav className='bg-white border-gray-200'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link to='/' className='flex items-center'>
            <img
              src='https://cdn3d.iconscout.com/3d/free/thumb/free-book-4573596-3802605.png'
              className='h-8 mr-3'
              alt='LeafLine Logo'
            />
            <span className='self-center text-3xl font-extrabold whitespace-nowrap '>
              LeafLine
            </span>
          </Link>

          <div className='flex items-center md:order-2'>
            {isLoggedIn && (
              <>
                <div className='text-3xl'>
                  <Link to='/cart' className='relative'>
                    <CartCounter />
                  </Link>
                </div>
                <button
                  type='button'
                  className='flex mr-3 text-sm  rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 '
                  id='user-menu-button'
                  aria-expanded='false'
                  data-dropdown-toggle='user-dropdown'
                  data-dropdown-placement='bottom'
                >
                  <span className='sr-only'>Open user menu</span>

                  <img
                    className='w-8 h-8 rounded-full'
                    src='https://avatars.githubusercontent.com/u/62835101?v=4'
                    alt='user photo'
                  />
                </button>
              </>
            )}
            {/* Dropdown menu */}
            <div
              className='z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow'
              id='user-dropdown'
            >
              <div className='px-4 py-3'>
                <span className='block text-sm text-gray-900 font-semibold'>
                  <Link to='/profile'>Hossain Chisty</Link>
                </span>
                <span className='block text-sm  text-gray-500 truncate'>
                  hossain.chisty11@gmail.com
                </span>
              </div>
              <ul className='py-2' aria-labelledby='user-menu-button'>
                <li>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700   '
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700   '
                  >
                    Settings
                  </a>
                </li>

                <li>
                  <button
                    onClick={logout}
                    className='block px-4 py-2 text-sm text-gray-700   '
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
            {!isLoggedIn && (
              <div className='ml-2'>
                <Link
                  to='/signup'
                  className='m-2 py-2 px-4 rounded-md duration-200 border-b border-gray-100  text-black hide-on-small-screen'
                >
                  Sign Up
                </Link>

                <Link
                  to='/signin'
                  className='m-2 py-2 px-4 rounded-md duration-200 border-b border-gray-100  text-black hide-on-small-screen'
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
        {location.pathname === '/' && (
          <div className='mt-5 md:flex md:items-center md:justify-center'>
            <input
              type='text'
              placeholder='Search for books, authors...'
              className='w-50 md:w-64 bg-gray-200 border border-gray-300 rounded-full pl-6 pr-4 py-2 focus:outline-none focus:bg-white text-black'
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  setSearchResults: PropTypes.func.isRequired,
};

export default Header;
