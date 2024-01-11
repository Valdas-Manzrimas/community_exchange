import React from 'react';
import { Link } from 'react-router-dom';
import Btn from '../Base/Btn';

const Footer: React.FC = () => {
  return (
    <footer className='relative'>
      <img
        src='/assets/imgs/background/Footer_wave.png'
        alt='footer-wave'
        className='w-full'
      />
      <div className="absolute top-8 left-4 lg:top-16 lg:left-16 text-dark text-3xl lg:text-5xl font-normal font-['Playfair Display'] bg-light">
        LOGO
      </div>
      <div className='px-2 md:px-12 pt-12 md:pt-6 lg:pt-0 bg-light'>
        <div className='grid grid-cols-1 md:grid-cols-2 grid-rows-16 md:grid-rows-8 lg:grid-cols-4 gap-2 p-1 lg:p-4 bg-light'>
          <div className="col-start-1 col-end-2 row-start-1 md:row-start-2 text-dark text-base font-normal font-['Quicksand'] leading-normal text-center">
            +37068686868
          </div>
          <div className="col-start-1 col-end-2 row-start-2 md:row-start-3 text-dark text-base font-normal font-['Quicksand'] leading-normal text-center">
            email123@gmail.com
          </div>
          <div className="col-start-1 col-end-2 row-start-3 md:row-start-4 text-dark text-base font-normal font-['Quicksand'] leading-normal text-center">
            Gedimino pr. 1, Vilnius, LT-01103
          </div>
          <div className='col-start-1 md:col-start-2 col-end-3 row-start-4 md:row-start-1 text-dark text-2xl font-normal text-center'>
            Website
          </div>
          <div className='grid col-start-1 md:col-start-2 col-end-3 row-start-5 md:row-start-2 grid-rows-subgrid row-span-3 text-dark text-base font-normal font-[Quicksand] justify-center'>
            <Link to='/' className='row-start-1'>
              Home
            </Link>
            <Link to='/about' className='row-start-2'>
              About{' '}
            </Link>
            <Link to='/contact' className='row-start-3'>
              Contact{' '}
            </Link>
          </div>
          <div className='col-start-1 lg:col-start-3 lg:col-end-4 row-start-8 md:row-start-5 lg:row-start-1 text-dark text-2xl font-normal text-center'>
            Follow our journey
          </div>

          <div className='p-2 col-start-1 lg:col-start-3 lg:col-end-4 row-start-9 md:row-start-6 lg:row-start-2 row-span-3 flex justify-center'>
            <img
              className='w-8 h-8 mr-3'
              src='\assets\imgs\icons\FB.png'
              alt='facebook'
            />
            <img
              className='w-10 h-8 mr-2'
              src='\assets\imgs\icons\IN.png'
              alt='linkedin'
            />
            <img
              className='w-8 h-8 mr-3'
              src='\assets\imgs\icons\IG.png'
              alt='instagram'
            />
          </div>
          <div className="col-start-1 md:col-start-2 lg:col-start-4 col-end-5 row-start-12 md:row-start-5 lg:row-start-1 text-dark text-2xl font-semibold font-['Quicksand'] text-center">
            Try our product
          </div>
          <div className='col-start-1 md:col-start-2 lg:col-start-4 col-end-5 row-start-13 md:row-start-6 lg:row-start-2 p-2 grid-row-2 row-span-3 flex justify-center lg:h-min'>
            <Btn style='secondary' onClick={() => console.log('clicked')}>
              <span className='font-[24px]'> Join now</span>
            </Btn>
          </div>
        </div>
        <div className='border-t border-gray-200 pt-2 flex justify-center flex-col md:flex-row'>
          <div className="mr-4 text-dark text-base font-light font-['Quicksand'] text-center cursor-pointer">
            Terms & Conditions
          </div>
          <div className="mr-4 text-dark text-base font-light font-['Quicksand'] text-center cursor-pointer">
            Privacy Policy
          </div>
          <div className="mr-4 text-dark text-base font-light font-['Quicksand'] text-center">
            <span className='mr-4'>© 2023 Sanatana</span> All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
