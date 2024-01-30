import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`relative h-full w-full flex flex-col items-center`}>
      <div className='container relative'>
        {/* CONTENT */}
        <div className='p-5 mx-auto bg-white rounded-sm sm:rounded-3xl shadow-lg sm:p-10 lg:p-16'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
