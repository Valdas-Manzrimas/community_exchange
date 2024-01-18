// App.tsx
import 'tailwindcss/tailwind.css';
import MyRoutes from './routers';

// import Contact from './Contact';

const App: React.FC = () => {
  return (
    <div className='relative flex justify-center'>
      {/* App background */}
      <div className='-z-10 fixed w-full h-full md:p-4 flex flex-col md:flex-row justify-between items-center bg-gradient-to-b from-primary from-15% to-secondary' />
      <div className='max-w-[1930px] w-full'>
        <MyRoutes />
      </div>
    </div>
  );
};

export default App;
