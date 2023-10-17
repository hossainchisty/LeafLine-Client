const Patrons = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='max-w-sm p-8 bg-white'>
        <h1 className='text-2xl font-bold mb-6'>Become a Patron</h1>
        <p className='text-gray-700 mb-6'>
          <span className='text-blue-600 font-semibold'>LeafLine</span> is – and
          always will be – free to use. We truly believe that more people
          reading more books is a good thing for the world we live in and are
          working hard to make that happen.
        </p>
        <p className='text-gray-700 mb-4'>
          If you want to support us on this mission, please consider becoming a
          Patron. Your contribution will help us run the servers, pay
          collaborators and build an even better platform for all of us.
        </p>
        <div className='flex mb-2'>
          <button className='bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-2'>
            $5/month
          </button>
          <button className='bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-2'>
            $10/month
          </button>
          <button className='bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded'>
            $20/month
          </button>
        </div>
        <p className='text-gray-700'>
          Much love, <br />
          The LeafLine team
        </p>
        <div className='flex items-center mt-4'>
          <img
            src='https://avatars.githubusercontent.com/u/62835101?v=4'
            alt='Team Member 1'
            className='w-10 h-10 rounded-full mr-2'
          />
        </div>
      </div>
    </div>
  );
};

export default Patrons;
