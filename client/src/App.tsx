// App.tsx
import { useMediaQuery } from '@react-hook/media-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
// import ResponsiveHeader from './components/layout/ResponsiveHeader';
import 'tailwindcss/tailwind.css';
import Home from './components/pages/Home';
import AllProducts from './components/pages/AllProducts';
import About from './components/pages/About';
import AuthCheck from './components/Base/functions/authCheck';
import SingleProduct from './components/pages/SingleProduct';
import ResHeader from './components/layout/ResHeader';
import InvitationRegister from './components/pages/invitationRegister';
import RegisterCommunity from './components/Base/RegisterCommunity';
import MyCommunity from './components/pages/MyCommunity';

// import About from './About';
// import Contact from './Contact';

const App: React.FC = () => {
  const publicUrl = process.env.PUBLIC_URL || '';
  const isMediumScreen = useMediaQuery('(max-width: 768px)');

  // const [scrollY, setScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

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
        <AuthCheck />
        {isMediumScreen ? <ResHeader /> : <Header />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register-community' element={<RegisterCommunity />} />
          <Route path='/all-products' element={<AllProducts />} />
          <Route path='/community' element={<MyCommunity />} />
          <Route path='/product/:productId' element={<SingleProduct />} />
          <Route path='/about' element={<About />} />
          <Route path='/invitation' element={<InvitationRegister />} />

          {/* <Route path='/contact' element={<Contact />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
