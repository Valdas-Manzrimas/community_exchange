// Landing.tsx

const Landing = () => {
  return (
    <div className='bg-transparent'>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className='md:w-1/2 mb-4 md:mb-0'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>
            Welcome to our Community Exchange
          </h1>
          <p className='text-gray-700 mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <button className='bg-blue-500 hover:bg-blue-700 text-narvik-800 font-bold py-2 px-4 rounded'>
            Learn More
          </button>
        </div>
        <div className='md:w-1/2'>
          <img
            className='w-full h-auto object-cover object-center'
            src='https://img.freepik.com/free-photo/website-design-content-layout-graphic_53876-21203.jpg?w=1380&t=st=1698743661~exp=1698744261~hmac=40db9edfccc8ce2e9aee9609fdf7e7d7e91e3ec40baa5ab6df52540015eb17b4'
            alt='Community Exchange'
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
