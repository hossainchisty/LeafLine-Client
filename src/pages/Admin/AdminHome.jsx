import { Link } from "react-router-dom";
function AdminHome() {
  console.log('Admin Home');
  return <div>
    <h3>Admin Home</h3>
    <div>
    <aside className="w-64 p-4 bg-gray-200">
      <nav>
        <ul>
          <li>
            <Link to="/admin" className="block py-2">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/users" className="block py-2">
              Users
            </Link>
          </li>
          {/* Add more admin navigation links as needed */}
        </ul>
      </nav>
    </aside>
    </div>
  </div>;
}

export default AdminHome;
