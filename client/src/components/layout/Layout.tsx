import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`relative h-full w-full flex flex-col items-center`}>
      {/* <div
        className={`absolute h-[400px] top-0 left-0 right-0 w-full bg-primary-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40`}
      /> */}
      <div className='container relative'>
        {/* CONTENT */}
        <div className='p-5 mx-auto bg-white rounded-sm sm:rounded-3xl shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
