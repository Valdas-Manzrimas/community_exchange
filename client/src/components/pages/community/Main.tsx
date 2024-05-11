import { useEffect, useState, FC, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Image from '../../Base/Image';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Community } from '../../../store/slices/communitySlice';
import Layout from '../../layout/Layout';
import api from '../../../store/api';
import Heading from '../../layout/Heading';

interface Moderator {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Main {}
const Main: FC<Main> = () => {
  const [community, setCommunity] = useState<Community | null>(null);
  const [moderator, setModerator] = useState<Moderator | null>(null);

  const { id } = useParams<{ id: string }>();
  const { token } = useSelector((state: RootState) => state.persisted.auth);
  const memoizedCommunity = useMemo(() => community, [community]);

  useEffect(() => {
    const fetchCommunity = async () => {
      if (!memoizedCommunity) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/community/${id}`,
            {
              headers: {
                'x-access-token': token,
              },
            }
          );
          setCommunity(response.data);
          const moderatorResponse = await api.get(
            `http://localhost:8080/api/user/${response.data.moderator._id}`,
            {
              headers: {
                'x-access-token': token,
              },
            }
          );
          setModerator(moderatorResponse.data);
        } catch (error) {
          console.error('Failed to fetch community', error);
        }
      }
    };

    fetchCommunity();
  }, [id, token, memoizedCommunity]);

  if (!community || !moderator) {
    return <div>Loading...</div>; // Replace with loading spinner
  }

  return (
    <div className='bg-white h-screen'>
      <div className='relative flex w-full h-2/5 md:mb-0'>
        {community?.pictures?.[0] ? (
          <Image
            fill
            className='object-cover'
            src={community.pictures[0]}
            sizes='1260px'
            alt='hero'
          />
        ) : (
          <Image
            fill
            className='object-cover'
            src='../../../../public/assets/imgs/background/community-landing-main.jpg'
            sizes='1260px'
            alt='hero'
          />
        )}
      </div>

      <Link
        to={`/dashboard/items/all`}
        className='bg-primary text-white px-4 py-2 rounded-md'
      >
        Dashboard
      </Link>
      <div className='flex w-full'>
        <Layout
          children={
            <>
              {/* Community Name */}
              <div className='w-full mb-5'>
                <h1 className='font-bold text-[5vw] md:text-4xl xl:text-6xl md:!leading-[110%] text-center '>
                  {community.name}
                </h1>
              </div>

              {/* Description */}
              <div className='w-full mb-5'>
                <p className='text-sm md:text-base text-neutral-300 '>
                  {community.description}
                </p>
              </div>

              {/* Community photo gallery */}

              {/* Mission & Values */}
              <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2 flex flex-col justify-center'>
                  <Heading
                    children={'Our Mission'}
                    className='text-dark w-full mb-2'
                    isCenter
                  />
                  <p className='text-start'>
                    TEST Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Perspiciatis, debitis tempora exercitationem eius
                    asperiores cupiditate nihil ullam error id expedita, modi
                    voluptas ab amet distinctio similique beatae? Minima, unde
                    aliquam!
                  </p>
                </div>
                <div className='w-full md:w-1/2 flex flex-col justify-center'>
                  <Heading
                    children={'Our Values'}
                    className='text-dark w-full mb-2'
                    isCenter
                  />
                  <p className='text-start'>
                    TEST Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Perspiciatis, debitis tempora exercitationem eius
                    asperiores cupiditate nihil ullam error id expedita, modi
                    voluptas ab amet distinctio similique beatae? Minima, unde
                    aliquam!
                  </p>
                </div>{' '}
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};

export default Main;
