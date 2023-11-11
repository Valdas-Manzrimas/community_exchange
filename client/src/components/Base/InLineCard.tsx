import React from 'react';
import { Product } from '../../types/ProductTypes';

interface InLineCardProps {
  product: Product;
  key: string;
  myProduct: boolean;
}

const InLineCard: React.FC<InLineCardProps> = ({ product }) => {
  const onSettingsClick = () => {
    console.log('Settings clicked');
  };

  return (
    <tr className='divide-y'>
      <td className='py-2'>{product.name}</td>
      <td className='py-2'>
        {new Date(product.createdAt).toLocaleDateString()}
      </td>
      <td className='py-2'>{product.category}</td>
      <td className='py-2'>{product.tags}</td>
      <td className='py-2'>
        {product.isAvailable ? 'Available' : 'Not available'}
      </td>
      <td className='py-2'>{product.location}</td>
      <td className='py-2'>{product.inWishlist}</td>
      <td className='py-2'>
        <button onClick={onSettingsClick}>Settings</button>
      </td>
    </tr>
  );
};

export default InLineCard;
