import Skeleton from 'react-loading-skeleton';

const BookDetailsSkeleton = () => {
  return (
    <div className='p-4 md:p-8'>
      <div className='flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden'>
        <div className='w-full md:w-64 h-64 object-cover'>
          <Skeleton height={256} />
        </div>
        <div className='flex flex-col md:ml-4 p-4 space-y-4 w-full'>
          <h1 className='text-2xl font-semibold'>
            <Skeleton width={200} />
          </h1>
          <div className='flex items-center space-x-2'>
            <div className='flex items-center'>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Skeleton key={index} width={20} height={20} className='mr-1' />
              ))}
              <Skeleton width={50} />
            </div>
          </div>
          <p className='text-gray-600'>
            <Skeleton width={100} />
          </p>
          <p className='text-blue-600 font-semibold text-xl'>
            <Skeleton width={50} />
          </p>
          <div className='flex items-left'>
            <Skeleton width={20} height={20} className='mr-2' />
            <div className='text-black font-semibold'>
              <Skeleton width={50} />
            </div>
          </div>
          <div>
            <Skeleton count={3.7} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsSkeleton;
