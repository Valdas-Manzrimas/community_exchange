import Btn from '../Base/Btn';
import Heading from '../layout/Heading';

export interface IWireframeContactProps {
  className?: string;
}

const ContactUs = ({ className }: IWireframeContactProps): JSX.Element => {
  return (
    <div
      className={
        'w-full relative pt-8 md:pt-32 flex flex-col justify-center  ' +
        className
      }
    >
      <div className='w-full flex flex-col md:flex-row justify-center items-center lg:gap-16 md:max-h-[360px] mb-8 md:mb-24'>
        <div className='relative w-full md:w-1/2 flex flex-col justify-center text-light py-12 px-8 gap-4 max-w-[350px]'>
          <div className='absolute top-0 left-0 opacity-10 bg-light w-full h-full rounded-3xl' />

          <Heading className='font-[Playfair Display] mb-4'>Info</Heading>
          <div className="text-base font-normal font-['Quicksand'] leading-normal flex items-center">
            <img
              src='/assets/imgs/icons/map-marker-home.svg'
              alt='location'
              className='w-4 h-4 mr-2 inline-block text-light filter invert'
            />
            Lithuania, India, Norway, Spain, UK
          </div>
          <div className="text-base font-normal font-['Quicksand'] leading-normal flex items-center">
            <img
              src='/assets/imgs/icons/at.svg'
              alt='email'
              className='w-4 h-4 mr-2 inline-block text-light filter invert'
            />
            v.manzrimas@gmail.com
          </div>
          <div className="text-base font-normal font-['Quicksand'] leading-normal flex items-center">
            <img
              src='/assets/imgs/icons/circle-phone-flip.svg'
              alt='phone'
              className='w-4 h-4 mr-2 inline-block filter invert '
            />
            +37063270185
          </div>
          <div className='p-2 mt-8 flex '>
            <img
              className='w-6 h-6 mr-3'
              src='\assets\imgs\icons\FB.png'
              alt='facebook'
            />
            <img
              className='w-8 h-6 mr-2'
              src='\assets\imgs\icons\IN.png'
              alt='linkedin'
            />
            <img
              className='w-6 h-6 mr-3'
              src='\assets\imgs\icons\IG.png'
              alt='instagram'
            />
          </div>
        </div>
        {/* <div className='w-full md:w-1/2 max-h-[360px]'>
          <img
            src='/assets/imgs/background/contact-us.jpg'
            alt='contact'
            className='w-full object-cover md:rounded-3xl md:h-[360px]'
          />
        </div> */}
        <div className='w-full md:w-1/2 flex justify-center items-center px-4 lg:px-12 pt-8'>
          <div className='border-t border-tertiary md:border-t-0 pt-4 px-4 w-full max-w-[400px] md:max-w-[600px]'>
            <Heading
              className='font-[Playfair Display] mb-4 text-light'
              isCenter
              desc='Got a question? Write us a message'
            >
              Contact Us
            </Heading>
            <form className='flex flex-col gap-4 text-light'>
              <label className="font-['Quicksand'] flex flex-col">
                Full Name
                <input
                  type='text'
                  placeholder='Name Surname'
                  className="rounded-3xl text-dark font-normal font-['Quicksand'] leading-normal mt-2 py-2 px-6 placeholder:text-gray-700"
                />
              </label>
              <label className="font-['Quicksand'] flex flex-col">
                Email Address
                <input
                  type='email'
                  placeholder='name.surname@email.com'
                  className="rounded-3xl text-dark font-normal font-['Quicksand'] leading-normal mt-2 py-2 px-6 placeholder:text-gray-700"
                />
              </label>
              <label className="font-['Quicksand'] flex flex-col">
                Message
                <textarea
                  placeholder='Your text'
                  className="rounded-3xl text-dark font-normal font-['Quicksand'] leading-normal mt-2 py-2 px-6 min-h-[100px] placeholder:text-gray-700 "
                ></textarea>
              </label>
              <Btn
                type='submit'
                style='secondary'
                className=" text-dark font-['Quicksand'] mt-4 p-3 w-52 self-center"
                onClick={() => console.log('clicked')}
              >
                Send
              </Btn>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
