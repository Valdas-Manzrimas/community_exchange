// Home.tsx
import { Link } from 'react-router-dom';
import Landing from '../layout/Landing';
// import PlanCard from '../Base/PlanCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Login from '../Base/auth/Login';
import SectionSliderPosts from '../Base/slider/SectionSliderPlan';
import WaveContainer from '../layout/WaveContainer';

// import CardContainer from '../layout/CardContainer';

const Home = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.persisted.auth.isAuthenticated
  );

  return (
    <>
      <Landing />
      <div className='relative flex z-20 items-center flex-col md:flex-row lg:my-24'>
        <div className='w-full md:w-1/2 h-full flex flex-col items-center justify-center'>
          <div className='mt-32 md:mt-8 md:mb-16 md:mx-8'>
            <h1
              className={`mb-8 text-6xl md:text-7xl text-center font-serif font-bold text-white md:mb-6`}
            >
              The Harmony Exchange
            </h1>

            <div className='transition-all duration-500 w-full'>
              <p className='text-xl text-secondary-200 mb-4 text-center'>
                The place to connect with your community
              </p>
            </div>
          </div>
          <div className='w-full flex items-center justify-center'>
            <Login />
          </div>
        </div>

        <div className='w-1/2 p-8 flex justify-center'>
          <img
            src='/assets/imgs/background/community-1.png'
            alt='bartering'
            className='w-full xl:w-3/4 object-fill rounded-3xl '
          />
        </div>
      </div>
      {/* About */}
      <WaveContainer styling='flex-col lg:flex-row justify-around'>
        <div className='bg-light flex flex-col lg:flex-row w-full lg:w-1/2 h-full md:pt-10 lg:pt-12 md:mx-8  max-w-xl'>
          <div className='w-full p-8 lg:p-6 md:p-20 pt-16 md:pt-0'>
            <h1 className='mb-8 text-3xl md:text-4xl text-dark font-medium font-[Playfair Display]'>
              The Harmony Exchange -
            </h1>
            <div className='text-dark font-[Quicksand] leading-[25px] text-lg md:text-xl'>
              <span className=' font-normal'>
                where a community of conscious{' '}
              </span>
              <span className=' font-semibold'>individuals</span>
              <span className=' font-normal'> </span>
              <span className=' font-semibold'>comes together to embrace</span>
              <span className=' font-normal'>
                {' '}
                the beauty of reciprocal living.
              </span>
            </div>

            <div className='my-8 flex'>
              <img
                src='/assets/imgs/icons/Quotation marks 2.svg'
                alt='quote'
                className='mr-4'
              />
              <div className=' text-dark text-lg md:text-xl font-semibold font-[Quicksand] leading-[25px]'>
                it's a connection hub, fostering exchanges of goods and services
              </div>
            </div>

            <p className=' text-dark text-lg md:text-xl font-normal font-[Quicksand] leading-[25px]'>
              {' '}
              This web tool is more than just a platform; it's a connection hub,
              fostering exchanges of goods and services among like-minded
              individuals who share a commitment to conscious living.
            </p>
          </div>
        </div>

        <div className='w-full lg:w-1/2 p-4 py-12 lg:pt-0 lg:mt-24 md:p-8 flex items-center justify-center'>
          <div className='bg-gray-50 rounded-3xl shadow p-10 max-w-xl md:p-20 lg:px-20 lg:py-12'>
            <h1 className='mb-8 text-4xl font-medium font-[Playfair Display]'>
              Vision
            </h1>
            <p className='text-dark text-lg font-[Quicksand] leading-normal mb-8'>
              <span className=' font-normal '>
                Imagine a space where communities and farmers, united by a
                commitment to conscious and healthy living,{' '}
              </span>
              <span className=' font-semibold'>
                come together to share their abundance.
              </span>
              <span className=' font-normal'>
                {' '}
                That's the vision behind The Harmony Exchange.{' '}
              </span>
            </p>
            <p className='text-dark text-lg font-[Quicksand] leading-normal mb-8'>
              <span className=' font-normal'>We are here to facilitate </span>
              <span className=' font-semibold'>
                the exchange of homegrown produce, handcrafted goods, and
                valuable services
              </span>
              <span className=' font-normal'>
                {' '}
                among members who understand the importance of mindful living.
              </span>
            </p>

            <Link
              to='/about'
              className='text-secondar bg-tertiary text-dark border-2 border-1 focus:outline-none hover:bg-tertiary-600 font-medium rounded-full text-md px-6 py-2.5 me-2 mb-2 cursor-pointer z-10
                 font-[Quicksand]'
            >
              <span>Read More</span>
            </Link>
          </div>
        </div>
      </WaveContainer>
      {/* Plans */}
      {!isAuthenticated && (
        <div className='relative py-16 px-4 md:px-8 lg:px-16'>
          <SectionSliderPosts heading='Choose a plan which suits you' />
        </div>
      )}

      {/* Explore  */}
      <div className=' w-full h-auto flex justify-center lg:justify-end items-center'>
        <div className='flex w-full lg:w-1/2 h-full bg-gray-200 mx-10 mb-10s rounded-[150px]'></div>
      </div>
    </>
  );
};

export default Home;
