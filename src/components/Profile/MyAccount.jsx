import { useState } from 'react';
import Orders from './Orders';
import Questions from './Questions';
import Refunds from './Refunds';
import Reports from './Reports';

const MyAccount = () => {
  const [selectedOption, setSelectedOption] = useState('orders');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'orders':
        return <Orders />;
      case 'questions':
        return <Questions />;
      case 'refunds':
        return <Refunds />;
      case 'reports':
        return <Reports />;
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
            onClick={() => handleOptionClick('questions')}
            className={
              selectedOption === 'questions'
                ? 'font-bold text-green-600'
                : 'font-semibold text-gray-700'
            }
          >
            My Questions
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
            onClick={() => handleOptionClick('reports')}
            className={
              selectedOption === 'reports'
                ? 'font-bold text-green-600'
                : 'font-semibold text-gray-700'
            }
          >
            My Reports
          </li>
        </ul>
      </div>
      <div className='w-3/4 p-6'>{renderContent()}</div>
    </div>
  );
};

export default MyAccount;
