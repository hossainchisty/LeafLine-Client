import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../../shared/LoadingIndicator';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;
  const getToken = localStorage.getItem('userInfo');
  const token = getToken ? getToken.replace(/["']/g, '') : '';

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://127.0.0.1:8000/api/v1/order/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((orders) => {
        setOrders(orders.data.orders);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apiBaseDomain, token]);

  const formatPlacedOn = (timestamp) => {
    const createdAt = new Date(timestamp);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `Placed on ${createdAt.getDate()} ${
      months[createdAt.getMonth()]
    } ${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
  };

  return (
    <>
      <div className='bg-white rounded-md w-full'>
        <div className='flex items-center justify-between'>
          <h2 className='text-gray-600 font-semibold'>My Orders</h2>
        </div>

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'
            >
              {order.books.map((book, bookIndex) => (
                <div
                  key={bookIndex}
                  className='inline-block min-w-full shadow rounded-lg overflow-hidden'
                >
                  <table className='min-w-full leading-normal'>
                    <tbody>
                      <tr>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                          <div className='flex items-center'>
                            <div className='flex-shrink-0 w-10 h-11'>
                              <img
                                className='w-full h-full'
                                src={book.bookId.thumbnail}
                                alt={book.bookId.title}
                              />
                            </div>
                            <div className='ml-3'>
                              <p className='text-cyan-500 whitespace-no-wrap'>
                                <Link to={'/'}>{order.orderId}</Link>
                              </p>
                              <p className='text-gray-600 whitespace-no-wrap'>
                                {formatPlacedOn(order.createdAt)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                          <p className='text-gray-600 whitespace-no-wrap'>
                            Qty:
                            <span className='text-black'> {book.quantity}</span>
                          </p>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                          <p className='text-gray-900 whitespace-no-wrap'>
                            {book.bookId.title}
                          </p>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                          <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                            <span
                              aria-hidden=''
                              className='absolute inset-0 bg-gray-200 opacity-50 rounded-full'
                            />
                            <span className='relative'>{order.status}</span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))
        )}
        <div className='px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between'>
          <span className='text-xs xs:text-sm text-gray-900'>
            Showing 1 to 4 of 50 Entries
          </span>
          <div className='inline-flex mt-2 xs:mt-0'>
            <button className='text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l'>
              Prev
            </button>
            &nbsp; &nbsp;
            <button className='text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r'>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
