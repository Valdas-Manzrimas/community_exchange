import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from '../Base/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { logout, AuthState } from '../../store/slices/authSlice';
import { clearUser, User } from '../../store/slices/userSlice';
import { AlertState } from '../../store/slices/alertSlice';
import Alert from './Alert';

interface RootState {
  persisted: {
    auth: AuthState;
    user: User;
  };
  alert: AlertState;
}

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  const dispatch = useDispatch();

  const alert = useSelector((state: RootState) => state.alert);

  const isAuthenticated = useSelector(
    (state: RootState) => state.persisted.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.persisted.user);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const active = (path: string) => {
    return location.pathname === path ? 'border-primary' : 'border-light';
  };

  const handleOptionClick = (option: string) => {
    if (option === 'Logout') {
      dispatch(logout());
      dispatch(clearUser());
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`sticky top-0 transition-all duration-500`}>
      {!isScrolled && alert.message && (
        <Alert type={alert.status} message={alert.message} />
      )}
      <div
        className={`hidden md:block bg-narvik-200 py-1 transition-all duration-1000 `}
      >
        <div className='flex items-center justify-between mx-6'>
          <div id='news-flash' className='inline-block'>
            <span>App is still in development. Please check back later.</span>
          </div>
          <div className='flex align-center'>
            <Dropdown
              buttonText='English'
              options={['English', 'Lithuanian']}
              replaceButtonText
            />
            <div className='flex items-center'>
              {isAuthenticated ? (
                <div className='flex items-center'>
                  <img
                    src='./assets/imgs/icons/circle-user.svg'
                    alt='user'
                    className='w-4'
                  />
                  <Dropdown
                    buttonText={user.firstName}
                    replaceButtonText={false}
                    onOptionClick={handleOptionClick}
                    options={['Profile', 'Settings', `Logout`]}
                  />
                </div>
              ) : (
                <Link to='/login-register' className='text-sm'>
                  Log In / Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <header
        className={` left-0 w-full bg-narvik-100 sm:justify-between sm:flex sm:items-center sm:px-4 sm:py-3`}
      >
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
      {isScrolled && alert.message && (
        <div className='relative top-0 left-0 -z-10'>
          <Alert type={alert.status} message={alert.message} />
        </div>
      )}
    </div>
  );
};

export default Header;
