import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Card from '../Base/Card';
import { RootState } from '../../store';
import { Product } from '../../types/ProductTypes';
import LoadingSpinner from '../Base/LoadingSpinner';

const MyProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.persisted.auth
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/product/owned?page=${currentPage}`,
          {
            headers: {
              'x-access-token': token,
            },
          }
        );
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated, currentPage, token]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>My Products</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
          <div className='pagination'>
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyProducts;
