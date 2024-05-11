//CardContainer.tsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../types/ProductTypes';
import Pagination from '../../utils/Pagination';
import { handleErrors } from '../../Base/functions/handleErrors';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { deleteProduct } from '../../Base/functions/deleteProduct';
import api from '../../../store/api';

interface CardContainerProps {
  fetchUrl: string;
  pagination: boolean;
  token?: string | null;
  onPageChange?: (newPage: number) => void;
  currentPage?: number;
  isListView?: boolean;
  children: (
    product: Product,
    handleDelete: (productId: string) => void
  ) => React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({
  fetchUrl,
  currentPage: initialCurrentPage = 1,
  pagination,
  token,
  onPageChange,
  isListView = false,
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(initialCurrentPage);

  const userId = useSelector((state: RootState) => state.persisted.user.id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.get(fetchUrl, {
        params: {
          limit: 10,
          page: currentPage,
        },
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
      throw error;
    }
  }, [fetchUrl, token, dispatch, userId, navigate, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleDelete = useCallback(
    async (productId: string) => {
      await deleteProduct(productId, token);
      fetchProducts();
    },
    [token, fetchProducts]
  );

  const handleClick = () => {
    navigate('/all-products');
  };

  return (
    <div className='w-full bg-narvik-50 mt-4 p-4'>
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
                  {products.map((product) => children(product, handleDelete))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='w-full m-1'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 min-[600px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 min-[1500px]:grid-cols-4 2xl:grid-cols-5 gap-4 '>
          {!products.length ? (
            <div>No products found</div>
          ) : (
            products.map((product) => children(product, handleDelete))
          )}
        </div>
      )}
      {pagination ? (
        <Pagination
          currentPage={initialCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : (
        <button
          className='bg-blue-500 hover:bg-blue-700 text-narvik-500 font-bold py-2 px-4 rounded'
          onClick={handleClick}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default CardContainer;
