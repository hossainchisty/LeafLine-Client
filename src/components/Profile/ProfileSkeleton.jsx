import Skeleton from 'react-loading-skeleton';

const ProfileSkeleton = () => {
  return (
    <div>
      <div className='flex justify-center mb-4'>
        <Skeleton circle width={128} height={128} />
      </div>
      <h2 className='text-3xl font-bold text-center mb-2'>
        <div className='flex items-center justify-center'>
          <Skeleton width={100} height={20} />
        </div>
        <p className='text-gray-700 text-sm font-thin from-neutral-500 mb-10'>
          <Skeleton width={200} />
        </p>
      </h2>
    </div>
  );
};

export default ProfileSkeleton;
