import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const AddBook = () => {
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    thumbnail: "",
    price: "",
    featured: false,
    rating: "",
  });
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the data to send to the backend
    const bookData = {
      title: formData.title,
      author: formData.author,
      thumbnail: formData.thumbnail,
      price: formData.price,
      featured: formData.featured,
      rating: formData.rating,
    };

    // Send a POST request to your backend API endpoint
    fetch(`${apiBaseDomain}/books/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(":", data);
        if (data.status === 201) {
          toast.success("Book added successfully.");
          setRedirect(true);
        }
        // Clear the form or perform any other necessary actions after adding the book
        setFormData({
          title: "",
          author: "",
          thumbnail: "",
          price: "",
          featured: false,
          rating: "",
        });
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.error("Error adding book:", error);
      });
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="bg-white rounded-lg shadow-lg p-4 w-80">
        <h2 className="text-1xl font-semibold mb-4">Create a New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title <span className="text-red-600 text-lg font-bold">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-600"
            >
              Author <span className="text-red-600 text-lg font-bold">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-600"
            >
              Thumbnail Link{" "}
              <span className="text-red-600 text-lg font-bold">*</span>
            </label>
            <input
              type="text"
              id="thumbnail"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price <span className="text-red-600 text-lg font-bold">*</span>
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-600"
            >
              Rating
              {/* <span className="text-red-600 text-lg font-bold">*</span> */}
            </label>
            <input
              type="text"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="featured"
              className="block text-sm font-medium text-gray-600"
            >
              Featured
              {/* <span className="text-red-600 text-lg font-bold">*</span> */}
            </label>
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="mt-1 p-2 w-4 border rounded-md focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded-md"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
