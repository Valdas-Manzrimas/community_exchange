import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../../store/slices/userSlice';
import { logout } from '../../../store/slices/authSlice';
import { RootState } from '../../../store';
import axios from 'axios';

const AuthCheck: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.persisted.auth);
  const user = useSelector((state: RootState) => state.persisted.user);

  useEffect(() => {
    if (token) {
      axios
        .post(
          'http://localhost:8080/api/auth/verifyToken',
          {},
          { headers: { 'x-access-token': token } }
        )
        .then((response) => {
          if (!response.data.valid) {
            // Token is invalid
            dispatch(logout());
            navigate('/');
          } else if (!user.id) {
            dispatch(logout());
            navigate('/');
          }
        })
        .catch(() => {
          dispatch(logout());
          navigate('/');
        });
    } else if (!token && user.id) {
      dispatch(clearUser());
      navigate('/');
    }
  }, [dispatch, navigate, token, user]);

  return null;
};

export default AuthCheck;
