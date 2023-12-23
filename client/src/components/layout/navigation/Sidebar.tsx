import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../store';
import { useEffect, useState } from 'react';
import { Community } from '../../../store/slices/communitySlice';
import Dropdown from '../../Base/Dropdown';

interface DataItem {
  _id: string;
  name: string;
}

const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.persisted);
  const { community } = useSelector((state: RootState) => state.persisted);
  const { token } = useSelector((state: RootState) => state.persisted.auth);

  const [communityData, setCommunityData] = useState<Community[]>([]);
  const active = (path: string) => {
    return location.pathname === path
      ? 'border-secondary text-secondary'
      : 'border-primary text-white';
  };

  useEffect(() => {
    if (!user) {
      console.error('User is null');
      return;
    }

    if (!community) {
      console.error('Community is null');
      return;
    }

    const fetchUserCommunities = async () => {
      if (!token) {
        console.error('Token is null');
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/api/communities`, {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        });
        let data = await response.json();
        data = data.map((item: DataItem) => {
          const { _id, ...rest } = item;
          return { id: _id, ...rest };
        });
        setCommunityData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserCommunities();
  }, []);

  return (
    <div>
      <aside
        className={`fixed z-40 w-64 h-screen pt-6 bg-primary border-r border-brown`}
      >
        <div className='h-full px-3 pb-4 overflow-y-auto bg-primary flex flex-col'>
          <div className='flex flex-col items-center justify-center border-b border-brown'>
            <div className='flex items-center justify-center'>
              <Dropdown
                buttonText={communityData[0]?.name}
                options={communityData
                  .map((community) => community.name)
                  .filter((name): name is string => !!name)}
                key={communityData[0]?.id || ''}
                replaceButtonText
                buttonStyles='px-2 py-1 text-sm font-semibold text-white bg-primary rounded-lg hover:opacity-80'
              />
            </div>
          </div>

          <ul className='space-y-2 pb-4 font-medium self-stretch border-b border-brown'>
            <li className='mt-2'>
              <Link
                to={`/dashboard/${user.id}`}
                className={`flex items-center p-2 rounded-lg group ${active(
                  `/dashboard/${user.id}`
                )}`}
              >
                <svg
                  className={`w-5 h-5 transition duration-7 ${active(
                    `/dashboard/${user.id}`
                  )}`}
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 22 21'
                >
                  <path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
                  <path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
                </svg>
                <span className='ms-3'>My Space</span>
              </Link>
            </li>
            <li>
              <Link
                to='/dashboard/items/all'
                className={`flex items-center p-2 rounded-lg  group ${active(
                  '/dashboard/items/all'
                )}`}
              >
                <svg
                  className={`w-5 h-5 transition duration-7 ${active(
                    '/dashboard/items/all'
                  )}`}
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 18 18'
                >
                  <path d='M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z' />
                </svg>
                <span className='flex-1 ms-3 whitespace-nowrap'>Products</span>
              </Link>
            </li>
            <li>
              <Link
                to='/dashboard/members'
                className={`flex items-center p-2 rounded-lg  group ${active(
                  '/dashboard/members'
                )}`}
              >
                <svg
                  className={`w-5 h-5 transition duration-7 ${active(
                    '/dashboard/members'
                  )}`}
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 18 20'
                >
                  <path d='M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z' />
                </svg>
                <span className='flex-1 ms-3 whitespace-nowrap'>Members</span>
              </Link>
            </li>
          </ul>
          {/* User menu */}

          <ul className='space-y-2 font-medium mt-4'>
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
