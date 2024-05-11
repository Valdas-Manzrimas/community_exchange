import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../../../../types/ProductTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const MyProducts = (): {
  myProducts: Product[];
  myProductsLoading: boolean;
} => {
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [myProductsLoading, setMyProductLoading] = useState<boolean>(false);

  const { token } = useSelector((state: RootState) => state.persisted.auth);
  useEffect(() => {
    setMyProductLoading(true);
    axios
      .get(`http://localhost:8080/api/product/owned`, {
        headers: token ? { 'x-access-token': token } : {},
      })
      .then((response) => {
        setMyProducts(response.data);
        setMyProductLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setMyProductLoading(false);
        throw error;
      });
  }, [token]);

  return { myProducts, myProductsLoading };
};

export default MyProducts;
