import CardContainer from '../../layout/containers/CardContainer';
import { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../../store';
import FilterContainer from '../../layout/containers/FilterContainer';
import ModalContainer from '../../layout/containers/ModalContainer';
import CreateProduct from './CreateProduct';

const AllProducts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isListView, setIsListView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const community = useSelector(
    (state: RootState) => state.persisted.community
  );
  const { token } = useSelector((state: RootState) => state.persisted.auth);

  return (
    <div className='w-full py-6 mx-4 sm:px-6 lg:px-8 z-10'>
      <h1 className='text-3xl font-bold text-gray-900'>Products</h1>
      <FilterContainer
        onFilterChange={() => console.log('filter')}
        onSortChange={() => console.log('sort')}
        onToggleView={() => setIsListView(!isListView)}
        isModalOpen={isModalOpen}
        toggleModal={() => setIsModalOpen(!isModalOpen)}
      />
      <ModalContainer
        title='Create Product'
        isOpen={isModalOpen}
        toggleModal={() => setIsModalOpen(!isModalOpen)}
      >
        <CreateProduct toggleModal={() => setIsModalOpen(false)} />
      </ModalContainer>

      <CardContainer
        pagination={true}
        fetchUrl={`http://localhost:8080/api/community/products/${community}`}
        currentPage={currentPage}
        isListView={false}
        onPageChange={handlePageChange}
        token={token}
      />
    </div>
  );
};

export default AllProducts;
