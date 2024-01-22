import Btn from '../Base/Btn';
import Heading from '../layout/Heading';
import WaveContainer from '../layout/WaveContainer';

const About: React.FC = () => {
  return (
    <>
      <div className='mt-16 md:mt-0'>
        <div className='relative w-full py-16 md:pt-36 lg:px-32 flex flex-col md:flex-row justify-center divide-y md:divide-y-0 md:divide-x divide-gray-50'>
          <div className=' w-full px-8 pb-6 md:px-16 -z-10 text-light max-w-[570px]'>
            <Heading className='font-[Playfair Display] mb-4'>
              Who we are
            </Heading>
            <div className="font-['Quicksand'] leading-6 font-normal text-gray-500	">
              At Harmony Exchange, we believe in the transformative power of
              community exchanges. Our platform serves as a virtual hub,
              empowering different communities to create their own{' '}
              <span className='text-semibold'>
                spaces for sharing, connecting,{' '}
              </span>
              and exchanging without the constraints of traditional currency.
            </div>
          </div>

          <div className='w-full pt-4 px-8 md:px-16 -z-10 text-light  max-w-[570px] '>
            <Heading className='font-[Playfair Display] mb-4' isCenter>
              Vision
            </Heading>
            <div className='font-[Quicksand] leading-6 font-normal text-gray-500	'>
              Envision a world where communities are not limited by borders, and
              the joy of giving and receiving extends beyond individual groups.
              At Harmony Exchange, this vision propels us forward, building
              bridges that connect neighborhoods, societies, and individuals.
            </div>
          </div>
        </div>

        <WaveContainer styling='flex-col lg:py-32 justify-center items-center '>
          <div className='flex flex-col self-center'>
            <Heading className='font-[Playfair Display] self-start mb-4 px-8 md:px-12 lg:px-32'>
              Join Your Community's Exchange
            </Heading>
            <p className='mb-4 px-8 md:px-12 lg:px-32  max-w-[1300px]'>
              Step into the extraordinary realm of connection, where your
              community can create its own unique exchange space. Whether you're
              sharing a unique service, a handcrafted product, or simply
              requesting assistance, your community is not just participating;
              it's becoming a node in a vast network of conscious and reciprocal
              exchanges. At Harmony Exchange, we are the architects of a
              platform that transcends individual communities, setting the stage
              for a future where the exchange of goods and services extends
              beyond borders.
            </p>
            <div className='flex flex-col items-center justify-center lg:justify-normal md:flex-row py-6 lg:px-32'>
              <Btn
                onClick={() => console.log('clicked')}
                children={'Join Now'}
                style='secondary'
                className='rounded-[15px] h-[35px] w-[150px]'
              />
              <div className='flex mt-8 md:mt-0'>
                <img
                  src='/assets/imgs/icons/Shiny.png'
                  alt='Shiny'
                  className='w-10 h-10 mx-3'
                />
                <div className='w-[220px] min-[500px]:w-[340px] md:w-[480px]'>
                  <span className="text-neutral-900 text-base font-normal font-['Quicksand']">
                    where{' '}
                  </span>
                  <span className="text-neutral-900 text-base font-semibold font-['Quicksand']">
                    simplicity
                  </span>
                  <span className="text-neutral-900 text-base font-normal font-['Quicksand']">
                    {' '}
                    meets trust,{' '}
                  </span>
                  <span className="text-neutral-900 text-base font-semibold font-['Quicksand']">
                    consciousness
                  </span>
                  <span className="text-neutral-900 text-base font-normal font-['Quicksand']">
                    {' '}
                    guides us, a service{' '}
                  </span>
                  <span className="text-neutral-900 text-base font-semibold font-['Quicksand']">
                    mood
                  </span>
                  <span className="text-neutral-900 text-base font-normal font-['Quicksand']">
                    {' '}
                    prevails, and the feeling of one{' '}
                  </span>
                  <span className="text-neutral-900 text-base font-semibold font-['Quicksand']">
                    family
                  </span>
                  <span className="text-neutral-900 text-base font-normal font-['Quicksand']">
                    {' '}
                    unites us all.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </WaveContainer>

        <div className='relative w-full -z-10 px-4 md:px-6 lg:px-24 text-light flex flex-col items-center'>
          <Heading
            className='font-[Playfair Display] my-16 md:my-20 max-w-[1055px]'
            isCenter
          >
            Our Values
          </Heading>

          <div className='grid grid-cols-1 md:grid-cols-2 grid-rows-5 gap-8'>
            <div className='col-span-1 row-span-1 flex items-center gap-7 justify-start md:justify-center'>
              <img
                src='/assets/imgs/icons/Vector.png'
                alt='Vector'
                className='w-14 h-14 md:w-20 md:h-20 lg:w-[115px] lg:h-[115px]'
              />
              <p className='font-[Quicksand] leading-6 font-normal text-gray-500 max-w-[370px]	'>
                We embrace simplicity as a guiding principle. Through our
                user-friendly platform, we've streamlined the process, making it
                effortless for diverse communities to join, share, and exchange.
              </p>
            </div>

            <div className='col-span-1 md:col-start-2 md:row-start-2 flex  gap-7 justify-end md:justify-center items-center'>
              <img
                src='/assets/imgs/icons/Trust.png'
                alt='Vector'
                className='w-14 h-14 md:w-20 md:h-20 lg:w-[115px] lg:h-[115px]'
              />
              <p className='font-[Quicksand] leading-6 font-normal text-gray-500 max-w-[370px]	'>
                Trust is the unifying thread that weaves through each community.
                We foster an environment where trust flourishes, creating a
                tapestry of interconnected relationships.
              </p>
            </div>

            <div className='col-span-1 md:col-start-1 md:row-start-3 flex  gap-7 justify-start md:justify-center items-center'>
              <img
                src='/assets/imgs/icons/Consciousness.png'
                alt='Vector'
                className='w-14 h-14 md:w-20 md:h-20 lg:w-[115px] lg:h-[115px]'
              />
              <p className='font-[Quicksand] leading-6 font-normal text-gray-500 max-w-[370px]	'>
                In our diverse ecosystem, consciousness is key. We value mindful
                choices, actions, and connections, fostering an atmosphere of
                purposeful engagement.
              </p>
            </div>

            <div className='col-span-1 md:col-start-2 md:row-start-4 flex  gap-7 justify-end md:justify-center items-center'>
              <img
                src='/assets/imgs/icons/Family.png'
                alt='Vector'
                className='w-14 h-14 md:w-20 md:h-20 lg:w-[115px] lg:h-[115px]'
              />
              <p className='font-[Quicksand] leading-6 font-normal text-gray-500 max-w-[370px]	'>
                In our diverse ecosystem, consciousness is key. We value mindful
                choices, actions, and connections, fostering an atmosphere of
                purposeful engagement.
              </p>
            </div>

            <div className='col-span-1 md:col-start-1 md:row-start-5 flex  gap-7 justify-start md:justify-center items-center'>
              <img
                src='/assets/imgs/icons/Service.png'
                alt='Vector'
                className='w-14 h-14 md:w-20 md:h-20 lg:w-[115px] lg:h-[115px]'
              />
              <p className='font-[Quicksand] leading-6 font-normal text-gray-500 max-w-[370px]	'>
                Although composed of many communities, we're united as one
                family. Regardless of differences, we share a common space where
                every member is valued and heard.
              </p>
            </div>
          </div>

          <div className='py-16 md:py-24 lg:py-36 max-w-[1055px] items-center '>
            <Heading className='font-[Playfair Display] self-start mb-8'>
              Our mission
            </Heading>
            <div className='w-full'>
              <span className="text-stone-50 text-base font-normal font-['Quicksand'] leading-loose">
                Our mission is expansive —cultivating an interconnected network
                where love and reciprocation form the heartbeat of every
                exchange. We envision a future where neighborhoods, societies,
                and communities globally can seamlessly{' '}
              </span>
              <span className="text-stone-50 text-base font-semibold font-['Quicksand'] leading-loose">
                connect through acts of giving and sharing.
              </span>
            </div>
            <div className='flex mt-4 items-center gap-4'>
              <img
                src='/assets/imgs/icons/Quotation marks 2.svg'
                alt='Quatation Mark'
                className='w-10 h-10'
              />
              <div className="w-full text-stone-50 text-base font-semibold font-['Quicksand'] leading-normal">
                love and reciprocation form the heartbeat of every exchange.
              </div>
            </div>
          </div>

          {/* <div className='w-full'>
            <div className='absolute w-full h-full bg-gradient-to-b from-white from-20% to-transparent  -z-10'></div>
            <div className='xsm:px-6 lg:px-32'>
              <h1 className=' xsm:pb-8 md:pb-16 text-3xl text-secondary font-bold'>
                Explore the Possibilities with The Harmony Exchange:
              </h1>
              <ul className='list-disc pl-4 mb-6 text-lg'>
                <li className='mb-4'>
                  <strong>Exchange Without Money:</strong>
                  <p>
                    Embark on a journey of reciprocity, making exchanges without
                    traditional currency. True wealth is found in connections
                    and shared abundance.
                  </p>
                </li>
                <li className='mb-4'>
                  <strong>Create Your Own Community Exchange Place:</strong>
                  <p>
                    Empower your community by customizing a dedicated space for
                    exchanges, fostering shared purpose and collaboration.
                  </p>
                </li>
                <li className='mb-4'>
                  <strong>Share Your Products Across Communities:</strong>
                  <p>
                    Break down barriers, connect with other communities, and
                    contribute to a network of like-minded individuals
                    appreciating conscious living.
                  </p>
                </li>
                <li className='mb-4'>
                  <strong>Expand Relationships:</strong>
                  <p>
                    Beyond transactions, our platform is a canvas for building
                    relationships. Connect with those who share your values and
                    foster meaningful connections.
                  </p>
                </li>
                <li className='mb-4'>
                  <strong>Serve Others:</strong>
                  <p>
                    Embrace the spirit of service by offering your skills,
                    talents, or products, uplifting and enriching the lives of
                    those around you.
                  </p>
                </li>
                <li className='mb-4'>
                  <strong>Request Support from Others:</strong>
                  <p>
                    In times of need, reach out to the community. The power of
                    community lies in its collective ability to provide support
                    when it's needed the most.
                  </p>
                </li>
              </ul>
            </div>
          </div> */}
        </div>

        <div className='w-full text-light mt-16 lg:mt-6 mb-32 md:flex justify-center'>
          <div className=' flex flex-col md:flex-row justify-between items-center max-w-[1055px] lg:gap-32'>
            <div className='md:w-1/2 mx-4 flex md:justify-center flex-col md:items-center'>
              <Heading className='font-[Playfair Display] mb-8' isCenter>
                What to expect
              </Heading>
              <div className='flex h-full gap-2 md:gap-4 max-w-[400px]'>
                <div className='w-[10px] rounded-lg xsm:h-[370px] sm:h-[320px] bg-tertiary-200'>
                  <div className='bg-tertiary h-[150px] sm:h-[105px] rounded-lg'></div>
                </div>
                <div>
                  <div className='flex flex-col gap-4'>
                    <b className='w-auto'>
                      Create Your Own Community Exchange Place
                    </b>
                    <p className='text-sm text-gray-600'>
                      Embark on a journey of reciprocity, making exchanges
                      without traditional currency. True wealth is found in
                      connections and shared abundance.
                    </p>
                  </div>
                  <ul className='pt-6 space-y-4'>
                    <li>Share Your Products Across Communities</li>
                    <li>Request Support from Others</li>
                    <li>Exchange Without Money</li>
                    <li>Expand Relationships</li>
                    <li>Serve Others</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-center'>
              <img
                src='/assets/imgs/theme/chakra.png'
                alt='what to expect picture'
                className='max-w-[320px] md:max-w-[400px] max-h-[400px] mt-16 md:mt-0'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
