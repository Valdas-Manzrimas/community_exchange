import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Register from '../Base/Register';

// TODO: add error handling
// TODO: add loading state
// TODO: add success state
// TODO: set invitation as used after registration is successful. And provide message to user if invitation is already used.

const InvitationRegister: React.FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState<string>('');
  const [communityName, setCommunityName] = useState<string>('');
  const [communityId, setCommunityId] = useState<string>('');
  const [invitationOwner, setInvitationOwner] = useState<string>('');
  const [invitationToken, setInvitationToken] = useState<string>('');

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token') || '';
    setInvitationToken(token);

    if (token) {
      fetch(`${process.env.HARMONY_API_URL}/invitation?token=${token}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          return response.json();
        })
        .then((data) => {
          setEmail(data.email);
          setCommunityName(data.communityName);
          setCommunityId(data.communityId);
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

      <Register
        invitationEmail={email}
        community={communityId}
        invitationToken={invitationToken}
      />
    </div>
  );
};

export default InvitationRegister;
