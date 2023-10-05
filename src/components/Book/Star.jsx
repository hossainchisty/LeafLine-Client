import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const Star = ({ isLoading }) => {
  if (isLoading) {
    return <Skeleton width={20} height={20} />;
  }

  return (
    <svg viewBox='0 0 20 20' fill='currentColor' className='star'>
      <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
    </svg>
  );
};

Star.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Star;
