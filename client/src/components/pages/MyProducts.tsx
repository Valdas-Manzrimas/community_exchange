import { useState } from 'react';
import CardContainer from '../layout/CardContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import FilterContainer from '../layout/FilterContainer';
import ModalContainer from '../layout/ModalContainer';
import CreateProduct from './CreateProduct';

const MyProducts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.persisted.auth
  );
  const [isListView, setIsListView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='max-w-screen-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
      <FilterContainer
        onFilterChange={() => console.log('filter')}
        onSortChange={() => console.log('sort')}
        onToggleView={() => setIsListView(!isListView)}
        isModalOpen={isModalOpen}
        toggleModal={() => setIsModalOpen(!isModalOpen)}
      />
      {isModalOpen && (
        <ModalContainer
          title='Create Product'
          isOpen={isModalOpen}
          toggleModal={() => setIsModalOpen(!isModalOpen)}
        >
          <CreateProduct toggleModal={() => setIsModalOpen(false)} />
        </ModalContainer>
      )}
      <CardContainer
        pagination={true}
        fetchUrl={`${process.env.HARMONY_API_URL}/api/product/owned?page=${currentPage}`}
        token={isAuthenticated && token ? token : undefined}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        isListView={isListView}
      />
    </div>
  );
};

export default MyProducts;
