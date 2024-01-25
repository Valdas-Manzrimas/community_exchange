import { useState } from 'react';
import CardContainer from '../../layout/containers/CardContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import FilterContainer from '../../layout/containers/FilterContainer';
import ModalContainer from '../../layout/containers/ModalContainer';
import CreateProduct from './CreateProduct';
import Layout from '../../layout/Layout';
import Card from '../../Base/cards/Card';

const Dashboard: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.persisted.auth);
  const community = useSelector(
    (state: RootState) => state.persisted.community
  );
  const [isListView, setIsListView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='w-full bg-gray-300 flex z-10'>
      <Layout
        children={
          <>
            <FilterContainer
              onFilterChange={() => console.log('filter')}
              onSortChange={() => console.log('sort')}
              onToggleView={() => setIsListView(!isListView)}
            />
            <ModalContainer
              title='Create Product'
              isOpen={isModalOpen}
              toggleModal={() => setIsModalOpen(!isModalOpen)}
            >
              <CreateProduct />
            </ModalContainer>
            <CardContainer
              fetchUrl={`http://localhost:8080/api/community/products/${community}`}
              pagination={true}
              token={token}
            >
              {(product, handleDelete) => (
                <Card
                  product={product}
                  key={product._id}
                  myProduct={product.isMine}
                  onDeleteClick={handleDelete}
                />
              )}
            </CardContainer>
          </>
        }
      />
    </div>
  );
};

export default Dashboard;
