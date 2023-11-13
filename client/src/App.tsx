// App.tsx
import React, { useEffect } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import ResponsiveHeader from './components/layout/ResponsiveHeader';
import 'tailwindcss/tailwind.css';
import Home from './components/pages/Home';
import LoginRegister from './components/pages/Login_Register';
import MyProducts from './components/pages/MyProducts';
import AllProducts from './components/pages/AllProducts';
import CreateProduct from './components/pages/CreateProduct';
import AuthCheck from './components/Base/functions/authCheck';

// import About from './About';
// import Contact from './Contact';

const App: React.FC = () => {
  const publicUrl = process.env.PUBLIC_URL || '';
  const isMediumScreen = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      <Router basename={publicUrl}>
        <AuthCheck />
        {isMediumScreen ? <ResponsiveHeader /> : <Header />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login-register' element={<LoginRegister />} />
          <Route path='/my-products' element={<MyProducts />} />
          <Route path='/all-products' element={<AllProducts />} />
          <Route path='/create-product' element={<CreateProduct />} />
          {/* <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
