import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (userInfo) => {
    const response = await fetch('http://localhost:3010/profile', {
      method: 'put',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    (async function () {
      const response = await fetch('http://localhost:3010/profile', {
        method: 'get',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
    })();
  }, []);

  return (
    <div className='flex flex-col h-full items-center bg-gray-200 text-gray-700'>
      <div className='flex items-center mt-12 mb-12'>
        <h1 className='text-6xl font-thin tracking-wider'>Profile</h1>
      </div>
      <div className='flex flex-col gap-6'>
        <form className='w-72'>
          {/* <div className='mb-4'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Your email*
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
          </div> */}

          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Your name*
            </label>
            <input
              {...register('name', {
                required: 'Name is required',
              })}
              type='text'
              id='name'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Name'
            />
            <p className='text-sm'>{errors.name?.message}</p>
          </div>

          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Description
            </label>
            <textarea
              {...register('description', {
                maxLength: {
                  value: 600,
                  message: 'Max length of 600 characters is reached',
                },
              })}
              type='text'
              id='description'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Description'
            />
            <p className='text-sm'>{errors.description?.message}</p>
          </div>

          {localStorage.getItem('userType') === 'student' ? (
            <>
              <div className='mb-4'>
                <label
                  htmlFor='yearOfStudy'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  Year of study
                </label>
                <input
                  {...register('yearOfStudy', {
                    min: {
                      value: 1,
                      message: 'Invalid number',
                    },
                    max: {
                      value: 12,
                      message: 'Invalid number',
                    },
                  })}
                  type='number'
                  min={1}
                  max={12}
                  id='yearOfStudy'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Year of study'
                />
                <p className='text-sm'>{errors.yearOfStudy?.message}</p>
              </div>
            </>
          ) : (
            <>
              <div className='mb-4'>
                <label
                  htmlFor='subject'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  Subject you teach*
                </label>
                <input
                  {...register('subject', {
                    required: 'Subject is required',
                  })}
                  type='text'
                  id='subject'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Subject'
                />
                <p className='text-sm'>{errors.subject?.message}</p>
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='city'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  Your city*
                </label>
                <input
                  {...register('city', {
                    required: 'City is required',
                  })}
                  type='text'
                  id='city'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='City'
                />
                <p className='text-sm'>{errors.city?.message}</p>
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='maxNoOfStudents'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  Max number of students
                </label>
                <input
                  {...register('maxNoOfStudents', {
                    min: {
                      value: 1,
                      message: 'Invalid number',
                    },
                  })}
                  min={1}
                  type='number'
                  id='maxNoOfStudents'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Max number of students'
                />
                <p className='text-sm'>{errors.maxNoOfStudents?.message}</p>
              </div>
            </>
          )}

          <div className='mb-4'>
            <label
              htmlFor='availableRemote'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Available Remote
            </label>
            <input
              {...register('availableRemote')}
              type='checkbox'
              id='availableRemote'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
            <p className='text-sm'>{errors.availableRemote?.message}</p>
          </div>

          <div className='flex justify-center'>
            <button
              onClick={handleSubmit(onSubmit)}
              type='submit'
              className='text-white w-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Save changes
            </button>
            <Link
              to='/login'
              className='underline mt-2 block text-right text-gray-700 hover:text-black'
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
