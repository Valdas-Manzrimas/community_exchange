import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from '../../Base/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { logout, AuthState } from '../../../store/slices/authSlice';
import { clearUser, User } from '../../../store/slices/userSlice';
import { AlertState } from '../../../store/slices/alertSlice';
import Alert from '../Alert';

interface RootState {
  persisted: {
    auth: AuthState;
    user: User;
  };
  alert: AlertState;
}

const ResponsiveHeader: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.persisted.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.persisted.user);
  const alert = useSelector((state: RootState) => state.alert);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleOptionClick = (option: string) => {
    if (option === 'Logout') {
      dispatch(logout());
      dispatch(clearUser());
    }
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        showMenu &&
        !(event.target as HTMLElement).closest('[name="hamburger"]')
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
  }, [navRef, showMenu]);

  const active = (path: string) => {
    return location.pathname === path
      ? 'border-secondary text-secondary'
      : 'border-primary text-white';
  };

  return (
    <div className='sticky top-0 transition-all duration-500'>
      <header className='w-full bg-primary justify-between flex items-center px-4 py-3 z-50'>
        <div className='flex items-center justify-self-start'>
          <div>
            <Link to='/' onClick={() => showMenu && toggleMenu}>
              <span className='text-gray-50 font-semibold font-serif text-4xl tracking-tight'>
                Barter
              </span>
            </Link>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='header-action-icon-2'>
            <Link
              to='/shop-wishlist'
              className='flex items-center'
              onClick={() => showMenu && toggleMenu}
            >
              <img
                alt='Wishlist'
                src='./assets/imgs/theme/icons/icon-heart.svg'
                className='w-7 m-2 text-white'
              />
              <span className='pro-count white'>{/*totalWishlistItems*/}</span>
            </Link>
          </div>
          <div className='header-action-icon-2'>
            <Link
              to='/shop-cart'
              className='flex items-center'
              onClick={() => showMenu && toggleMenu}
            >
              <img
                alt='Orders'
                src='./assets/imgs/theme/icons/icon-cart.svg'
                className='w-7 m-2 text-white'
              />
              <span className='pro-count white'>{/*totalCartItems*/}</span>
            </Link>
          </div>
          <div className='w-7 m-2 text-primary' />
          <div className='w-7 m-2 text-primary'>
            <button
              type='button'
              className={`block text-gray hover:text-light focus:text-light focus:outline-none `}
              onClick={toggleMenu}
              name='hamburger'
            >
              <svg className='h-6 w-6 fill-current' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'
                />
              </svg>
            </button>
          </div>
        </div>
        {/* side menu */}
      </header>
      <nav
        ref={navRef}
        className={`fixed top-0 flex flex-col justify-between right-0 h-full w-56 bg-primary transition-all duration-300 ease-in-out border-l-primary ${
          showMenu ? `translate-x-0 visible` : 'translate-x-full not-visible'
        }`}
      >
        <div className='flex flex-col items-center mt-28'>
          <div className='px-2 py-2'>
            <Link
              onClick={toggleMenu}
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
              onClick={toggleMenu}
              to='/about'
              className={`block px-2 py-1 text-primary border-b-2 font-semibold hover:transition-color hover:duration-500 hover:ease-in-out hover:text-primary-dark ${active(
                '/about'
              )}`}
            >
              About
            </Link>
          </div>
          {isAuthenticated && (
            <div className='px-2 py-2'>
              <Link
                onClick={toggleMenu}
                to='/my-products'
                className={`block px-2 py-1 text-white border-b-2 font-semibold hover:transition-color hover:duration-500 hover:ease-in-out hover:text-gray-100 ${active(
                  '/my-products'
                )}`}
              >
                My Products
              </Link>
            </div>
          )}
          <div className='px-2 py-2'>
            <Link
              onClick={toggleMenu}
              to='/contact'
              className={`block px-2 py-1 text-white border-b-2 font-semibold hover:transition-color hover:duration-500 hover:ease-in-out hover:text-gray-100 ${active(
                '/contact'
              )}`}
            >
              Contact
            </Link>
          </div>
        </div>

        <div className='flex flex-col items-center mb-10'>
          <Dropdown
            buttonText='English'
            options={['English', 'Lithuanian']}
            buttonStyles='inline-flex w-full justify-center gap-x-1.5  px-3 py-2 text-sm font-semibold text-white'
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
              <Link
                to='/login-register'
                className='text-sm text-white'
                onClick={toggleMenu}
              >
                Log In / Sign Up
              </Link>
            )}
          </div>
        </div>
      </nav>
      {alert.message && (
        <div className='relative top-0 left-0 -z-10'>
          <Alert type={alert.status} message={alert.message} />
        </div>
      )}
    </div>
  );
};

export default ResponsiveHeader;
