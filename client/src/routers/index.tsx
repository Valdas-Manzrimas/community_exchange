import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Page } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useEffect } from 'react';
import { handleErrors } from '../components/Base/functions/handleErrors';

import Home from '../components/pages/Home';
import RegisterCommunity from '../components/Base/auth/RegisterCommunity';
import About from '../components/pages/About';
import ContactUs from '../components/pages/ContactUs';
import InvitationRegister from '../components/pages/invitationRegister';
import Page404 from '../components/pages/Page404';
import Main from '../components/pages/community/Main';
import DashboardRoutes from './DashboardRoutes';
import PageLayout from '../components/layout/PageLayout';

export const pages: Page[] = [
  { path: '/', component: Home },
  { path: '/#', component: Home },

  { path: '/about', component: About },
  { path: '/contact-us', component: ContactUs },
  { path: '/page404', component: Page404 },
  { path: '/register-community', component: RegisterCommunity },
  { path: '/invitation', component: InvitationRegister },
];

const pagesDescription =
  'Sanatana is a platform for communities to share their products and services between their members. It is a place where you can find everything you need from your community. You can also create your own community and invite your friends to join.';

export const authPages: Page[] = [
  { path: '/community/:id', component: Main },
  { path: '/dashboard/*', component: DashboardRoutes },
];

const MyRoutes = () => {
  const dispatch = useDispatch();
  const publicUrl = process.env.PUBLIC_URL || '';

  const { isAuthenticated, token, error } = useSelector(
    (state: RootState) => state.persisted.auth
  );

  const { name } = useSelector((state: RootState) => state.persisted.community);

  useEffect(() => {
    if (error) {
      handleErrors(error, dispatch);
    }
  }, [error, dispatch]);

  return (
    <BrowserRouter basename={publicUrl}>
      <Routes>
        {pages.map(({ component: Component, path }, index) => {
          return (
            <Route
              key={index}
              element={
                <PageLayout
                  title='Sanatana'
                  description={pagesDescription}
                  isAuthPage={false}
                >
                  <Component />
                </PageLayout>
              }
              path={path}
            />
          );
        })}
        <Route path='*' element={<Page404 />} />

        {/* AUTH ROUTES*/}
        {isAuthenticated && token && (
          <>
            {authPages.map(({ component: Component, path }, index) => {
              return (
                <Route
                  key={index}
                  element={
                    <PageLayout
                      title={name}
                      description={`Welcome to ${name} community. Here you can find everything you need from your community members. You can also create your own products and services and share them with your community members as well as request products and services from them.`}
                      isAuthPage={true}
                    >
                      <Component />
                    </PageLayout>
                  }
                  path={path}
                />
              );
            })}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
