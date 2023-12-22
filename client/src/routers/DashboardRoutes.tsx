import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/layout/navigation/Sidebar';
import AllProducts from '../components/pages/community/AllProducts';
import SingleProduct from '../components/pages/community/SingleProduct';
import MySpace from '../components/pages/community/MySpace';

const DashboardRoutes: React.FC = () => {
  return (
    <div className='max-w-screen-2xl h-screen bg-gray-100 flex -z-20'>
      <div className='relative w-80'>
        <Sidebar />
      </div>

      <Routes>
        <Route path='/:id' element={<MySpace />} />
        <Route path='/items/all' element={<AllProducts />} />
        <Route path='/items/:productId' element={<SingleProduct />} />
      </Routes>
    </div>
  );
};

export default DashboardRoutes;
