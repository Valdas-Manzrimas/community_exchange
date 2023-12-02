import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const InvitationRegister: React.FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState<string>('');
  const [communityName, setCommunityName] = useState<string>('');
  const [invitationOwner, setInvitationOwner] = useState<string>('');

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');

    if (token) {
      fetch(`http://localhost:8080/invitation?token=${token}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          return response.json();
        })
        .then((data) => {
          setEmail(data.email);
          setCommunityName(data.communityName);
          setInvitationOwner(data.invitedBy);
        })
        .catch((error) => {
          console.error('Error fetching invitation details:', error);
        });
    } else {
      console.error('No invitation token provided.');
    }
  }, [location]);

  return (
    <div className='w-full h-full bg-white px-4 pt-24 md:pt-8 pb-8'>
      <h1 className='text-center text-2xl'>
        You received an invitation from <b>{invitationOwner}</b> to join{' '}
        <span className='font-bold'>{communityName}</span> community!
      </h1>
      <p>Email: {email}</p>
    </div>
  );
};

export default InvitationRegister;
