import Skeleton from 'react-loading-skeleton';

const reviews = [
  {
    name: 'Maria Smantha',
    role: 'Web Developer',
    imageSrc: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).jpg',
    reviewText:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic.',
    rating: 5,
  },
  {
    name: 'Lisa Cudrow',
    role: 'Graphic Designer',
    imageSrc: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).jpg',
    reviewText:
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid commodi.',
    rating: 4,
  },
  {
    name: 'John Smith',
    role: 'Marketing Specialist',
    imageSrc: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).jpg',
    reviewText:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.',
    rating: 5,
  },
];

const Review = () => {
  return (
    <>
      {/* Container for demo purpose */}
      <div className='container my-24 mx-auto md:px-6'>
        <section className='mb-32 text-left'>
          <h2 className='mb-12 text-3xl font-bold'>Reviews</h2>
          <div className='grid gap-x-6 md:grid-cols-3 lg:gap-x-12'>
            {reviews.map((review, index) => (
              <div key={index} className='mb-12 md:mb-0'>
                <div className='mb-6 flex justify-center'>
                  <img
                    src={review.imageSrc}
                    className='w-32 rounded-full shadow-lg dark:shadow-black/20'
                    alt={`Avatar of ${review.name}`}
                  />
                </div>
                <h5 className='mb-2 text-lg font-bold'>
                  {review.name || <Skeleton width={150} />}
                </h5>
                <h6 className='mb-4 font-medium text-primary dark:text-primary-400'>
                  {review.role || <Skeleton width={80} />}
                </h6>
                <p className='mb-4'>
                  {review.reviewText || <Skeleton width={320} count={3.5} />}
                </p>
                <ul className='mb-0 flex justify-center'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <li key={star}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 96 960 960'
                        className={`w-5 text-warning ${
                          star <= review.rating
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
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* Container for demo purpose */}
    </>
  );
};

export default Review;
