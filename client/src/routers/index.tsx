import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useMediaQuery } from '@react-hook/media-query';
import { Page } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useEffect } from 'react';
import { handleErrors } from '../components/Base/functions/handleErrors';

import Home from '../components/pages/Home';
import RegisterCommunity from '../components/Base/auth/RegisterCommunity';
import About from '../components/pages/About';
import InvitationRegister from '../components/pages/invitationRegister';
import Dashboard from '../components/pages/community/Dashboard';
import SingleProduct from '../components/pages/community/SingleProduct';
import AllProducts from '../components/pages/community/AllProducts';
import Page404 from '../components/pages/Page404';
import ResHeader from '../components/layout/navigation/ResHeader';
import Header from '../components/layout/navigation/Header';

export const pages: Page[] = [
  { path: '/', component: Home },
  { path: '/#', component: Home },

  // other pages -------------------------------------------------------
  { path: '/about', component: About },
  //   { path: "/contact", component: Contact },
  { path: '/page404', component: Page404 },
  { path: '/register-community', component: RegisterCommunity },
  { path: '/invitation', component: InvitationRegister },
];

export const authPages: Page[] = [
  { path: '/community/:id', component: Dashboard },
  { path: '/community/items/all', component: AllProducts },
  { path: '/community/items/:productId', component: SingleProduct },
];

const MyRoutes = () => {
  const dispatch = useDispatch();
  const publicUrl = process.env.PUBLIC_URL || '';
  const isMediumScreen = useMediaQuery('(max-width: 768px)');

  const { isAuthenticated, token, error } = useSelector(
    (state: RootState) => state.persisted.auth
  );

  useEffect(() => {
    if (error) {
      handleErrors(error, dispatch);
    }
  }, [error, dispatch]);

  return (
    <BrowserRouter basename={publicUrl}>
      {isMediumScreen ? <ResHeader /> : <Header />}

      <Routes>
        {pages.map(({ component: Component, path }, index) => {
          return <Route key={index} element={<Component />} path={path} />;
        })}
        <Route path='*' element={<Page404 />} />

        {/* AUTH ROUTES*/}
        {isAuthenticated && token && (
          <>
            {authPages.map(({ component: Component, path }, index) => {
              return <Route key={index} element={<Component />} path={path} />;
            })}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
