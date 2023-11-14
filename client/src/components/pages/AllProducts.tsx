import CardContainer from '../layout/CardContainer';
import { useState } from 'react';

const AllProducts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
      <h1 className='text-3xl font-bold text-gray-900 mt-20'>Products</h1>
      <CardContainer
        pagination={true}
        fetchUrl={`http://localhost:8080/api/product/all?page=${currentPage}&limit=18`}
        currentPage={currentPage}
        isListView={false}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllProducts;
