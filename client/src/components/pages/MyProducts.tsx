import { useState } from 'react';
import CardContainer from '../layout/CardContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import FilterContainer from '../layout/filterContainer';

const MyProducts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.persisted.auth
  );
  const [isListView, setIsListView] = useState(false);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
      <FilterContainer
        onFilterChange={() => console.log('filter')}
        onSortChange={() => console.log('sort')}
        onToggleView={() => setIsListView(!isListView)}
      />
      <CardContainer
        pagination={true}
        fetchUrl={`http://localhost:8080/api/product/owned?page=${currentPage}`}
        token={isAuthenticated && token ? token : undefined}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        isListView={isListView}
      />
    </div>
  );
};

export default MyProducts;
