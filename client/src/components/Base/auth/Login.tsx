import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

import { useDispatch } from 'react-redux';
import { login } from '../../../store/slices/authSlice';
import { setUser } from '../../../store/slices/userSlice';
import { setAlert } from '../../../store/slices/alertSlice';
import { setCommunity } from '../../../store/slices/communitySlice';

import { handleErrors } from '../functions/handleErrors';

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

      if (response.status === 200) {
        dispatch(login(token));

        dispatch(
          setUser({
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            roles: response.data.roles,
            communities: response.data.communities,
          })
        );
        dispatch(setCommunity(response.data.communities[0]));
        navigate(`/community/${response.data.communities[0]}`);
        dispatch(setAlert({ status: 'success', message: 'Login success' }));
      } else {
        dispatch(
          setAlert({
            status: 'error',
            message: `An error occurred while logging in: ${response.status}`,
          })
        );
      }
    } catch (error: unknown) {
      handleErrors(error, dispatch, {
        404: 'User not found. Please check your email and password and try again.',
      });
    }
  };

  return (
    <section className='w-full mx-2 max-w-md lg:mx-0 flex justify-center self-start'>
      <div className='relative w-full shadow'>
        <div className='absolute top-0 left-0 w-full h-full bg-white opacity-40 -z-10 rounded-lg border'></div>
        <div className='p-6'>
          <h1 className='text-xl font-bold leading-tight tracking-tight mb-6 text-center text-gray-200 md:text-2xl'>
            Sign in to your account
          </h1>
          <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-200'
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
                className='block mb-2 text-sm font-medium text-gray-200'
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
                    className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 '
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='remember' className='text-gray-800'>
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href='#'
                className='text-sm font-medium text-primary-600 hover:underline'
              >
                Forgot password?
              </a>
            </div>
            <button
              type='submit'
              className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
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
