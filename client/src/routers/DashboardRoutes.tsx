import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/layout/navigation/Sidebar';
import AllProducts from '../components/pages/community/AllProducts';
import SingleProduct from '../components/pages/community/SingleProduct';
import MySpace from '../components/pages/community/MySpace';
import Members from '../components/pages/community/Members';
import CreateProduct from '../components/pages/community/CreateProduct';

const DashboardRoutes: React.FC = () => {
  return (
    <div className='dashboard w-full bg-gray-100 flex'>
      <div className='relative w-80 h-full'>
        <Sidebar />
      </div>

      <Routes>
        <Route path='/:id' element={<MySpace />} />
        <Route path='/items/all' element={<AllProducts />} />
        <Route path='/items/:productId' element={<SingleProduct />} />
        <Route path='/items/create' element={<CreateProduct />} />
        <Route path='/members' element={<Members />} />
      </Routes>
    </div>
  );
};

export default DashboardRoutes;
