import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Card from '../Base/Card';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/ProductTypes';
import Pagination from '../Base/Pagination';
import { handleErrors } from '../Base/functions/handleErrors';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { RootState } from '../../store';
import InLineCard from '../Base/InLineCard';
import { deleteProduct } from '../Base/functions/deleteProduct';

interface CardContainerProps {
  fetchUrl: string;
  pagination: boolean;
  token?: string | null;
  onPageChange?: (newPage: number) => void;
  currentPage?: number;
  isListView?: boolean;
}

const CardContainer: React.FC<CardContainerProps> = ({
  fetchUrl,
  currentPage,
  pagination,
  token,
  onPageChange,
  isListView = false,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);

  const userId = useSelector((state: RootState) => state.persisted.user.id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(fetchUrl, {
        headers: token ? { 'x-access-token': token } : {},
      });

      const fetchedProducts = response.data.products;

      const myProducts = fetchedProducts.map((product: Product) => {
        return {
          ...product,
          isMine: product.owner === userId,
        };
      });

      setProducts(myProducts);
      setTotalPages(response.data.totalPages);
    } catch (error: unknown) {
      handleErrors(error, dispatch);
      if (error === 403) {
        navigate('/');
      }
    }
  }, [fetchUrl, token, dispatch, userId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId, token);
    fetchProducts();
  };

  const handleClick = async () => {
    navigate('/all-products');
  };

  return (
    <div className='h-100 bg-narvik-50 mt-4 p-4'>
      {/* list view */}
      {isListView ? (
        <div className='w-full border-solid'>
          <div className='w-full'>
            <div className=''>
              <table className='w-full text-xs mb-4'>
                <thead>
                  <tr>
                    <td className='py-2'>Name</td>
                    <td className='py-2'>Create Date</td>
                    <td className='py-2'>Categories</td>
                    <td className='py-2'>Tags</td>
                    <td className='py-2'>Availability</td>
                    <td className='py-2'>Location</td>
                    <td className='py-2'>Present in wishlists</td>
                    <td className='py-2'></td>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <InLineCard
                      product={product}
                      key={product._id}
                      myProduct={product.isMine}
                      onDeleteClick={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='w-full m-1'></div>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 min-[600px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
            {products.map((product) => (
              <Card
                product={product}
                key={product._id}
                myProduct={product.isMine}
                onDeleteClick={handleDelete}
              />
            ))}
          </div>

          {pagination ? (
            <Pagination
              currentPage={currentPage || 1}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          ) : (
            <button
              className='bg-blue-500 hover:bg-blue-700 text-narvik-500 font-bold py-2 px-4 rounded'
              onClick={handleClick}
            >
              See more
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CardContainer;
