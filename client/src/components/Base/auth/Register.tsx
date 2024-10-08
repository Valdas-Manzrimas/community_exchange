// file: Register.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/slices/authSlice';
import { setUser } from '../../../store/slices/userSlice';
import { setAlert } from '../../../store/slices/alertSlice';

import { handleErrors } from '../functions/handleErrors';
import { setCommunity } from '../../../store/slices/communitySlice';

interface Props {
  invitationEmail?: string;
  community: string;
  invitationToken?: string;
}

const Register = ({ invitationEmail, community, invitationToken }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (invitationEmail) {
      setEmail(invitationEmail);
    }
  }, [invitationEmail]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        !invitationToken
          ? 'http://localhost:8080/api/auth/register'
          : 'http://localhost:8080/api/auth/invitation/register',
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          communities: [community],
          token: invitationToken,
        },
        { timeout: 10000 } // 10 seconds
      );

      const token = response.data.token;

      if (response.status === 201) {
        dispatch(login(token));

        await dispatch(
          setUser({
            email: email,
            id: response.data.user._id,
            firstName: firstName,
            lastName: lastName,
            roles: response.data.user.roles,
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
    <section className='w-full mx-2 max-w-md lg:mx-0 '>
      <div className='w-full bg-white rounded-lg shadow border'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-dark md:text-2xl'>
            Create an account to join the community
          </h1>
          <form className='space-y-2 md:space-y-3' onSubmit={handleSubmit}>
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
                id='email'
                className='bg-narvik-100 border border-narvik-300 text-dark sm:text-sm rounded-lg focus:ring-narvik-800 focus:border-narvik-800 block w-full p-2.5'
                placeholder='name@company.com'
                required
                value={invitationEmail ? invitationEmail : email}
                disabled={!!invitationEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='firstName'
                className='block mb-2 text-sm font-medium text-dark'
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
                className='block mb-2 text-sm font-medium text-dark'
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
                className='block mb-2 text-sm font-medium text-dark'
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

            <button
              type='submit'
              className='w-full text-dark bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
