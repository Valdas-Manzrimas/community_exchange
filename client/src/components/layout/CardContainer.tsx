import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchProducts = async () => {
      // setLoading(true);
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
        // setLoading(false);
      } catch (error: unknown) {
        // setLoading(false);
        handleErrors(error, dispatch);
        if (error === 403) {
          navigate('/');
        }
      }
    };

    fetchProducts();
  }, [fetchUrl, token, dispatch, userId]);

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };
  const handleClick = async () => {
    navigate('/all-products');
  };

  return (
    <div className='h-100 bg-narvik-50 mt-4 p-4'>
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
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {products.map((product) => (
              <Card
                product={product}
                key={product._id}
                myProduct={product.isMine}
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
