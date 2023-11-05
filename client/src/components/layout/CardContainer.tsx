import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Base/Card';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/ProductTypes';
import Pagination from '../Base/Pagination';
import LoadingSpinner from '../Base/LoadingSpinner';

interface CardContainerProps {
  fetchUrl: string;
  pagination: boolean;
  token?: string | null;
  onPageChange?: (newPage: number) => void;
  currentPage?: number;
}

const CardContainer: React.FC<CardContainerProps> = ({
  fetchUrl,
  currentPage,
  pagination,
  token,
  onPageChange,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(fetchUrl, {
          headers: token ? { 'x-access-token': token } : {},
        });

        setProducts(() => [...response.data.products]);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error: unknown) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchProducts();
  }, [fetchUrl, token]);

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };
  const handleClick = async () => {
    navigate('/allProducts');
  };

  return (
    <div className='h-100 bg-narvik-50 mt-4 p-4'>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {products.map((product) => (
              <Card product={product} key={product._id} />
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
