// PageLayout.tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import ResHeader from './navigation/ResHeader';
import Header from './navigation/Header';
import { useMediaQuery } from '@react-hook/media-query';
import Footer from './Footer';

interface PageLayoutProps {
  title: string | undefined;
  description: string;
  children: React.ReactNode;
  isAuthPage?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  children,
  isAuthPage = false,
}) => {
  const isMediumScreen = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Helmet>
      {!isAuthPage && (
        <div className='-z-10 fixed w-full h-full md:p-4 flex flex-col md:flex-row justify-between items-center bg-gradient-to-b from-primary from-15% to-secondary' />
      )}
      <div
        className={`my-0 mx-auto px-0 w-full ${
          isAuthPage ? 'bg-gray-100 ' : 'max-w-[1930px] -mt-[3rem]'
        }`}
      >
        {isMediumScreen ? <ResHeader /> : <Header />}
        {children}
        {!isAuthPage && <Footer />}
      </div>
    </>
  );
};

export default PageLayout;
