import React, { useState } from 'react';
import { Product } from '../../types/ProductTypes';
import { Link } from 'react-router-dom';
import ModalContainer from '../layout/ModalContainer';

interface CardProps {
  product: Product;
  key: string;
  myProduct: boolean;
  onDeleteClick: (productId: string, token: string) => void;
}

const Card: React.FC<CardProps> = ({ product, myProduct, onDeleteClick }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  const handleConfirm = () => {
    onDeleteClick(product._id, 'token');
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden border border-narvik-400 relative group'>
      <ModalContainer
        title='Delete Product'
        isOpen={isModalOpen}
        toggleModal={() => setModalOpen(!isModalOpen)}
        confirm
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        Are you sure you want to delete this product?
      </ModalContainer>
      {/* Hover box */}
      <div className='absolute opacity-0 top-0 left-0 group-hover:opacity-60 bg-dark w-full h-full transition-opacity duration-500 shadow-inner'></div>{' '}
      <div className='w-full h-full flex items-center justify-center flex-col absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-2xl shadow-narvik-800'>
        {!myProduct && (
          <>
            <div className='w-12 h-12 rounded-full border flex items-center justify-center border-white bg-narvik-300/75 hover:bg-narvik-300 hover:shadow-2 hover:shadow-white transition-all duration-200'>
              <img
                src='/assets/imgs/theme/icons/icon-cart.svg'
                alt='Add to cart'
                className='w-8 h-8 p-1'
              />
            </div>

            <div className='w-12 h-12 mt-4 rounded-full border flex items-center justify-center border-white bg-narvik-300/75 hover:bg-narvik-300 hover:shadow-2 hover:shadow-white transition-all duration-200'>
              <img
                src='/assets/imgs/theme/icons/icon-heart.svg'
                alt='Wishlist'
                className='w-8 h-8 pt-1'
              />
            </div>
          </>
        )}
        {myProduct && (
          <>
            <div
              className='w-12 h-12 rounded-full border flex items-center justify-center border-white mt-4 bg-narvik-300/75 hover:bg-narvik-300 hover:shadow-2 hover:shadow-white transition-all duration-200'
              onClick={handleDeleteClick}
            >
              <img
                src='/assets/imgs/theme/icons/trash.svg'
                alt='View details'
                className='w-10 h-10 p-1'
              />
            </div>
            <div className='w-12 h-12 rounded-full border flex items-center justify-center border-white mt-4 bg-narvik-300/75 hover:bg-narvik-300 hover:shadow-2 hover:shadow-white transition-all duration-200'>
              <img
                src='/assets/imgs/theme/icons/edit.svg'
                alt='View details'
                className='w-8 h-8 p-1'
              />
            </div>
          </>
        )}
        <Link to={`/product/${product._id}`}>
          <div className='w-12 h-12 rounded-full border flex items-center justify-center border-white mt-4 bg-narvik-300/75 hover:bg-narvik-300 hover:shadow-2 hover:shadow-white transition-all duration-200'>
            <img
              src='/assets/imgs/theme/icons/fast-arrow-right.svg'
              alt='View details'
              className='w-16 h-16 p-1'
            />
          </div>
        </Link>
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
