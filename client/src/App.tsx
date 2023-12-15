// App.tsx
import { useMediaQuery } from '@react-hook/media-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/navigation/Header';
// import ResponsiveHeader from './components/layout/ResponsiveHeader';
import 'tailwindcss/tailwind.css';
import Home from './components/pages/Home';
<<<<<<< HEAD
import AllProducts from './components/pages/AllProducts';
=======
import LoginRegister from './components/pages/Login_Register';
>>>>>>> 64150000e997663ae826e1d22d1dc9864c9aec85
import About from './components/pages/About';
import ResHeader from './components/layout/navigation/ResHeader';
import InvitationRegister from './components/pages/invitationRegister';
import RegisterCommunity from './components/Base/RegisterCommunity';
import AuthenticatedRoutes from './components/Base/AuthenticatedRoutes';

// import Contact from './Contact';

const App: React.FC = () => {
  const publicUrl = process.env.PUBLIC_URL || '';
  const isMediumScreen = useMediaQuery('(max-width: 768px)');

  return (
    <div className='relative'>
      {/* App background */}
      <div className='-z-10 fixed w-full h-full md:p-4 flex flex-col md:flex-row justify-between items-center z-60 bg-gradient-to-b from-primary from-15% to-secondary'>
        <div
          className={`relative md:top-32 w-full h-full flex flex-col md:flex-row justify-end items-center md:justify-normal opacity-40`}
        >
          <img
            className='w-full h-auto object-cover object-center max-w-md md:max-w-lg lg:max-w-2xl'
            src='/assets/imgs/background/tree.svg'
            alt='Community Exchange'
          />
        </div>
      </div>
      <Router basename={publicUrl}>
        {isMediumScreen ? <ResHeader /> : <Header />}
        <Routes>
          {/* For each authenticated route check the token in a backend */}
          <Route path='/' element={<Home />} />
          <Route path='/register-community' element={<RegisterCommunity />} />
          <Route path='*' element={<AuthenticatedRoutes />} />
          <Route path='/about' element={<About />} />
          <Route path='/invitation' element={<InvitationRegister />} />

          {/* <Route path='/contact' element={<Contact />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
