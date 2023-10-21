// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
// import { AppProvider } from './AppContext';
import Header from './components/layout/Header';
import 'tailwindcss/tailwind.css';

// import Home from './Home';
// import About from './About';
// import Contact from './Contact';

const App: React.FC = () => {
  const publicUrl = process.env.PUBLIC_URL || '';
  return (
    <div className='bg-light'>
      <Router basename={publicUrl}>
        {/* <AppProvider> */}
        <Header />
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
