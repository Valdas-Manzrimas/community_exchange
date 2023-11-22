// Landing.tsx

const Landing = () => {
  return (
    <>
      <div className='relative -z-10 h-[42rem] opacity-100 flex justify-center'>
        <div className='fixed w-full h-full md:p-4 flex flex-col md:flex-row justify-between items-center z-60 bg-gradient-to-b from-primary to-secondary'>
          <div className='absolute bottom-20 md:top:1/4 md:w-1/2 opacity-40 md:relative z-0'>
            <img
              className='w-full h-auto object-cover object-center'
              src='/assets/imgs/background/tree.svg'
              alt='Community Exchange'
            />
          </div>
        </div>
        <div className='p-4 mt-4 text-center h-full flex items-center z-10 md:p-0 md:w-full md:mb-0 md:mt-[3rem] md:ml-[20rem] md:h-3/4 lg:mt-[6rem] lg:ml-[30rem]'>
          <div className='hidden lg:block relative lg:w-1/3 h-1/3 pt-12' />
          <div className='relative lg:w-1/2 h-1/3 flex flex-col pt-12 lg:mr-16 '>
            <h1 className='mb-3 text-3xl font-bold text-gray-100'>
              Welcome to
            </h1>
            <h1 className={`mb-8 text-7xl font-bold text-gray-100 md:mb-6`}>
              Harmony Exchange
            </h1>

            <div className='transition-all duration-500 w-full'>
              <p className='text-xl text-brown-700 mb-4'>
                The place which connects
              </p>
              <button className='bg-blue-500 hover:bg-blue-700 text-narvik-800 font-bold py-2 px-4 rounded'>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
