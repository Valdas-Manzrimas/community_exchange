import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const InvitationRegister: React.FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState<string>('');
  const [communityName, setCommunityName] = useState<string>('');

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
        })
        .catch((error) => {
          console.error('Error fetching invitation details:', error);
        });
    } else {
      console.error('No invitation token provided.');
    }
  }, [location]);

  return (
    <div>
      <h1>Invitation Registration</h1>
      <p>Email: {email}</p>
      <p>Community Name: {communityName}</p>
    </div>
  );
};

export default InvitationRegister;
