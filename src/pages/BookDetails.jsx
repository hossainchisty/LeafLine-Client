/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { title } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBaseDomain}/books/${title}`)
      .then((response) => response.json())
      .then((bookInfo) => {
        setBook(bookInfo.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      })
      .finally(() => {
        setLoading(false); // Done loading
      });

  }, [title]);



  if (!book) {
    return <div>{loading && (
      <div className="loading-container">
        <ClipLoader color={"rgba(106, 89, 187, 0.888)"} loading={loading} size={120} />
      </div>
    )}</div>;
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <img
            alt={book.title}
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={book.thumbnail}
            style={{ maxHeight: "500px" }} // Limit image height
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {book.title}
            </h1>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {book.author}
            </h2>
            <div className="flex mb-4">
              <span className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <svg
                    key={index}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className={`w-4 h-4 text-${
                      index < book.rating ? "red" : "gray"
                    }-500`}
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                ))}
                <span className="text-gray-600 ml-3">{book.rating} Reviews</span>
              </span>
              {/* Add your social icons here */}
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a className="ml-2 text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
              seitan poutine tumeric. Gastropub blue bottle austin listicle
              pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.
            </p>

            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                BDT {book.price}
              </span>
              {/* <button
            onClick={addToCart}
            className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded"
          >
            Add to Cart
          </button> */}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
