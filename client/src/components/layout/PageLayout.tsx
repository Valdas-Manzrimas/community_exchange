import React from 'react';
import { Helmet } from 'react-helmet';

interface PageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Helmet>
      <div className={` my-0 mx-auto px-0 py-20px w-full `}>{children}</div>
    </>
  );
};

export default PageLayout;
