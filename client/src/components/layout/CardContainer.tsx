import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Base/Card';
import { useNavigate } from 'react-router-dom';

type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  tags: string[];
  location: string;
  isAvailable: boolean;
};

const CardContainer = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product/all?limit=8`
      );

      setProducts(() => [...response.data.products]);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClick = async () => {
    navigate('/allProducts');
  };

  return (
    <div className='h-100 bg-narvik-50 mt-4 p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>

      <button
        className='bg-blue-500 hover:bg-blue-700 text-narvik-500 font-bold py-2 px-4 rounded'
        onClick={handleClick}
      >
        See more
      </button>
    </div>
  );
};

export default CardContainer;
