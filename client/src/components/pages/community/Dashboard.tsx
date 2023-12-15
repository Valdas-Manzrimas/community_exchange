import { useState } from 'react';
import CardContainer from '../../layout/containers/CardContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import FilterContainer from '../../layout/containers/FilterContainer';
import ModalContainer from '../../layout/containers/ModalContainer';
import CreateProduct from './CreateProduct';
import Sidebar from '../../layout/navigation/Sidebar';
import Layout from '../../layout/Layout';

const Dashboard: React.FC = () => {
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
    <div className='max-w-screen-2xl bg-gray-300 flex'>
      <div className='relative w-80'>
        <Sidebar />
      </div>
      <Layout
        children={
          <>
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
              fetchUrl={`http://localhost:8080/api/product/owned?page=${currentPage}`}
              token={isAuthenticated && token ? token : undefined}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              isListView={isListView}
            />
          </>
        }
      />
    </div>
  );
};

export default Dashboard;
