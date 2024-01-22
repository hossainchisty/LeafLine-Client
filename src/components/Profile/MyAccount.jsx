import { useState } from 'react';
import Orders from './Orders';
import Refunds from './Refunds';
import Review from './Review';
import Returns from './Returns';
import Cancellation from './Cancellation';

const MyAccount = () => {
  const [selectedOption, setSelectedOption] = useState('orders');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'orders':
        return <Orders />;
      case 'refunds':
        return <Refunds />;
      case 'reviews':
        return <Review />;
      case 'returns':
        return <Returns />;
      case 'cancellation':
        return <Cancellation />;
      default:
        return null;
    }
  };

  return (
    <div className='flex'>
      <div className='mb-5 overflow-hidden rounded border border-border-200 bg-light px-10 py-8'>
        <h2 className='text-lg font-semibold mb-4'>My Account</h2>
        <ul className='space-y-2'>
          <li
            onClick={() => handleOptionClick('orders')}
            className={
              selectedOption === 'orders'
                ? 'font-bold text-green-600'
                : 'font-semibold text-gray-700'
            }
          >
            My Orders
          </li>

          <li
            onClick={() => handleOptionClick('reviews')}
            className={
              selectedOption === 'reviews'
                ? 'font-bold text-green-600'
                : 'font-semibold text-gray-700'
            }
          >
            My Reviews
          </li>
          <li
            onClick={() => handleOptionClick('returns')}
            className={
              selectedOption === 'returns'
                ? 'font-bold text-green-600'
                : 'font-semibold text-gray-700'
            }
          >
            My Returns
          </li>
          <li
            onClick={() => handleOptionClick('refunds')}
            className={
              selectedOption === 'refunds'
                ? 'font-bold text-green-600'
                : 'font-semibold text-gray-700'
            }
          >
            My Refunds
          </li>
          <li
            onClick={() => handleOptionClick('cancellation')}
            className={
              selectedOption === 'cancellation'
                ? 'font-bold text-green-600'
                : 'font-semibold text-gray-700'
            }
          >
            My Cancellation
          </li>
        </ul>
      </div>
      <div className='w-3/4 p-6'>{renderContent()}</div>
    </div>
  );
};

export default MyAccount;
