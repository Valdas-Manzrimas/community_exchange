import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface InvitationParams {
  id: string;
}

const InvitationRegister: React.FC = () => {
  const { id } = useParams<InvitationParams>();
  const [email, setEmail] = useState<string>('');
  const [communityName, setCommunityName] = useState<string>('');

  useEffect(() => {
    // Fetch the invitation details using the ID
    fetch(`http://127.0.0.1:5173/invitation?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEmail(data.email);
        setCommunityName(data.communityName);
      })
      .catch((error) => {
        console.error('Error fetching invitation details:', error);
      });
  }, [id]);

  return (
    <div>
      <h1>Invitation Registration</h1>
      <p>Email: {email}</p>
      <p>Community Name: {communityName}</p>
    </div>
  );
};

export default InvitationRegister;
