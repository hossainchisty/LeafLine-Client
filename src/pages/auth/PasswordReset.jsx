/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { storeToken } from '../../utils/Token';

const PasswordReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiBaseDomain}/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const userData = await response.json();
        storeToken(userData.data.token);
        // dispatch(setUserInfo(userData));
        navigate('/'); // Redirect to the home page
      } else if (response.status === 403) {
        toast.error("You're not verified, please verify your email address.");
      } else if (response.status === 429) {
        toast.error('Too many requests, please try again later.', {
          icon: '🛑',
        });
      } else {
        toast.error('The email or password you entered is incorrect.');
      }
    } catch (error) {
      toast.error('An error occurred while logging in.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-10'>
      <div className='bg-white rounded-lg shadow-lg p-4 w-80'>
        <h2 className='text-1xl font-semibold mb-4'>
          Enter your email we'll send you a link to get back into your account.
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-600'
            >
              Email
              <span className='text-red-600 text-lg font-bold'>*</span>
            </label>
            <input
              type='email'
              id='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format',
                },
              })}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md'
              required
            />
            <div className='text-red-600 text-sm'>
              {errors.email && errors.email.message}
            </div>
          </div>

          <div className='text-center'>
            <button
              type='submit'
              className='bg-gray-800 text-white px-4 py-2 rounded-md'
            >
              Send login link
            </button>
          </div>
        </form>
        <div className='flex justify-center mt-8'>
          <Link to='/signin' className='text-black'>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
