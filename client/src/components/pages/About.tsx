const About: React.FC = () => {
  return (
    <>
      <div className='mt-16 md:mt-0'>
        <div className='relative w-full flex flex-col'>
          <div className='p-8 w-full xsm:pb-8 pb-12 xsm:p-6 md:px-20 lg:px-64 -z-10 bg-white overlay-10'>
            <div className='w-full flex flex-col justify-end items-center my-4 -z-10'>
              <h1 className='text-4xl md:p-0 '>About</h1>
            </div>
            <div className='text-xl text-center'>
              <p>
                At Harmony Exchange, we believe in the transformative power of
                community exchanges. Our platform serves as a virtual hub,
                empowering different communities to create their own spaces for
                sharing, connecting, and exchanging without the constraints of
                traditional currency.
              </p>
            </div>
          </div>
        </div>

        <div className='relative w-full -z-10'>
          <div className='w-full h-full xsm:p-6 md:px-20 lg:px-64 bg-white text-lg'>
            <h2 className='text-xl font-bold mb-4'>Our Vision</h2>
            <p className='mb-8'>
              Envision a world where communities are not limited by borders, and
              the joy of giving and receiving extends beyond individual groups.
              At Harmony Exchange, this vision propels us forward, building
              bridges that connect neighborhoods, societies, and individuals.
            </p>

            <h2 className='text-xl font-bold mb-4'>Our Values</h2>
            <p className='mb-4'>
              <span className='font-semibold'>Simplicity:</span> We embrace
              simplicity as a guiding principle. Through our user-friendly
              platform, we've streamlined the process, making it effortless for
              diverse communities to join, share, and exchange.
            </p>

            <p className='mb-4'>
              <span className='font-semibold'>Trust:</span> Trust is the
              unifying thread that weaves through each community. We foster an
              environment where trust flourishes, creating a tapestry of
              interconnected relationships.
            </p>

            <p className='mb-4'>
              <span className='font-semibold'>Consciousness:</span> In our
              diverse ecosystem, consciousness is key. We value mindful choices,
              actions, and connections, fostering an atmosphere of purposeful
              engagement.
            </p>

            <p className='mb-4'>
              <span className='font-semibold'>Service Mood:</span> Service isn't
              just an action; it's a mood that defines our collective ethos. Our
              communities are united by a shared spirit of generosity and
              service.
            </p>

            <p className='mb-8'>
              <span className='font-semibold'>Family:</span> Although composed
              of many communities, we're united as one family. Regardless of
              differences, we share a common space where every member is valued
              and heard.
            </p>

            <h2 className='text-xl font-bold mb-4'>Our Mission</h2>
            <p className='mb-8'>
              Our mission is expansive—cultivating an interconnected network
              where love and reciprocation form the heartbeat of every exchange.
              We envision a future where neighborhoods, societies, and
              communities globally can seamlessly connect through acts of giving
              and sharing.
            </p>

            <h2 className='text-xl font-bold mb-4'>
              Join Your Community's Exchange
            </h2>
            <p className='mb-4'>
              Step into the extraordinary realm of connection, where your
              community can create its own unique exchange space. Whether you're
              sharing a unique service, a handcrafted product, or simply
              requesting assistance, your community is not just participating;
              it's becoming a node in a vast network of conscious and reciprocal
              exchanges.
            </p>

            <p className='mb-4'>
              At Harmony Exchange, we are the architects of a platform that
              transcends individual communities, setting the stage for a future
              where the exchange of goods and services extends beyond borders.
            </p>

            <p className='mb-4'>
              Welcome to Harmony Exchange — where simplicity meets trust,
              consciousness guides us, a service mood prevails, and the feeling
              of one family unites us all.
            </p>
          </div>
          <div className='w-full'>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
