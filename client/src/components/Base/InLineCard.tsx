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
    <div className='grid grid-cols-8 text-xs text-left w-full gap-2 px-2 mb-4 border grid-flow-col auto-cols-auto'>
      <div className='py-2'>{product.name}</div>
      <div className='py-2'>
        {new Date(product.createdAt).toLocaleDateString()}
      </div>
      <div className='py-2'>{product.category}</div>
      <div className='py-2'>{product.tags}</div>
      <div className='py-2'>
        {product.isAvailable ? 'Available' : 'Not available'}
      </div>
      <div className='py-2'>{product.location}</div>
      <div className='py-2'>{product.inWishlist}</div>
      <div className='py-2'>
        <button onClick={onSettingsClick}>Settings</button>
      </div>
    </div>
  );
};

export default InLineCard;
