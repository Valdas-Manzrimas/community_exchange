// App.tsx
import 'tailwindcss/tailwind.css';
import MyRoutes from './routers';

// import Contact from './Contact';

const App: React.FC = () => {
  return (
    <div className='relative'>
      <div className='w-full h-full'>
        <MyRoutes />
      </div>
    </div>
  );
};

export default App;
