/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { storeToken } from '../../utils/Token';
import { validateEmail, validatePassword } from '../../utils/Validation';

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Client-side validation
      if (!validateEmail(data.email)) {
        toast.error('Invalid email format');
        return;
      }

      if (!validatePassword(data.password)) {
        toast.error('Password must be at least 4 characters long');
        return;
      }

      const response = await fetch(`${apiBaseDomain}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const userData = await response.json();
        storeToken(userData.data.token);
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
        <h2 className='text-1xl font-semibold mb-4'>👋 Welcome</h2>
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
              className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
              required
            />
            <div className='text-red-600 text-sm'>
              {errors.email && errors.email.message}
            </div>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-600'
            >
              Password
              <span className='text-red-600 text-lg font-bold'>*</span>
            </label>
            <input
              type='password'
              id='password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 4,
                  message: 'Password must be at least 4 characters long',
                },
              })}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
              required
            />
            <div className='text-red-600 text-sm'>
              {errors.password && errors.password.message}
            </div>
          </div>
          <div className='flex justify-end mt-4 mb-4'>
            <Link to='/forget-password' className='text-black'>
              Forgot Password?
            </Link>
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='bg-gray-800 text-white px-4 py-2 rounded-md'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing...' : 'Sign In'}
            </button>
            <div className='flex justify-center mt-4'>
              <Link to='/signup' className='text-black'>
                Don't have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
