// useProduct.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../../../types/ProductTypes';

const useProduct = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/product/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [productId]);

  return { product, loading };
};

export default useProduct;
