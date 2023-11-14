// Home.tsx
import Landing from '../layout/Landing';
import CardContainer from '../layout/CardContainer';

const Home = () => {
  return (
    <div className='max-w-screen-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
      <Landing />

      <h1 className='text-3xl font-bold text-gray-900 mt-20'>Products</h1>
      <CardContainer
        pagination={false}
        fetchUrl='http://localhost:8080/api/product/all?limit=12'
      />
    </div>
  );
};

export default Home;
