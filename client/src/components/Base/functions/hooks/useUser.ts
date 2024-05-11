// useProduct.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../../../../store/slices/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(false);

  const { token } = useSelector((state: RootState) => state.persisted.auth);

  useEffect(() => {
    setUserLoading(true);
    axios
      .get(`http://localhost:8080/api/user/${userId}`, {
        headers: token ? { 'x-access-token': token } : {},
      })
      .then((response) => {
        setUser(response.data);
        setUserLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setUserLoading(false);
        throw error;
      });
  }, [userId, token]);

  return { user, userLoading };
};

export default useUser;
