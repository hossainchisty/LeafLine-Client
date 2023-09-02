import { Link } from "react-router-dom";

const Header = () => {
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
            <Link
              to="/signup"
              className="text-gray-600 font-semibold"
            >
              Sign Up
            </Link>
            <span className="mx-1">|</span>
            <Link
              to="/signin"
              className="text-gray-600 font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      {/* Responsive Search Input */}
      <div className="mt-3 md:flex md:items-center md:justify-center">
        <input
          type="text"
          placeholder="Search books..."
          className="w-full md:w-64 bg-gray-200 border border-gray-300 rounded-full pl-6 pr-4 py-2 focus:outline-none focus:bg-white text-black"
        />
      </div>
    </header>
  );
};

export default Header;
