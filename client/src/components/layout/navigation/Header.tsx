import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from '../../Base/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { clearUser } from '../../../store/slices/userSlice';
import { clearCommunity } from '../../../store/slices/communitySlice';
import { RootState } from '../../../store';
import Alert from '../Alert';
import { useNavigate } from 'react-router-dom';
import Image from '../../Base/Image';

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useSelector((state: RootState) => state.alert);
  const id = useSelector((state: RootState) => state.persisted.community);

  const isAuthenticated = useSelector(
    (state: RootState) => state.persisted.auth.isAuthenticated
  );
  // const user = useSelector((state: RootState) => state.persisted.user);

  const authPages = [/^\/community\/.*/, /^\/dashboard\/.*/];
  const isAuthRoute = authPages.some((route) => route.test(location.pathname));

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setIsScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // hide header img on scroll down
  useEffect(() => {
    if (isScrolled || isAuthRoute) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [isScrolled, isAuthRoute]);

  // scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const active = (path: string) => {
    return location.pathname === path
      ? 'border-tertiary text-tertiary'
      : 'text-gray-800';
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
    <div className={`sticky top-0 transition-all duration-500 z-50 `}>
      {alert.message && <Alert type={alert.status} message={alert.message} />}

      <header className={`relative w-full sm:items-center bg-light`}>
        {/* header wave on nonAuth routes */}
        {!isAuthRoute && (
          <img
            src='/assets/imgs/background/header_wave.png'
            alt='header-wave'
            className={`absolute -z-10 min-[1028px]:-top-4 xl:-top-8 min-[1530px]:-top-12 2xl:-top-16 left-0 w-full object-fill transition-opacity duration-300 ease-in-out ${
              !isVisible ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
        <div className='relative sm:grid sm:grid-cols-5 col-span-5 sm:col-span-1 sm:justify-self-start px-4 min-[1530px]:py-1'>
          <div className='absolute top-0 left-0 w-full h-full bg-light -z-10' />
          {/* logo */}
          <div className='flex items-center'>
            <div>
              <Link to='/'>
                <Image
                  src='/assets/imgs/background/Sanatana_logo.png'
                  alt='logo'
                  className='max-h-[3rem]'
                />
              </Link>
            </div>
          </div>
          {/* menu */}
          <nav
            className={`col-span-5 sm:col-span-3 sm:flex sm:items-center justify-self-center sm:w-auto ${
              showMenu ? 'block' : 'hidden'
            }`}
          >
            <div className='px-2 py-2'>
              <Link
                to='/'
                className={`block px-2 py-1 border-b-2 font-semibold hover:ease-in-out text-gray-800 hover:border-tertiary ${active(
                  '/'
                )} `}
              >
                Home
              </Link>
            </div>
            <div className='px-2 py-2'>
              <Link
                to='/about'
                className={`block px-2 py-1 border-b-2 font-semibold text-gray-800 hover:border-tertiary ${active(
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
                  className={`block px-2 py-1text-gray-800 border-b-2 font-semibold hover:border-tertiary ${active(
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
                className={`block px-2 py-1 text-gray-800 border-b-2 font-semibold  hover:border-tertiary ${active(
                  '/contact-us'
                )}`}
              >
                Contact
              </Link>
            </div>
          </nav>
          {/* icons */}
          <div className='col-span-5 sm:col-span-1 sm:flex sm:items-center sm:w-auto sm:ml-auto'>
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
