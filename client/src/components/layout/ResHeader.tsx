import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const ResHeader: React.FC = () => {
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

  const handleOptionClick = () => {
    dispatch(logout());
    dispatch(clearUser());
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        showMenu &&
        !(event.target as HTMLElement).closest('.hamburger')
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
    <>
      <nav className='fixed top-0 z-[1000] w-full bg-primary'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            {/* Logo box */}
            <div className='flex items-center justify-start rtl:justify-end'>
              <Link to='/' onClick={() => showMenu && toggleMenu}>
                <span className='text-gray-50 font-semibold font-serif text-2xl md:text-4xl tracking-tight'>
                  Barter
                </span>
              </Link>
            </div>
            {/* Right box */}

            <div className='flex items-center'>
              {isAuthenticated && (
                <>
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
                </>
              )}
              {/* Hamburger menu */}
              <button
                name='hamburger'
                type='button'
                className='hamburger inline-flex items-center ml-4 p-2 text-sm text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown'
                onClick={toggleMenu}
              >
                <span className='sr-only'>Open sidebar</span>
                <svg
                  className={`hamburger w-6 h-6 ${
                    showMenu ? 'text-brown' : 'text-gray-100'
                  }`}
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    clipRule='evenodd'
                    fillRule='evenodd'
                    d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {alert.message && (
        <div className='relative top-0 left-0 -z-10'>
          <Alert type={alert.status} message={alert.message} />
        </div>
      )}

      <aside
        ref={navRef}
        className={`fixed top-0 right-0 z-40 w-64 h-screen pt-20 transition-transform duration-300 bg-primary border-l border-brown  ${
          showMenu ? `translate-x-0` : 'translate-x-full not-visible'
        }`}
      >
        <div className='h-full px-3 pb-4 overflow-y-auto bg-primary flex flex-col'>
          {isAuthenticated && (
            <div className='flex flex-col items-center justify-center border-b border-brown'>
              <div className='flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='Layer_1'
                  data-name='Layer 1'
                  viewBox='0 0 24 24'
                  width='512'
                  height='512'
                  className='w-5 h-5 mr-2 text-gray-100'
                  fill='currentColor'
                >
                  <path d='m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm-5,21.797v-.797c0-2.757,2.243-5,5-5s5,2.243,5,5v.797c-1.501.769-3.201,1.203-5,1.203s-3.499-.434-5-1.203Zm11-.582v-.215c0-3.309-2.691-6-6-6s-6,2.691-6,6v.215c-3.008-1.965-5-5.362-5-9.215C1,5.935,5.935,1,12,1s11,4.935,11,11c0,3.853-1.992,7.25-5,9.215ZM12,5c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4Zm0,7c-1.654,0-3-1.346-3-3s1.346-3,3-3,3,1.346,3,3-1.346,3-3,3Z' />
                </svg>
                <p className='text-xl font-semibold text-gray-100'>
                  {user.firstName}
                </p>
              </div>
              <span className='text-brown pb-2'>{user.email}</span>
            </div>
          )}
          <ul className='space-y-2 pb-4 font-medium self-stretch border-b border-brown'>
            <li className='mt-2'>
              <Link
                onClick={toggleMenu}
                to='/'
                className={`flex items-center p-2 rounded-lg  group ${active(
                  '/'
                )}`}
              >
                <svg
                  className={`w-5 h-5 transition duration-7 ${active('/')}`}
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 22 21'
                >
                  <path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
                  <path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
                </svg>
                <span className='ms-3'>Home</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                to='/about'
                className={`flex items-center p-2 rounded-lg  group ${active(
                  '/about'
                )}`}
              >
                <svg
                  className={`w-5 h-5 transition duration-7 ${active(
                    '/about'
                  )}`}
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 18 18'
                >
                  <path d='M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z' />
                </svg>
                <span className='flex-1 ms-3 whitespace-nowrap'>About</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                to='/all-products'
                className={`flex items-center p-2 rounded-lg  group ${active(
                  '/all-products'
                )}`}
              >
                <svg
                  className={`w-5 h-5 transition duration-7 ${active(
                    '/all-products'
                  )}`}
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 18 20'
                >
                  <path d='M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z' />
                </svg>
                <span className='flex-1 ms-3 whitespace-nowrap'>Products</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                to='/contact'
                className={`flex items-center p-2 rounded-lg  group ${active(
                  '/contact'
                )}`}
              >
                <svg
                  className={`w-5 h-5 transition duration-7 ${active(
                    '/contact'
                  )}`}
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z' />
                </svg>
                <span className='flex-1 ms-3 whitespace-nowrap'>
                  Contact us
                </span>
              </Link>
            </li>
          </ul>
          {/* User menu */}
          {isAuthenticated && (
            <ul className='space-y-2 font-medium mt-4'>
              <li>
                <Link
                  onClick={toggleMenu}
                  to='/profile'
                  className={`flex items-center p-2 rounded-lg  group ${active(
                    '/profile'
                  )}`}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    id='Layer_1'
                    data-name='Layer 1'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className={`w-5 h-5 transition duration-7 ${active(
                      '/profile'
                    )}`}
                  >
                    <path d='M9,12c3.309,0,6-2.691,6-6S12.309,0,9,0,3,2.691,3,6s2.691,6,6,6Zm0-10c2.206,0,4,1.794,4,4s-1.794,4-4,4-4-1.794-4-4,1.794-4,4-4Zm14.122,9.879c-1.134-1.134-3.11-1.134-4.243,0l-7.879,7.878v4.243h4.243l7.878-7.878c.567-.567,.879-1.32,.879-2.122s-.312-1.555-.878-2.121Zm-1.415,2.828l-7.292,7.293h-1.415v-1.415l7.293-7.292c.377-.378,1.036-.378,1.414,0,.189,.188,.293,.439,.293,.707s-.104,.518-.293,.707Zm-9.778,1.293H5c-1.654,0-3,1.346-3,3v5H0v-5c0-2.757,2.243-5,5-5H13c.289,0,.568,.038,.844,.085l-1.915,1.915Z' />
                  </svg>
                  <span className='flex-1 ms-3 whitespace-nowrap'>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={toggleMenu}
                  to='/settings'
                  className={`flex items-center p-2 rounded-lg  group ${active(
                    '/settings'
                  )}`}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className={`w-5 h-5 transition duration-7 ${active(
                      '/settings'
                    )}`}
                  >
                    <g id='_01_align_center' data-name='01 align center'>
                      <path d='M15,24H9V20.487a9,9,0,0,1-2.849-1.646L3.107,20.6l-3-5.2L3.15,13.645a9.1,9.1,0,0,1,0-3.29L.107,8.6l3-5.2L6.151,5.159A9,9,0,0,1,9,3.513V0h6V3.513a9,9,0,0,1,2.849,1.646L20.893,3.4l3,5.2L20.85,10.355a9.1,9.1,0,0,1,0,3.29L23.893,15.4l-3,5.2-3.044-1.758A9,9,0,0,1,15,20.487Zm-4-2h2V18.973l.751-.194A6.984,6.984,0,0,0,16.994,16.9l.543-.553,2.623,1.515,1-1.732-2.62-1.513.206-.746a7.048,7.048,0,0,0,0-3.75l-.206-.746,2.62-1.513-1-1.732L17.537,7.649,16.994,7.1a6.984,6.984,0,0,0-3.243-1.875L13,5.027V2H11V5.027l-.751.194A6.984,6.984,0,0,0,7.006,7.1l-.543.553L3.84,6.134l-1,1.732L5.46,9.379l-.206.746a7.048,7.048,0,0,0,0,3.75l.206.746L2.84,16.134l1,1.732,2.623-1.515.543.553a6.984,6.984,0,0,0,3.243,1.875l.751.194Zm1-6a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z' />
                    </g>
                  </svg>
                  <span className='flex-1 ms-3 whitespace-nowrap'>
                    Settings
                  </span>
                </Link>
              </li>
            </ul>
          )}
          {/* Auth links */}
          <ul className='space-y-2 font-medium absolute bottom-0 w-[231px]'>
            <li>
              <Link
                onClick={() =>
                  !isAuthenticated ? toggleMenu() : handleOptionClick()
                }
                to={!isAuthenticated ? '/login-register' : '/'}
                className={`flex items-center p-2 rounded-lg  group ${active(
                  '/login-register'
                )}`}
              >
                <svg
                  className={`w-5 h-5 transition duration-7 ${active(
                    '/login-register'
                  )}`}
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 18 16'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3'
                  />
                </svg>
                {!isAuthenticated ? (
                  <span className='flex-1 whitespace-nowrap text-center'>
                    Sign In / Sign Up
                  </span>
                ) : (
                  <span className='flex-1 whitespace-nowrap text-center'>
                    Sign Out
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default ResHeader;
