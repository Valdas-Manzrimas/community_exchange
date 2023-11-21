// App.tsx
import React from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
// import ResponsiveHeader from './components/layout/ResponsiveHeader';
import 'tailwindcss/tailwind.css';
import Home from './components/pages/Home';
import LoginRegister from './components/pages/Login_Register';
import MyProducts from './components/pages/MyProducts';
import AllProducts from './components/pages/AllProducts';
import AuthCheck from './components/Base/functions/authCheck';
import SingleProduct from './components/pages/SingleProduct';
import ResHeader from './components/layout/ResHeader';

// import About from './About';
// import Contact from './Contact';

const App: React.FC = () => {
  const publicUrl = process.env.PUBLIC_URL || '';
  const isMediumScreen = useMediaQuery('(max-width: 768px)');

  return (
    <div className='relative'>
      <Router basename={publicUrl}>
        <AuthCheck />
        {isMediumScreen ? <ResHeader /> : <Header />}
        {isMediumScreen ? <div className='h-16' /> : ''}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login-register' element={<LoginRegister />} />
          <Route path='/all-products' element={<AllProducts />} />
          <Route path='/my-products' element={<MyProducts />} />
          <Route path='/product/:productId' element={<SingleProduct />} />

          {/* <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
