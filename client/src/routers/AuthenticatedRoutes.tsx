// file: AuthenticatedRoute.tsx
import { Route, Navigate, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useEffect } from 'react';
import { handleErrors } from '../components/Base/functions/handleErrors';
import AllProducts from '../components/pages/AllProducts';
import MyCommunity from '../components/pages/Dashboard';
import SingleProduct from '../components/pages/SingleProduct';

// interface AuthenticatedRouteProps {
//   path: string;
//   element: ReactNode;
// }

const AuthenticatedRoutes: React.FC = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, token, error } = useSelector(
    (state: RootState) => state.persisted.auth
  );

  useEffect(() => {
    if (error) {
      handleErrors(error, dispatch);
    }
  }, [error, dispatch]);

  return isAuthenticated && token ? (
    <Routes>
      <Route path='/all-products' element={<AllProducts />} />
      <Route path='/community/:id' element={<MyCommunity />} />
      <Route path='/product/:productId' element={<SingleProduct />} />
    </Routes>
  ) : (
    <>
      <Navigate to='/' />
    </>
  );
};

export default AuthenticatedRoutes;
