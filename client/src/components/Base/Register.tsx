import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  };

  return (
    <section className=' w-3/4'>
      <div className='w-full bg-narvik-200 rounded-lg shadow border'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-dark md:text-2xl'>
            Create an account
          </h1>
          <form className='space-y-2 md:space-y-3' onSubmit={handleSubmit}>
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
