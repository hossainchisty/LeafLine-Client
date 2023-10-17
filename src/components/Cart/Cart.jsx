/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useCartItemCount } from '../../context/CartItemCountContext';
import { Link } from 'react-router-dom';
import cartEmpty from '/public/icon_empty_cart.png';

const Cart = () => {
  const getToken = localStorage.getItem('userInfo');
  const token = getToken ? getToken.replace(/["']/g, '') : '';
  const { decrementItemCount } = useCartItemCount();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Initialize total price
  const [subTotal, setSubTotal] = useState(0); // Initialize sub total
  const [shippingFees, setShippingFees] = useState(0); // Initialize shipping fees
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${apiBaseDomain}/cart/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((cartInfo) => {
        const bookData = cartInfo.data[0].items.map((cartItem) => ({
          bookId: cartItem.book._id,
          title: cartItem.book.title,
          thumbnail: cartItem.book.thumbnail,
          quantity: cartItem.quantity,
          shippingFees: cartItem.shippingFees,
          subTotal: cartItem.subTotal,
          totalPrice: cartItem.totalPrice,
        }));

        // Calculate total price, sub total, and shipping fees
        const calculatedTotalPrice = bookData.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
        const calculatedSubTotal = bookData.reduce(
          (total, item) => total + item.subTotal,
          0
        );
        const calculatedShippingFees = bookData.reduce(
          (total, item) => total + item.shippingFees,
          0
        );

        setCartItems(bookData);
        setTotalPrice(calculatedTotalPrice);
        setSubTotal(calculatedSubTotal);
        setShippingFees(calculatedShippingFees);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, [token]);

  const handleRemoveItem = (bookId) => {
    fetch(`${apiBaseDomain}/cart/remove/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        const updatedCartItems = cartItems.filter(
          (item) => item.bookId !== bookId
        );
        decrementItemCount();
        setCartItems(updatedCartItems);
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });
  };

  const handleQuantityChange = (bookId, newQuantity) => {
    // Update the quantity in the cartItems state
    const updatedCartItems = cartItems.map((item) => {
      if (item.bookId === bookId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  return (
    <div className='h-screen mt-10 flex justify-center items-start'>
      {cartItems.length === 0 ? (
        <div className='flex flex-col items-center'>
          <div className='mb-5'>
            <img src={cartEmpty} alt='Empty cart' />
          </div>
          <h2 className='text-3xl font-bold'>Your Cart is Empty!</h2>
          <p className='text-gray-700 mt-3'>
            Looks like you haven't made an order yet.
          </p>
          <div className='mt-5'>
            <Link to='/' className='text-blue-500'>
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className='mx-auto max-w-5xl flex-grow px-6 flex flex-col md:flex-row'>
          {/* Cart Items (Left Side) */}
          <div className='md:w-2/3 pr-6'>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className='mb-6 rounded-lg bg-white p-6 shadow-md flex items-center justify-between'
              >
                <div className='flex items-center'>
                  <img
                    src={item.thumbnail}
                    alt='product-image'
                    className='w-24 h-24 rounded-lg mr-4'
                  />
                  <div>
                    <h2 className='text-lg font-bold text-gray-900'>
                      {item.title}
                    </h2>
                    <div className='mt-4 flex items-center space-x-4'>
                      <div className='flex items-center border-gray-100'>
                        <span
                          className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50'
                          onClick={() => {
                            // Decrease quantity when the "-" button is clicked
                            if (item.quantity > 1) {
                              handleQuantityChange(
                                item.bookId,
                                item.quantity - 1
                              );
                            }
                          }}
                        >
                          {' '}
                          -{' '}
                        </span>
                        <input
                          className='h-8 w-8 border bg-white text-center text-xs outline-none'
                          type='number'
                          value={item.quantity}
                          min={1}
                          onChange={(e) => {
                            // Update quantity when the input value changes
                            const newQuantity = parseInt(e.target.value, 10);
                            if (!isNaN(newQuantity) && newQuantity >= 1) {
                              handleQuantityChange(item.bookId, newQuantity);
                            }
                          }}
                        />
                        <span
                          className='cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50'
                          onClick={() => {
                            // Increase quantity when the "+" button is clicked
                            handleQuantityChange(
                              item.bookId,
                              item.quantity + 1
                            );
                          }}
                        >
                          {' '}
                          +{' '}
                        </span>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <p className='text-sm'>BDT {item.price}</p>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
                          onClick={() => handleRemoveItem(item.bookId)}
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Section (Right Side) */}
          <div className='md:w-1/3'>
            <div className='rounded-lg border bg-white p-6 shadow-md'>
              <div className='flex justify-between'>
                <p className='text-lg font-bold'>Total</p>
                <div className=''>
                  <p className='mb-1 text-lg font-bold'>
                    BDT {totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm'>Subtotal:</p>
                <p className='text-sm'>BDT {subTotal.toFixed(2)}</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm'>Shipping Fees:</p>
                <p className='text-sm'>BDT {shippingFees.toFixed(2)}</p>
              </div>
              <hr className='my-4' />
              <div className='mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white text-center'>
                <Link to='/place-order/'>Check out</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
