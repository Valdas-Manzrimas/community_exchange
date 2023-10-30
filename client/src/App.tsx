// App.tsx
import React from 'react';
import { useMediaQuery } from '@react-hook/media-query';

import { BrowserRouter as Router, Routes } from 'react-router-dom';
// import { AppProvider } from './AppContext';
import Header from './components/layout/Header';
import ResponsiveHeader from './components/layout/ResponsiveHeader';
import 'tailwindcss/tailwind.css';

// import Home from './Home';
// import About from './About';
// import Contact from './Contact';

const App: React.FC = () => {
  const publicUrl = process.env.PUBLIC_URL || '';
  const isMediumScreen = useMediaQuery('(max-width: 768px)');

  return (
    <div className='bg-light'>
      <Router basename={publicUrl}>
        {/* <AppProvider> */}
        {isMediumScreen ? <ResponsiveHeader /> : <Header />}
        <Routes>
          {/* <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} /> */}
        </Routes>
        {/* </AppProvider> */}
      </Router>
    </div>
  );
};

export default App;
