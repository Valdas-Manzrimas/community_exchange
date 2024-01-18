import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface Member {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
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
      <h1 className='font-bold text-lg'>Community Members</h1>
      <ul className='p-4 w-full flex flex-wrap'>
        {members.map((member) => (
          <li
            key={member._id}
            className='px-6 py-2 border border-primary rounded-xl mr-4 text-center'
          >
            {member.firstName + ' ' + member.lastName}
            <p>{member.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Members;
