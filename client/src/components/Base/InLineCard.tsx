import React from 'react';
import { Product } from '../../types/ProductTypes';

interface InLineCardProps {
  product: Product;
  key: string;
  myProduct: boolean;
  onDeleteClick: (productId: string, token: string) => void;
}

const InLineCard: React.FC<InLineCardProps> = ({ product, onDeleteClick }) => {
  const onEditClick = () => {
    console.log('Edit button clicked');
  };

  return (
    <tr className='divide-y hover:bg-narvik-100 '>
      <td className='py-4'>{product.name}</td>
      <td className='py-4'>
        {new Date(product.createdAt).toLocaleDateString()}
      </td>
      <td className='py-4'>{product.category}</td>
      <td className='py-4'>{product.tags}</td>
      <td className='py-4'>
        {product.isAvailable ? 'Available' : 'Not available'}
      </td>
      <td className='py-4'>{product.location}</td>
      <td className='py-4'>{product.inWishlist}</td>
      <td className='py-4'>
        <button onClick={onEditClick} className='cursor-pointer'>
          <img
            src='assets\imgs\theme\icons\edit.svg'
            alt='Edit'
            className='w-4 h-4'
          />
        </button>
        <button
          onClick={() => onDeleteClick(product._id, 'token')}
          className='cursor-pointer'
        >
          <img
            src='assets\imgs\theme\icons\trash.svg'
            alt='Edit'
            className='ml-2 w-4 h-4'
          />
        </button>
      </td>
    </tr>
  );
};

export default InLineCard;
