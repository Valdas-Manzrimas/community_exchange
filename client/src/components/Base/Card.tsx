import React from 'react';

interface Product {
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
}

interface CardProps {
  product: Product;
  key: string;
}

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <img
        className='w-full h-48 object-cover'
        src={product.images[0]}
        alt={product.name}
      />
      <div className='p-4'>
        <h2 className='text-lg font-semibold'>{product.name}</h2>
        <p className='text-gray-600'>{product.description}</p>
        <div className='flex justify-between items-center mt-4'>
          <p className='text-gray-600'>{product.category}</p>
          <p className='text-gray-600'>{product.condition}</p>
        </div>
        <div className='flex justify-between items-center mt-4'>
          <p className='text-gray-600'>{product.location}</p>
          <p className='text-gray-600'>
            {product.isAvailable ? 'Available' : 'Not Available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
