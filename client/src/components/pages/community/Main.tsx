import { useEffect, useState, FC, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Image from '../../Base/Image';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Community } from '../../../store/slices/communitySlice';
import Layout from '../../layout/Layout';

interface Moderator {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  // Add other properties as needed
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
          setModerator(response.data.moderator);
        } catch (error) {
          console.error('Failed to fetch community', error);
        }
      }
    };

    fetchCommunity();
  }, [id, token, memoizedCommunity]);

  useEffect(() => {
    const fetchModerator = async () => {
      if (moderator) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/user/${moderator._id}`,
            {
              headers: {
                'x-access-token': token,
              },
            }
          );
          setModerator(response.data);
        } catch (error) {
          console.error('Failed to fetch moderator', error);
        }
      }
    };

    if (community) {
      fetchModerator();
    }
  }, [community, token, moderator]);

  if (!community || !moderator) {
    return <div>Loading...</div>; // Replace with loading spinner
  }

  return (
    <div className='bg-white h-screen'>
      <div className='relative flex w-full h-2/5 mb-10 md:mb-0'>
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

        <div className='z-10 text-secondary w-full flex items-center justify-center'>
          <div className='max-w-3xl'>
            <h1 className='font-bold text-4xl md:text-5xl xl:text-6xl mt-3 md:!leading-[110%] '>
              {community.name}
            </h1>
          </div>
        </div>
      </div>
      <div className='flex w-full'>
        <Layout
          children={
            <div className='flex'>
              <div className='w-1/2 p-4 pr-6'>
                <p className='mt-7 text-base lg:text-xl text-neutral-300 '>
                  {community.description}
                </p>
              </div>
              <div className='w-1/2'>
                <h2 className='text-2xl font-bold mb-4'>Community Details</h2>
                <div className='flex flex-col'>
                  <div className='flex mb-4 flex-col'>
                    <h3 className='text-lg font-bold mr-2'>Moderator:</h3>
                    <p className='text-lg text-neutral-300'>
                      {moderator.firstName + ' ' + moderator.lastName}
                    </p>
                    <p>{moderator.email}</p>
                  </div>
                  <div className='flex items-center mb-4'>
                    <h3 className='text-lg font-bold mr-2'>Members:</h3>
                    <p className='text-lg text-neutral-300'>
                      {community?.users?.length}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/dashboard/${id}`}
                  className='bg-primary text-white px-4 py-2 rounded-md'
                >
                  Dashboard
                </Link>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Main;
