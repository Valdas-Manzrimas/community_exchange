// Landing.tsx

const Landing = () => {
  return (
    <>
      <div className='relative -z-10 h-[42rem] opacity-100 flex justify-center'>
        <div className='p-4 mt-4 text-center h-full flex items-center z-10 md:p-0 md:w-full md:mb-0'>
          <div className='hidden md:block relative md:w-1/2 h-1/3 pt-12' />
          <div className='relative md:w-1/2 h-1/3 flex flex-col pt-12 mb-16 md:mr-8 md:mb-32 lg:mr-16 '>
            <h1
              className={`mb-8 text-3xl md:text-4xl  lg:text-7xl font-bold text-gray-100 md:mb-6`}
            >
              Harmony Exchange
            </h1>

            <div className='transition-all duration-500 w-full'>
              <p className='text-xl text-secondary-200 mb-4'>
                The place to connect
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
