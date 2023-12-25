import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const MySpace = () => {
  let userData = useSelector((state: RootState) => state.persisted.user);
  const { token } = useSelector((state: RootState) => state.persisted.auth);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.error('Token is null');
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/user/${userData.id}`,
          {
            method: 'GET',
            headers: {
              'x-access-token': token,
            },
          }
        );
        const data = await response.json();
        userData = data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div>
      {userData ? (
        <div>
          <h1>{userData.firstName}</h1>
          <h1>{userData.lastName}</h1>
          <p>{userData.email}</p>
          {/* Display other user data properties as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default MySpace;
