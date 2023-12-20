// Home.tsx
import { Link } from 'react-router-dom';
import Landing from '../layout/Landing';
import PlanCard from '../Base/PlanCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Login from '../Base/auth/Login';

// import CardContainer from '../layout/CardContainer';

const Home = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.persisted.auth.isAuthenticated
  );

  return (
    <>
      <Landing />
      <div className='relative flex z-20 mb-20 pt-12 items-center'>
        <div className='absolute top-0 left-0 w-full h-full bg-gray-50 -z-10'></div>
        <div className='w-1/2 p-16'>
          <img
            src='https://as1.ftcdn.net/v2/jpg/02/71/62/78/1000_F_271627824_fDcoRAoWvgoVmb08mwJt485inYcaPzUv.jpg'
            alt='bartering'
            className='w-full object-fill rounded-s-3xl'
          />
        </div>

        <div className='w-1/2 h-full flex flex-col items-center justify-center'>
          <div className='mb-32'>
            <h1
              className={`mb-8 text-3xl md:text-4xl  lg:text-7xl font-bold text-primary md:mb-6`}
            >
              Harmony Exchange
            </h1>

            <div className='transition-all duration-500 w-full'>
              <p className='text-xl text-secondary-200 mb-4 text-center'>
                The place to connect
              </p>
            </div>
          </div>
          <div className='w-full flex items-center justify-center'>
            <Login />
          </div>
        </div>
      </div>
      {/* Plans */}
      {!isAuthenticated && (
        <div className='w-full h-auto flex justify-center items-center'>
          <PlanCard
            planName='Free'
            price={0}
            features={['1 user', '1 GB of storage', 'Email support']}
          />
        </div>
      )}
      {/* About */}
      <div className='w-full flex flex-col items-center justify-center'>
        <img
          src='/assets/imgs/background/wave.svg'
          alt='wave'
          className='bottom w-full object-fill'
        />
        <div className=' w-full h-auto flex flex-col lg:flex-row bg-white justify-around items-center pb-8 lg:pb-16'>
          <div className='bg-white flex flex-col lg:flex-row w-full lg:w-1/2 h-full pb-8 md:pt-10 md:mx-10  max-w-xl'>
            <div className='w-full p-8 md:p-20 pt-16 md:pt-0  text-center'>
              <h1 className='mb-10 text-2xl text-secondary font-bold'>
                The Harmony Exchange -
              </h1>
              <p className='text-xl leading-8'>
                where a community of conscious individuals comes together to
                embrace the beauty of reciprocal living.
              </p>
              <p className='text-xl leading-8 mt-6'>
                {' '}
                This web tool is more than just a platform; it's a connection
                hub, fostering exchanges of goods and services among like-minded
                individuals who share a commitment to conscious living.
              </p>
            </div>
          </div>

          <div className='w-full lg:w-1/2 p-4 py-12 lg:pt-0 pb-16 md:p-8 flex items-center justify-center'>
            <div className='p-8 md:p-16 h-full border-1 border-secondary rounded-3xl flex flex-col items-center justify-center shadow-primary shadow-xl max-w-xl'>
              <h1 className='mb-10 text-2xl text-primary font-bold'>Vision</h1>
              <p className='text-xl text-center mb-8 text-primary'>
                Imagine a space where communities and farmers, united by a
                commitment to conscious and healthy living, come together to
                share their abundance. That's the vision behind The Harmony
                Exchange. We are here to facilitate the exchange of homegrown
                produce, handcrafted goods, and valuable services among members
                who understand the importance of mindful living.
              </p>
              <Link
                to='/about'
                className='text-secondar bg-gray-200 bg-transparent text-primary border-2 border-primary focus:outline-none hover:bg-gray-300 focus:ring-4 focus:ring-gray-400 font-medium rounded-full text-md px-5 py-2.5 me-2 mb-2 cursor-pointer z-10'
              >
                <span>Read More</span>
              </Link>
            </div>
          </div>
        </div>
        <img
          src='/assets/imgs/background/wave-down.svg'
          alt='wave down'
          className='w-full object-fill -mt-1'
        />
      </div>

      {/* Explore  */}
      <div className=' w-full h-auto flex justify-center lg:justify-end items-center'>
        <div className='flex w-full lg:w-1/2 h-full bg-gray-200 mx-10 mb-10s rounded-[150px]'></div>
      </div>

      <div className='h-[500px]'></div>
      {/* <CardContainer
        pagination={false}
        fetchUrl='http://localhost:8080/api/product/all?limit=12'
      /> */}
    </>
  );
};

export default Home;
