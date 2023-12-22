import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface Member {
  _id: string;
  firstName: string;
  // Add other properties as needed
}

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const token = useSelector((state: RootState) => state.persisted.auth.token);
  const communityId = useSelector(
    (state: RootState) => state.persisted.community
  );

  useEffect(() => {
    if (!token) {
      console.error('Token is null');
      return;
    }

    fetch(`http://localhost:8080/api/user/members/${communityId}`, {
      headers: {
        'x-access-token': token,
      },
    })
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Community Members</h1>
      <ul>
        {members.map((member) => (
          <li key={member._id}>{member.firstName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Members;
