import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ResponsiveHeader: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const active = (path: string) => {
    return location.pathname === path ? 'border-primary' : 'border-light';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef]);

  return (
    <header className='w-full bg-light justify-between flex items-center px-4 py-3 md:px-4 md:py-3 z-50'>
      <div className='flex items-center justify-self-start'>
        <div>
          <Link to='/'>
            <span className='text-primary font-semibold font-serif text-4xl tracking-tight'>
              Barter
            </span>
          </Link>
        </div>
      </div>
      <div className='flex items-center justify-self-end'>
        <div className='header-action-icon-2'>
          <Link to='/shop-wishlist'>
            <a className='flex items-center'>
              <img
                alt='Wishlist'
                src='./assets/imgs/theme/icons/icon-heart.svg'
                className='w-7 m-2 text-primary'
              />
              <span className='pro-count white'>{/*totalWishlistItems*/}</span>
            </a>
          </Link>
        </div>
        <div className='header-action-icon-2'>
          <Link to='/shop-cart'>
            <a className='flex items-center'>
              <img
                alt='Orders'
                src='./assets/imgs/theme/icons/icon-cart.svg'
                className='w-7 m-2 text-primary'
              />
              <span className='pro-count white'>{/*totalCartItems*/}</span>
            </a>
          </Link>
        </div>
        <div className='md:hidden'>
          <button
            type='button'
            className={`block text-gray-500 hover:text-light focus:text-light focus:outline-none ${
              showMenu ? 'text-primary' : ''
            }`}
            onClick={toggleMenu}
            name='hamburger'
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
        ref={navRef}
        className={`md:hidden absolute top-0 left-0 h-full w-56 bg-light transition-all duration-300 ease-in-out -z-10 ${
          showMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex flex-col items-center justify-center h-full'>
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
        </div>
      </nav>
    </header>
  );
};

export default ResponsiveHeader;
