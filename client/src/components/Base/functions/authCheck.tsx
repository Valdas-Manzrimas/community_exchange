import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../../store/slices/userSlice';
import { RootState } from '../../../store';

const AuthCheck: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.persisted.auth);
  const user = useSelector((state: RootState) => state.persisted.user);

  useEffect(() => {
    if (!token && user.id) {
      dispatch(clearUser());
      navigate('/login-register');
    }
  }, [dispatch, navigate, token, user]);

  return null;
};

export default AuthCheck;
