import React from 'react';
import { useParams } from 'react-router-dom';
import useProduct from '../../Base/functions/useProduct';
import LoadingSpinner from '../../Base/LoadingSpinner';

const OrderPage: React.FC = () => {
  const { productId = '' } = useParams<{ productId: string }>();

  const { product, loading } = useProduct(productId);

  // Fetch requester details
  const requesterDetails = {
    firstName: 'John',
    lastName: 'Doe',
    telephoneNumber: '1234567890',
    location: 'New York',
    activeProducts: ['Product 1', 'Product 2', 'Product 3'],
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='w-full flex flex-col md:flex-row '>
      {/* First Column */}

      <div className='w-1/2 p-4'>
        <img
          src={product.images[0]}
          alt={product.name}
          className=' h-4/6 object-cover mt-8'
        />
        <h2>Requested Item Information</h2>
        <p>Product: {product?.name}</p>
        <p>Owner: {product.ownerName}</p>
        <p>Telephone Number: {'FETCHED USER PHONE NUMBER'}</p>
        <p>Location: {product.location}</p>
        <p>
          Created at: {new Date(product.createdAt).toLocaleDateString()}
        </p>{' '}
      </div>

      {/* Second Column */}
      <div className='w-1/2 p-4'>
        <h2>Requester Form</h2>
        <p>First Name: {requesterDetails.firstName}</p>
        <p>Last Name: {requesterDetails.lastName}</p>
        <p>Telephone Number: {requesterDetails.telephoneNumber}</p>
        <p>Location: {requesterDetails.location}</p>
        <select className='mt-4'>
          {requesterDetails.activeProducts.map((product, index) => (
            <option key={index} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OrderPage;
