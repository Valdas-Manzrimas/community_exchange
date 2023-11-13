import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../../store/slices/userSlice';
import { logout } from '../../../store/slices/authSlice';
import { RootState } from '../../../store';
// import { jwtDecode } from 'jwt-decode';

// interface DecodedToken {
//   exp: number;
// }

const AuthCheck: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.persisted.auth);
  const user = useSelector((state: RootState) => state.persisted.user);

  useEffect(() => {
    if (token) {
      // const decodedToken = jwtDecode<DecodedToken>(token);
      // const currentTime = Date.now() / 1000;

      // if (decodedToken.exp < currentTime) {
      //   dispatch(clearUser());
      //   navigate('/login-register');
      // }

      if (!user.id) {
        dispatch(logout());
        navigate('/login-register');
      }
    } else if (!token && user.id) {
      dispatch(clearUser());
      navigate('/login-register');
    }
  }, [dispatch, navigate, token, user]);

  return null;
};

export default AuthCheck;
