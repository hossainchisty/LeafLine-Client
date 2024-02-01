/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { registerUser } from '../../services/authService';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmittedEmail(data);
    try {
      const response = await registerUser(data);

      if (response.success) {
        toast.success(
          'Registration successful. Check your inbox for verification.'
        );
        setIsEmailSent(true);
      } else {
        toast.error(response.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error(
        'An error occurred during registration. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-10 '>
      <div className='bg-white rounded-lg shadow-lg p-4 w-80'>
        {isEmailSent ? ( // Render a message if the email has been sent
          <div>
            <h2 className='text-2xl font-semibold mb-4'>
              Thank you for signing up for LeafLine
            </h2>
            <div className='mb-4 text-gray-600'>
              We've sent you an email to verify your email address.
              <span className='text-black font-semibold'>
                {submittedEmail.email}
              </span>
              .
            </div>
          </div>
        ) : (
          // Render the form if the email hasn't been sent yet
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className='text-1xl font-semibold mb-4'>
              👋 Let's Create a New Account.
            </h2>
            <div className='mb-4'>
              <label
                htmlFor='full_name'
                className='block text-sm font-medium text-gray-600'
              >
                Full Name
                <span className='text-red-600 text-lg font-bold'>*</span>
              </label>
              <input
                type='text'
                id='full_name'
                {...register('full_name', {
                  required: true,
                  maxLength: 50, // Maximum length of 50 characters
                })}
                className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                required
              />
              {errors.full_name && errors.full_name.type === 'required' && (
                <span className='text-red-600 text-sm'>
                  Full Name is required
                </span>
              )}
              {errors.full_name && errors.full_name.type === 'maxLength' && (
                <span className='text-red-600 text-sm'>
                  Full Name is too long (max 50 characters)
                </span>
              )}
            </div>
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
                  required: true,
                  pattern: /^\S+@\S+$/i, // Email format validation
                })}
                className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                required
              />
              {errors.email && errors.email.type === 'required' && (
                <span className='text-red-600 text-sm'>Email is required</span>
              )}
              {errors.email && errors.email.type === 'pattern' && (
                <span className='text-red-600 text-sm'>
                  Invalid email format
                </span>
              )}
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
                  required: true,
                  minLength: 4, // Minimum password length of 4 characters
                })}
                className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                required
              />
              {errors.password && errors.password.type === 'required' && (
                <span className='text-red-600 text-sm'>
                  Password is required
                </span>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <span className='text-red-600 text-sm'>
                  Password must be at least 4 characters long
                </span>
              )}
            </div>
            <div className='text-center'>
              <button
                type='submit'
                className='bg-gray-800 text-white px-4 py-2 rounded-md'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
              <div className='flex justify-center mt-4'>
                <Link to='/signin' className='text-black'>
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
