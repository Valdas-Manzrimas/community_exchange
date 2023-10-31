import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Base/Card';

type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  owner: string;
  images: string[];
  tags: string[];
  condition: string;
  location: string;
  isAvailable: boolean;
  wantedProducts: string[];
};

const CardContainer = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (page: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product/all?page=${page + 1}`
      );

      if (currentPage > 1) {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...response.data.products,
        ]);
      }

      setProducts((prevProducts) => [...response.data.products]);
      setTotalPages(response.data.totalPages);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className='h-100 bg-narvik-50 mt-20'>
      {error && <p>{error}</p>}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>
      {currentPage < totalPages && (
        <button
          className='bg-blue-500 hover:bg-blue-700 text-narvik-500 font-bold py-2 px-4 rounded'
          onClick={loadMore}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default CardContainer;
