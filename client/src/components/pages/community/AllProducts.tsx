import CardContainer from '../../layout/containers/CardContainer';
import { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../../store';
import FilterContainer from '../../layout/containers/FilterContainer';
// import Card from '../../Base/cards/Card';
import ProductCard from '../../Base/cards/ProductCard';
import { Link } from 'react-router-dom';

const AllProducts: React.FC = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [isListView, setIsListView] = useState(false);

  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  // };

  const community = useSelector(
    (state: RootState) => state.persisted.community
  );
  const { token } = useSelector((state: RootState) => state.persisted.auth);

  return (
    <div className='w-full py-6 mx-4 sm:px-6 lg:px-8 z-10'>
      <FilterContainer
        onFilterChange={() => console.log('filter')}
        onSortChange={() => console.log('sort')}
        onToggleView={() => setIsListView(!isListView)}
      >
        <Link to='../items/create'>Create Product</Link>
      </FilterContainer>

      <h1 className='text-3xl font-bold text-gray-900'>Products</h1>
      <CardContainer
        fetchUrl={`http://localhost:8080/api/community/products/${community}`}
        pagination={true}
        token={token}
      >
        {(product, handleDelete) => (
          <ProductCard
            product={product}
            key={product._id}
            myProduct={product.isMine}
            href={`/items/${product._id}`}
            onDeleteClick={handleDelete}
          />
        )}
      </CardContainer>
    </div>
  );
};

export default AllProducts;
