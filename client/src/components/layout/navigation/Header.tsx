import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from '../../Base/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { clearUser } from '../../../store/slices/userSlice';
import { clearCommunity } from '../../../store/slices/communitySlice';
import { RootState } from '../../../store';
import Alert from '../Alert';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  // const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useSelector((state: RootState) => state.alert);
  const id = useSelector((state: RootState) => state.persisted.community);

  const isAuthenticated = useSelector(
    (state: RootState) => state.persisted.auth.isAuthenticated
  );
  // const user = useSelector((state: RootState) => state.persisted.user);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const active = (path: string) => {
    return location.pathname === path
      ? 'border-secondary text-secondary'
      : 'border-primary text-white';
  };

  const handleOptionClick = (option: string) => {
    if (option === 'Logout') {
      dispatch(logout());
      dispatch(clearUser());
      dispatch(clearCommunity());
      navigate('/');
    }
  };

  return (
    <div className={`sticky top-0 transition-all duration-500 z-50`}>
      {alert.message && <Alert type={alert.status} message={alert.message} />}

      <header
        className={` left-0 w-full bg-primary sm:justify-between sm:flex sm:items-center sm:px-4 sm:py-3`}
      >
        <div className='flex items-center justify-self-start px-4 py-3 sm:p-0'>
          <div>
            <Link to='/'>
              <span className='text-white font-semibold font-serif text-4xl tracking-tight'>
                Barter
              </span>
            </Link>
          </div>
          {/* hamburger */}
          <div className='sm:hidden'>
            <button
              type='button'
              className='block text-gray-100 hover:text-white focus:text-white focus:outline-none'
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
              className={`block px-2 py-1 border-b-2 font-semibold hover:transition-color hover:duration-500 hover:ease-in-out hover:text-secondary ${active(
                '/'
              )}`}
            >
              Home
            </Link>
          </div>
          <div className='px-2 py-2'>
            <Link
              to='/about'
              className={`block px-2 py-1 text-white border-b-2 font-semibold hover:transition-color hover:duration-500 hover:ease-in-out hover:text-secondary ${active(
                '/about'
              )}`}
            >
              About
            </Link>
          </div>
          {isAuthenticated && (
            <div className='px-2 py-2'>
              <Link
                to={`/community/${id}`}
                className={`block px-2 py-1 text-white border-b-2 font-semibold hover:transition-color hover:duration-500 hover:ease-in-out hover:text-secondary ${active(
                  `/community/${id}`
                )}`}
              >
                Community
              </Link>
            </div>
          )}
          <div className='px-2 py-2'>
            <Link
              to='/contact-us'
              className={`block px-2 py-1 text-white border-b-2 font-semibold hover:transition-color hover:duration-500 hover:ease-in-out hover:text-secondary ${active(
                '/contact-us'
              )}`}
            >
              Contact
            </Link>
          </div>
        </nav>
        <div className='hidden sm:flex sm:items-center sm:w-auto'>
          <div className='flex items-center'>
            {isAuthenticated && (
              <>
                <div className='text-secondary'>
                  <Link
                    to='/wishlist'
                    className='flex '
                    onClick={() => showMenu && toggleMenu}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className={`w-6 h-6 transition duration-7 ${active(
                        '/wishlist'
                      )}`}
                    >
                      <title>121 heart</title>
                      <g id='_01_align_center' data-name='01 align center'>
                        <path d='M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917ZM12,20.846c-3.253-2.43-10-8.4-10-12.879a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,7.967h2a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,7.967C22,12.448,15.253,18.416,12,20.846Z' />
                      </g>
                    </svg>
                    <span className='pro-count white'>
                      {/*totalWishlistItems*/}
                    </span>
                  </Link>
                </div>
                <div className='text-secondary'>
                  <Link
                    to='/order-cart'
                    className='flex items-center ml-3'
                    onClick={() => showMenu && toggleMenu}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className={`w-6 h-6 transition duration-7 ${active(
                        '/order-cart'
                      )}`}
                    >
                      <title>109 shopping bag</title>
                      <g id='_01_align_center' data-name='01 align center'>
                        <path d='M18,6A6,6,0,0,0,6,6H0V21a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V6ZM12,2a4,4,0,0,1,4,4H8A4,4,0,0,1,12,2ZM22,21a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V8H6v2H8V8h8v2h2V8h4Z' />
                      </g>
                    </svg>
                    <span className='pro-count white'>
                      {/*totalCartItems*/}
                    </span>
                  </Link>
                </div>
                <div className='flex items-center'>
                  <Dropdown
                    buttonText={
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        id='Layer_1'
                        data-name='Layer 1'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-6 h-6 ml-2 fill-current text-white'
                      >
                        <path d='m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm-5,21.797v-.797c0-2.757,2.243-5,5-5s5,2.243,5,5v.797c-1.501.769-3.201,1.203-5,1.203s-3.499-.434-5-1.203Zm11-.582v-.215c0-3.309-2.691-6-6-6s-6,2.691-6,6v.215c-3.008-1.965-5-5.362-5-9.215C1,5.935,5.935,1,12,1s11,4.935,11,11c0,3.853-1.992,7.25-5,9.215ZM12,5c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4Zm0,7c-1.654,0-3-1.346-3-3s1.346-3,3-3,3,1.346,3,3-1.346,3-3,3Z' />
                      </svg>
                    }
                    replaceButtonText={false}
                    onOptionClick={handleOptionClick}
                    options={['Profile', 'Settings', `Logout`]}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      {/* <div className='fixed inset-x-0 top-14 h-24 pointer-events-none bg-gradient-to-t from-transparent'></div> */}

      {/* {isScrolled && alert.message && (
        <div className='relative top-0 left-0 -z-10'>
          <Alert type={alert.status} message={alert.message} />
        </div>
      )} */}
    </div>
  );
};

export default Header;
