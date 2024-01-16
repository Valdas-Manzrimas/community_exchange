interface WaveContainerProps {
  children: React.ReactNode;
  styling?: string;
}

const WaveContainer: React.FC<WaveContainerProps> = ({ children, styling }) => {
  return (
    <div className='relative w-full flex flex-col items-center justify-center mt-8'>
      <img
        src='/assets/imgs/background/wave_figma_up.png'
        alt='wave'
        className='bottom w-full object-fill'
      />
      <div
        className={`${styling} w-full h-auto flex  bg-light sm:items-center lg:items-start py-16 lg:py-8`}
      >
        {children}
      </div>
      <img
        src='/assets/imgs/background/wave_figma_down.png'
        alt='wave down'
        className='w-full object-fill -mt-1'
      />
    </div>
  );
};

export default WaveContainer;
