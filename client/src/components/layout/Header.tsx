import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const active = (path: string) => {
    return location.pathname === path ? 'border-primary' : 'border-light';
  };

  return (
    <>
      <div className='header-top header-top-ptb-1 hidden lg:block'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <div className='header-info'>
              <ul className='flex'>
                <li className='mr-6'>
                  <i className='fi-rs-smartphone'></i>
                  <Link to='/#'>
                    <a>(+01) - 2345 - 6789</a>
                  </Link>
                </li>
                <li>
                  <i className='fi-rs-marker'></i>
                  <Link to='/page-contact'>
                    <a>Our location</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='text-center'>
              <div id='news-flash' className='inline-block'>
                <ul>
                  <li>
                    Get great devices up to 50% off
                    <Link to='/products/shop-grid-right'>
                      <a> View details</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='header-info header-info-right'>
              <ul className='flex'>
                <li className='relative mr-6'>
                  <Link to='/#'>
                    <a className='language-dropdown-active flex items-center'>
                      <i className='fi-rs-world mr-2'></i>
                      English
                      <i className='fi-rs-angle-small-down ml-2'></i>
                    </a>
                  </Link>
                  <ul className='language-dropdown absolute top-full left-0 mt-2 py-2 bg-white rounded-lg shadow-lg z-10 hidden'>
                    <li>
                      <Link to='/#'>
                        <a className='flex items-center'>
                          <img
                            src='/assets/imgs/theme/flag-lt.png'
                            alt=''
                            className='w-4 h-4 mr-2'
                          />
                          Lietuvių
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <i className='fi-rs-user'></i>
                  <Link to='/page-login-register'>
                    <a>Log In / Sign Up</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <header className='w-full bg-light sm:justify-between sm:flex sm:items-center sm:px-4 sm:py-3'>
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
            <Link to='/shop-wishlist'>
              <a className='flex items-center'>
                <img
                  alt='Wishlist'
                  src='./assets/imgs/theme/icons/icon-heart.svg'
                  className='w-7 m-2 text-primary'
                />
                <span className='pro-count white'>
                  {/*totalWishlistItems*/}
                </span>
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
        </div>
      </header>
    </>
  );
};

export default Header;
