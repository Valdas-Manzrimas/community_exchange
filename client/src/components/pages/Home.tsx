// Home.tsx
import { Link } from 'react-router-dom';
import Landing from '../layout/Landing';
// import CardContainer from '../layout/CardContainer';

const Home = () => {
  return (
    <>
      <Landing />
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
