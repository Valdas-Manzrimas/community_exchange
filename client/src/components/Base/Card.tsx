import React from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  tags: string[];
  location: string;
  isAvailable: boolean;
}

interface CardProps {
  product: Product;
  key: string;
  myProduct: boolean;
}

const Card: React.FC<CardProps> = ({ product, myProduct }) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden border border-narvik-400 relative group'>
      {/* Hover box */}
      <div className='absolute opacity-0 top-0 left-0 group-hover:opacity-60 bg-dark w-full h-full transition-opacity duration-500 shadow-inner'></div>{' '}
      <div className='w-full h-full flex items-center justify-center flex-col absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-2xl shadow-narvik-800'>
        {!myProduct && (
          <>
            <div className='w-12 h-12 rounded-full border-2 border flex items-center justify-center border-white bg-narvik-300/75 hover:bg-narvik-300 hover:shadow-2 hover:shadow-white transition-all duration-200'>
              <img
                src='/assets/imgs/theme/icons/icon-cart.svg'
                alt='Add to cart'
                className='w-8 h-8 p-1'
              />
            </div>

            <div className='w-12 h-12 mt-4 rounded-full border-2 border flex items-center justify-center border-white bg-narvik-300/75 hover:bg-narvik-300 hover:shadow-2 hover:shadow-white transition-all duration-200'>
              <img
                src='/assets/imgs/theme/icons/icon-heart.svg'
                alt='Wishlist'
                className='w-8 h-8 pt-1'
              />
            </div>
          </>
        )}

        <div className='w-12 h-12 rounded-full border-2 border flex items-center justify-center border-white mt-4 bg-narvik-300/75 hover:bg-narvik-300 hover:shadow-2 hover:shadow-white transition-all duration-200'>
          <img
            src='/assets/imgs/theme/icons/fast-arrow-right.svg'
            alt='View details'
            className='w-16 h-16 p-1'
          />
        </div>
      </div>
      {/* Hover box end */}
      <img
        className='w-full h-32 object-cover'
        src={product.images[0]}
        alt={product.name}
      />
      <div className='py-2 px-4'>
        <h2 className='text-md font-semibold'>{product.name}</h2>
        <p className='text-narvik-800 text-sm h-20 overflow-hidden leading-4 mb-0.5'>
          {product.description}
        </p>
        <div className='flex justify-between items-center'>
          <span className='text-dark text-sm px-2 pb-0.5 bg-gray-300 rounded-md'>
            {product.category}
          </span>
        </div>
        <div className='flex justify-between items-center'>
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
