import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (credentials, userType) => {
    const response = await fetch('http://localhost:3010/register', {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userType, email: credentials.email, password: credentials.password }),
    });
    console.log(response);
    if (response.ok) {
      localStorage.setItem('userType', userType);
    }
    const data = await response.json();
    console.log(data);
  };
  return (
    <div className='flex flex-col h-full items-center bg-gray-200 text-gray-700'>
      <div className='flex items-center mt-12 mb-48'>
        <h1 className='text-6xl font-thin tracking-wider'>Register your account</h1>
      </div>
      <div className='flex flex-col gap-6'>
        <form className='w-72'>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Your email
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
                },
              })}
              type='email'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Email'
            />
            <p className='text-sm'>{errors.email?.message}</p>
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Your password
            </label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password length must be at least 6',
                },
              })}
              type='password'
              id='password'
              placeholder='Password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
            <p className='text-sm'>{errors.password?.message}</p>
          </div>
          <div className='mb-8'>
            <input
              {...register('confirmPassword', {
                required: 'Password is required',
                validate: (val) => {
                  if (watch('password') !== val) {
                    return 'Your passwords do no match';
                  }
                },
              })}
              type='password'
              id='confirmPassword'
              placeholder='Confirm password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
            <p className='text-sm'>{errors.confirmPassword?.message}</p>
          </div>

          <div className='flex justify-between'>
            <button
              onClick={handleSubmit((data) => {
                onSubmit(data, 'student');
              })}
              type='submit'
              className='text-white w-2/5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Register
            </button>
            <button
              onClick={handleSubmit((data) => {
                onSubmit(data, 'professor');
              })}
              type='submit'
              className='text-blue-700 bg-white border-blue-700 border hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Register as Professor
            </button>
          </div>
          <Link
            to='/login'
            className='underline mt-2 block text-right text-gray-700 hover:text-black'
          >
            Already registered? Sign In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
