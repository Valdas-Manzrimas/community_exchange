// file: Register.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/slices/authSlice';
import { setUser } from '../../../store/slices/userSlice';
import { setAlert } from '../../../store/slices/alertSlice';

import { handleErrors } from '../functions/handleErrors';
import { setCommunity } from '../../../store/slices/communitySlice';
import Btn from '../Btn';

const RegisterCommunity = () => {
  const [communityName, setCommunityName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const planName = location.state.planName;
    try {
      const response = await axios.post(
        'http://localhost:8080/api/register/community-user',
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          name: communityName,
          plan: planName,
        },
        { timeout: 10000 } // 10 seconds
      );

      const token = response.data.token;

      if (response.status === 201) {
        dispatch(login(token));

        await dispatch(
          setUser({
            email: email,
            id: response.data.id,
            firstName: firstName,
            lastName: lastName,
            roles: response.data.roles,
            communities: response.data.communities,
          })
        );
        await dispatch(setCommunity(response.data.community));

        await navigate(`/community/${response.data.community}`);

        dispatch(
          setAlert({ status: 'success', message: 'User created successfully' })
        );
      } else {
        dispatch(
          setAlert({
            status: 'error',
            message: `An error occurred while logging in: ${response.status}`,
          })
        );
      }
    } catch (error) {
      console.error(error);
      handleErrors(error, dispatch, {
        400: 'Email is already in use. Please try again with a different email.',
      });
    }
  };

  return (
    <section className='w-full lg:mx-0 flex align-center'>
      <div className='w-full rounded-lg flex justify-center mt-16'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-light md:text-2xl'>
            Create a community and your account
          </h1>
          <form className='space-y-2 md:space-y-3' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='communityName'
                className='block mb-2 text-sm font-medium text-light'
              >
                Community Name
              </label>
              <input
                type='text'
                name='communityName'
                id='communityName'
                className='bg-narvik-100 border border-narvik-300 text-dark sm:text-sm rounded-lg focus:ring-narvik-800 focus:border-narvik-800 block w-full p-2.5'
                placeholder='Community Name'
                required
                onChange={(e) => setCommunityName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-light'
              >
                Your email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='bg-narvik-100 border border-narvik-300 text-dark sm:text-sm rounded-lg focus:ring-narvik-800 focus:border-narvik-800 block w-full p-2.5'
                placeholder='name@community.com'
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='firstName'
                className='block mb-2 text-sm font-medium text-light'
              >
                First name
              </label>
              <input
                type='text'
                name='firstName'
                id='firstName'
                className='bg-narvik-100 border border-narvik-300 text-dark sm:text-sm rounded-lg focus:ring-narvik-800 focus:border-narvik-800 block w-full p-2.5'
                placeholder='Name'
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='lastName'
                className='block mb-2 text-sm font-medium text-light'
              >
                Your surname
              </label>
              <input
                type='text'
                name='lastName'
                id='lastName'
                className='bg-narvik-100 border border-narvik-300 text-dark sm:text-sm rounded-lg focus:ring-narvik-800 focus:border-narvik-800 block w-full p-2.5'
                placeholder='Surname'
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-light'
              >
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='••••••••'
                className='bg-narvik-100 border border-narvik-300 text-dark sm:text-sm rounded-lg focus:ring-narvik-800 focus:border-narvik-800 block w-full p-2.5'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* <button
              type='submit'
              className='w-full text-dark bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
            >
              Create Community
            </button> */}
            <div className='w-full flex items-center justify-center'>
              <Btn
                type='submit'
                style='secondary'
                onClick={() => handleSubmit}
                children='Create Community'
                className='mt-6'
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterCommunity;
