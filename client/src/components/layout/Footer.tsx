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
      <div className="absolute top-16 left-16 text-dark text-5xl font-normal font-['Playfair Display']  bg-light">
        LOGO
      </div>
      <div className='px-12 pb-2 bg-light'>
        <div className='grid grid-cols-4 grid-rows-4 auto-rows-auto gap-2 p-4 bg-light'>
          <div className="col-start-1 col-end-2 row-start-2 text-dark text-base font-normal font-['Quicksand'] leading-normal">
            +37068686868
          </div>
          <div className="col-start-1 col-end-2 row-start-3 text-dark text-base font-normal font-['Quicksand'] leading-normal">
            email123@gmail.com
          </div>
          <div className="col-start-1 col-end-2 row-start-4 text-dark text-base font-normal font-['Quicksand'] leading-normal">
            Gedimino pr. 1, Vilnius, LT-01103
          </div>
          <div className='col-start-2 col-end-3 row-start-1 text-dark text-2xl font-normal'>
            Company
          </div>
          <div className='grid col-start-2 col-end-3 row-start-2 grid-rows-subgrid row-span-3 text-dark text-base font-normal font-[Quicksand]'>
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
          <div className='col-start-3 col-end-4 row-start-1 text-dark text-2xl font-normal'>
            Follow our journey
          </div>

          <div className='p-2 col-start-3 col-end-4 row-start-2 row-span-3 flex'>
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
          <div className="col-start-4 col-end-5 row-start-1 text-dark text-2xl font-semibold font-['Quicksand']">
            Try our product
          </div>
          <div className='col-start-4 col-end-5 row-start-2 bg-orange-400 rounded-2xl p-2 grid-row-2 row-span-3'>
            <Btn style='secondary' onClick={() => console.log('clicked')}>
              <span className='font-[24px]'> Join now</span>
            </Btn>
          </div>
        </div>
        <div className='border-t border-gray-200 pt-2 flex justify-center'>
          <div className="mr-4 text-dark text-base font-light font-['Quicksand']">
            <span className='mr-4'>© 2023 Sanatana</span> All Rights Reserved
          </div>
          <div className="mr-4 text-dark text-base font-light font-['Quicksand']">
            Terms & Conditions
          </div>
          <div className="mr-4 text-dark text-base font-light font-['Quicksand']">
            Privacy Police
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
