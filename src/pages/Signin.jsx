/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-in logic here, such as sending the data to a backend server
    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="bg-white rounded-lg shadow-lg p-4 w-80">
        <h2 className="text-1xl font-semibold mb-4">👋 Welcome</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
              <span className="text-red-600 text-lg font-bold">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
              <span className="text-red-600 text-lg font-bold">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end mt-4 mb-4">
            <Link to="/signup" className="text-black">
              Forgot Password?
            </Link>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded-md"
            >
              Sign In
            </button>
            <div className="flex justify-center mt-4">
              <Link to="/signup" className="text-black">
                Don't have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
