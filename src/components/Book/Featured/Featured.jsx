import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const Featured = ({ featured, isLoading }) => {
  if (isLoading && featured) {
    return (
      <div className='absolute top-0 right-0 px-2 py-1 rounded-full text-sm font-semibold'>
        <Skeleton width={60} height={20} />
      </div>
    );
  }

  if (featured) {
    return (
      <div className='absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold'>
        Featured
      </div>
    );
  }

  return null;
};

Featured.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  featured: PropTypes.bool.isRequired,
};

export default Featured;
