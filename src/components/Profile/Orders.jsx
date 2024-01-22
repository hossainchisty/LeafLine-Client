const Orders = () => {
  return (
    <>
      <div className='bg-white rounded-md w-full'>
        <div className=' flex items-center justify-between'>
          <h2 className='text-gray-600 font-semibold'>My Orders</h2>
        </div>

        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <tbody>
                <tr>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 w-10 h-10'>
                        <img
                          className='w-full h-full'
                          src='https://static-01.daraz.com.bd/p/d05f21dce31238958f4b188d70c1163a.jpg'
                          alt=''
                        />
                      </div>
                      <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                          Premium Quality Winter Cloths Storage Organizer Bag /
                          Eco Friendly Wardrobe Organizer
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>Qty: 1</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      Estimated Delivery By Tue 16 Jan - Sun 21 Jan
                    </p>
                  </td>
                  {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>43</p>
                  </td> */}
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                      <span
                        aria-hidden=''
                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                      />
                      <span className='relative'>Shipped</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          '>
              <span className='text-xs xs:text-sm text-gray-900'>
                Showing 1 to 4 of 50 Entries
              </span>
              <div className='inline-flex mt-2 xs:mt-0'>
                <button className='text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l'>
                  Prev
                </button>
                &nbsp; &nbsp;
                <button className='text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r'>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
