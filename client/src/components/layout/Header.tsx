import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from '../Base/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

interface RootState {
  isAuthenticated: boolean;
}

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuthenticated
  );

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const active = (path: string) => {
    return location.pathname === path ? 'border-primary' : 'border-light';
  };

  const handleOptionClick = (option: string) => {
    if (option === 'Logout') {
      dispatch(logout());
    }
  };

  return (
    <>
      <div className='header-top header-top-ptb-1 hidden md:block bg-narvik-200 py-1'>
        <div className='flex items-center justify-between mx-6'>
          <div id='news-flash' className='inline-block'>
            <ul>
              <li>App is still in development. Please check back later.</li>
            </ul>
          </div>
          <div className='header-info header-info-right flex align-center'>
            <Dropdown
              buttonText='English'
              options={['English', 'Lithuanian']}
              buttonStyles='inline-flex w-full justify-center gap-x-1.5  px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50'
              replaceButtonText
            />
            <div className='flex items-center'>
              {isAuthenticated ? (
                <Dropdown
                  buttonText='User'
                  replaceButtonText={false}
                  onOptionClick={handleOptionClick}
                  options={['Profile', 'Settings', `Logout`]}
                />
              ) : (
                <Link to='/login-register' className='text-sm'>
                  Log In / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <header className='w-full bg-narvik-100 sm:justify-between sm:flex sm:items-center sm:px-4 sm:py-3'>
        <div className='flex items-center justify-self-start px-4 py-3 sm:p-0'>
          <div>
            <Link to='/'>
              <span className='text-primary font-semibold font-serif text-4xl tracking-tight'>
                Barter
              </span>
            </Link>
          </div>
          <div className='sm:hidden'>
            <button
              type='button'
              className='block text-gray-500 hover:text-light focus:text-light focus:outline-none'
              onClick={toggleMenu}
            >
              <svg className='h-6 w-6 fill-current' viewBox='0 0 24 24'>
                <path
                  fillRule='evenodd'
                  d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'
                />
              </svg>
            </button>
          </div>
        </div>
        <nav
          className={`sm:flex sm:items-center justify-self-center sm:w-auto ${
            showMenu ? 'block' : 'hidden'
          }`}
        >
          <div className='px-2 py-2'>
            <Link
              to='/'
              className={`block px-2 py-1 text-primary border-b-2 font-semibold hover:transition-color hover:duration-500 hover:ease-in-out hover:text-primary-dark ${active(
                '/'
              )}`}
            >
              Home
            </Link>
          </div>
          <div className='px-2 py-2'>
            <Link
              to='/about'
              className={`block px-2 py-1 text-primary border-b-2 font-semibold hover:transition-color hover:duration-500 hover:ease-in-out hover:text-primary-dark ${active(
                '/about'
              )}`}
            >
              About
            </Link>
          </div>
          <div className='px-2 py-2'>
            <Link
              to='/contact'
              className={`block px-2 py-1 text-primary border-b-2 font-semibold hover:transition-color hover:duration-500 hover:ease-in-out hover:text-primary-dark ${active(
                '/contact'
              )}`}
            >
              Contact
            </Link>
          </div>
        </nav>
        <div className='hidden sm:flex sm:items-center sm:w-auto'>
          <div className='header-action-icon-2'>
            <Link to='/shop-wishlist' className='flex items-center'>
              <img
                alt='Wishlist'
                src='./assets/imgs/theme/icons/icon-heart.svg'
                className='w-7 m-2 text-primary'
              />
              <span className='pro-count white'>{/*totalWishlistItems*/}</span>
            </Link>
          </div>
          <div className='header-action-icon-2'>
            <Link to='/shop-cart' className='flex items-center'>
              <img
                alt='Orders'
                src='./assets/imgs/theme/icons/icon-cart.svg'
                className='w-7 m-2 text-primary'
              />
              <span className='pro-count white'>{/*totalCartItems*/}</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
