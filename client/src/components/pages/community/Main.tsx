import { FC } from 'react';

import Image from '../../Base/Image';

export interface SectionHero2Props {}
const SectionHero2: FC<SectionHero2Props> = () => {
  return (
    <div className='SectionHero2 relative pb-20 md:py-32 lg:py-60 bg-black'>
      <div className='flex w-full mb-10 md:w-1/2 xl:w-3/5 md:absolute md:right-0 md:top-0 md:bottom-0 md:mb-0'>
        <div className='hidden md:block absolute z-[1] top-0 left-0 bottom-0 w-44 from-black bg-gradient-to-r'></div>
        <Image
          fill
          className='object-cover'
          src='https://images.pexels.com/photos/4666750/pexels-photo-4666750.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          sizes='1260px'
          alt='hero'
        />
      </div>
      <div className='container relative z-10 text-neutral-100'>
        <div className='max-w-3xl'>
          <h1 className='font-bold text-4xl md:text-5xl xl:text-6xl mt-3 md:!leading-[110%] '>
            The hidden world of whale culture
          </h1>
          <p className='mt-7 text-base lg:text-xl text-neutral-300 '>
            From singing competitions to food preferences, scientists are
            learning whales have cultural differences once thought to be unique
            to humans.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionHero2;
