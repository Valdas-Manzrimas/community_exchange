// Landing.tsx

const Landing = () => {
  return (
    <div className='relative h-[32rem] bg-gradient-to-b from-primary to-secondary'>
      <div className='h-full md:p-4 flex flex-col md:flex-row justify-between items-center'>
        <div className='p-4 md:p-0md:w-1/2 mb-4 md:mb-0 text-center h-full flex flex-col justify-center items-center z-10'>
          <h1 className='text-4xl font-bold text-gray-100 mb-4'>
            Welcome to Harmony Exchange
          </h1>
          <p className='text-xl text-gray-100 mb-4'>
            Here is the place to connect
          </p>
          <button className='bg-blue-500 hover:bg-blue-700 text-narvik-800 font-bold py-2 px-4 rounded'>
            Learn More
          </button>
        </div>
        <div className='absolute top-1/4 md:top:1/2 md:w-1/2 opacity-40 md:relative z-0'>
          <img
            className='w-full h-auto object-cover object-center'
            src='/assets/imgs/background/tree.svg'
            alt='Community Exchange'
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
