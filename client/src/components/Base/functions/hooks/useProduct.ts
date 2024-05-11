// useProduct.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../../../../types/ProductTypes';

const useProduct = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [productLoading, setProductLoading] = useState<boolean>(false);

  useEffect(() => {
    setProductLoading(true);
    axios
      .get(`http://localhost:8080/api/product/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setProductLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setProductLoading(false);
        throw error;
      });
  }, [productId]);

  return { product, productLoading };
};

export default useProduct;
