/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { formatISO9075 } from "date-fns";

function AdminStore() {
  const [books, setBooks] = useState([]);
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${apiBaseDomain}/books/list`)
      .then((response) => response.json())
      .then((bookInfo) => {
        setBooks(bookInfo.data.books);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, []);

  return (
    <div className="flex flex-col m-5 pt-5">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thumbnail
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  featured
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex-shrink-0 h-20 w-20">
                      <img
                        className="h-full w-full object-contain"
                        src={book.thumbnail}
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.price}</div>
                  </td>{" "}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.featured ? "Yes✔": "No❌"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatISO9075(new Date(book.createdAt))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </button>
                    <button className="ml-2 text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminStore;
