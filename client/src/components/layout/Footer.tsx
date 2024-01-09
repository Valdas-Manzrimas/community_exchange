import React from 'react';

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
      <div className='h-full pb-2 bg-light'>
        <div className='grid grid-cols-4 gap-4 p-4 bg-light'>
          <div className='grid gap-0'>
            <div className='flex items-center gap-3.5'>
              <div className='w-5 h-5 bg-primary rounded-full' />
              <div className="text-dark text-base font-normal font-['Quicksand'] leading-normal">
                +37068686868
              </div>
            </div>
            <div className='flex items-center gap-3.5'>
              <div className='w-5 h-5 bg-primary rounded-full' />
              <div className="text-dark text-base font-normal font-['Quicksand'] leading-normal">
                email123@gmail.com
              </div>
            </div>
            <div className='flex items-center gap-3.5'>
              <div className='w-5 h-5 bg-primary rounded-full' />
              <div className="text-dark text-base font-normal font-['Quicksand'] leading-normal">
                Gedimino pr. 1, Vilnius, LT-01103
              </div>
            </div>
          </div>
          <div>
            <div className="text-dark text-2xl font-normal font-['Quicksand']">
              Company
            </div>
            <div className='flex flex-col gap-3.5'>
              <div className="text-dark text-base font-normal font-['Quicksand']">
                Home
              </div>
              <div className="text-dark text-base font-normal font-['Quicksand']">
                About{' '}
              </div>
              <div className="text-dark text-base font-normal font-['Quicksand']">
                Contact{' '}
              </div>
            </div>
          </div>
          <div>
            <div className="text-dark text-2xl font-normal font-['Quicksand']">
              Follow our journey
            </div>
            <div className='flex gap-3.5'>
              <img
                className='w-10 h-10'
                src='https://via.placeholder.com/40x40'
                alt='placeholder'
              />
              <img
                className='w-10 h-10'
                src='https://via.placeholder.com/40x40'
                alt='placeholder'
              />
              <img
                className='w-12 h-10'
                src='https://via.placeholder.com/47x40'
                alt='placeholder'
              />
            </div>
          </div>
          <div>
            <div className="text-dark text-2xl font-semibold font-['Quicksand']">
              Try our product
            </div>
            <div className='bg-orange-400 rounded-2xl p-2'>
              <div className="text-dark text-2xl font-normal font-['Quicksand']">
                Join now
              </div>
            </div>
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
