import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../store';

const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.persisted);

  const active = (path: string) => {
    return location.pathname === path
      ? 'border-secondary text-secondary'
      : 'border-primary text-white';
  };

  return (
    <div>
      <aside
        className={`fixed z-40 w-64 h-screen pt-6 bg-primary border-r border-brown`}
      >
        <div className='h-full px-3 pb-4 overflow-y-auto bg-primary flex flex-col'>
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

          <ul className='space-y-2 pb-4 font-medium self-stretch border-b border-brown'>
            <li className='mt-2'>
              <Link
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

          <ul className='space-y-2 font-medium mt-4'>
            <li>
              <Link
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
                <span className='flex-1 ms-3 whitespace-nowrap'>Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
