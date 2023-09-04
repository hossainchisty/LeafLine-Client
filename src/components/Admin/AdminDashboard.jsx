import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const totalBooks = 1000;
  const totalUsers = 500;
  const featuredBooks = 250;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">Admin Dashboard</h1>
      {/* Admin Navigation */}
      <nav className="mb-4">
        <ul className="flex justify-end space-x-4">
          <li>
            <Link
              to="/admin/users"
              className="inline-block px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-800 transition duration-300 ease-in-out"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/books"
              className="inline-block px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-800 transition duration-300 ease-in-out"
            >
              Books
            </Link>
          </li>
          <li>
            <Link
              to="/admin/add"
              className="inline-block px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-800 transition duration-300 ease-in-out"
            >
              Add Book
            </Link>
          </li>
        </ul>
      </nav>
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Analytics Card 1: Total Books */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Books</h3>
          <p className="text-3xl font-bold text-blue-500">{totalBooks}</p>
        </div>

        {/* Analytics Card 2: Total Users */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-green-500">{totalUsers}</p>
        </div>

        {/* Analytics Card 3: Featured Books */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Featured Books</h3>
          <p className="text-3xl font-bold text-yellow-500">{featuredBooks}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
