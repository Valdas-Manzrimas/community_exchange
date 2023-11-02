import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      // Handle response here. For example:
      if (response.status === 200) {
        dispatch(login(token));
        navigate('/');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
    }
  };

  return (
    <section className='w-full mx-2 max-w-md lg:mx-0 flex justify-center self-start'>
      <div className='w-full bg-white rounded-lg shadow border'>
        <div className='p-6'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-dark md:text-2xl'>
            Sign in to your account
          </h1>
          <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-dark'
              >
                Your email
              </label>
              <input
                type='email'
                name='email'
                className='bg-narvik-100 border border-narvik-300 text-dark sm:text-sm rounded-lg focus:ring-narvik-800 focus:border-narvik-800 block w-full p-2.5'
                placeholder='name@company.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-dark'
              >
                Password
              </label>
              <input
                type='password'
                name='password'
                placeholder='••••••••'
                className='bg-narvik-100 border border-narvik-300 text-dark sm:text-sm rounded-lg focus:ring-narvik-800 focus:border-narvik-800 block w-full p-2.5'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='remember'
                    aria-describedby='remember'
                    type='checkbox'
                    className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label
                    htmlFor='remember'
                    className='text-gray-500 dark:text-gray-300'
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href='#'
                className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                Forgot password?
              </a>
            </div>
            <button
              type='submit'
              className='w-full text-dark bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
