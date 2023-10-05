import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const Review = ({ reviews }) => {
  return (
    <div className='container my-24 mx-auto md:px-6'>
      <section className='mb-32 text-left'>
        <h2 className='mb-12 text-3xl font-bold'>Reviews</h2>
        <div className='grid gap-x-6 md:grid-cols-3 lg:gap-x-12'>
          {reviews.map((review, index) => (
            <div key={index} className='mb-12 md:mb-0'>
              <div className='mb-6 flex justify-center'>
                {review.user && review.user.avatar ? (
                  <img
                    src={review.user.avatar}
                    className='w-32 rounded-full shadow-lg dark:shadow-black/20'
                    alt={`Avatar of ${review.user.full_name}`}
                  />
                ) : (
                  <Skeleton circle width={128} height={128} />
                )}
              </div>
              <h5 className='mb-2 text-lg font-bold'>
                {review.user.full_name || <Skeleton width={150} />}
              </h5>
              <p className='mb-4'>
                {review.comment || <Skeleton width={320} count={1.5} />}
              </p>
              <ul className='mb-0 flex justify-center'>
                {review.rating
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <li key={index}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 96 960 960'
                          className={`w-5 text-warning ${
                            index + 1 <= review.rating
                              ? 'text-warning'
                              : 'text-gray-400'
                          }`}
                        >
                          <path
                            fill='currentColor'
                            d='m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z'
                          />
                        </svg>
                      </li>
                    ))
                  : Array.from({ length: 5 }).map((_, index) => (
                      <li key={index}>
                        <Skeleton width={20} height={20} />
                      </li>
                    ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

Review.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        avatar: PropTypes.string,
        full_name: PropTypes.string,
      }),
      comment: PropTypes.string,
      rating: PropTypes.number,
    })
  ).isRequired,
};

export default Review;
