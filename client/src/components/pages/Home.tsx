// Home.tsx
import Landing from '../layout/Landing';
import CardContainer from '../layout/CardContainer';

const Home = () => {
  return (
    <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
      <Landing />
      <CardContainer />
    </div>
  );
};

export default Home;
