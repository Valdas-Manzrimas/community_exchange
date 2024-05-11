//OrderPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import useProduct from '../../Base/functions/hooks/useProduct';
import LoadingSpinner from '../../Base/LoadingSpinner';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import useUser from '../../Base/functions/hooks/useUser';
import MyProducts from '../../Base/functions/hooks/myProducts';
import Dropdown from '../../Base/Dropdown';

const OrderPage: React.FC = () => {
  const { productId = '' } = useParams<{ productId: string }>();

  const { id } = useSelector((state: RootState) => state.persisted.user);

  const { product, productLoading } = useProduct(productId);
  const { user, userLoading } = useUser(id);
  const { myProducts, myProductsLoading } = MyProducts();

  if (productLoading && userLoading && myProductsLoading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='flex flex-col w-full items-center space-y-8'>
      <h1 className='font-bold text-[2rem]'>Exchange form</h1>

      {/* First Row - requested item info */}

      <div className='w-full p-4 bg-white shadow rounded-lg flex'>
        <img
          src={product.images[0]}
          alt={product.name}
          className='max-w-[300px] h-auto object-cover'
        />
        <div className='lg:w-1/3 p-4 '>
          <h2 className='font-bold text-center'>Requested Item Info</h2>
          <br />
          <p>Product: {product?.name}</p>
          <p>Description: {product?.description}</p>
          <p>Location: {product.location}</p>
          <p>
            Created at: {new Date(product.createdAt).toLocaleDateString()}
          </p>{' '}
        </div>
        <div className='lg:w-1/3 p-4'>
          <br />
          <h2 className='font-bold text-center'>Item owner Info</h2>
          <p>Owner: {product.ownerName}</p>
          <p>Address: {'FETCHED USER ADDRESS'}</p>
          <p>City: {'FETCHED USER CITY'}</p>
          <p>Telephone Number: {'FETCHED USER PHONE NUMBER'}</p>
          <p>Email: {'FETCHED USER EMAIL'}</p>
        </div>
      </div>

      {/* Second Row - my info */}
      <div className='w-full max-w-2xl p-4 bg-white shadow rounded-lg grid grid-cols-2 gap-4 items-center'>
        <h2 className='col-span-2 text-2xl font-bold mb-4'>Requester Form</h2>

        <label className='text-gray-700 text-sm font-bold'>Full name:</label>
        <p>
          {user?.firstName} {user?.lastName}
        </p>

        <label className='text-gray-700 text-sm font-bold'>Phone Number:</label>
        <p>{'user phone number'}</p>

        <label className='text-gray-700 text-sm font-bold'>City:</label>
        <p className=''>{user?.city}</p>

        <label className='text-gray-700 text-sm font-bold '>
          Select your product to exchange:
        </label>
        <Dropdown
          buttonText='Select a product'
          buttonStyles='border border-primary px-2 py-1 rounded-lg text-left max-h-[34px] max-w-[250px] line-clamp-1'
          options={myProducts?.map((product) => ({
            key: product._id,
            value: (
              <div className='flex items-center'>
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className='w-8 h-8 mr-3'
                  />
                ) : (
                  <img
                    src='/assets/imgs/theme/404.png'
                    alt={product.name}
                    className='w-8 h-8 mr-3'
                  />
                )}

                <p className='line-clamp-2'>{product.name}</p>
              </div>
            ),
            displayValue: product.name, // pass the product name as the display text
          }))}
          onOptionClick={(productId, productName) => {
            console.log('Selected product ID:', productId);
            console.log('Selected product name:', productName);
          }}
        />

        <label className='text-gray-700 text-sm font-bold'>Description:</label>
        <textarea
          name='desc'
          id='desc'
          cols={15}
          rows={3}
          placeholder='Leave a desciption'
          className='w-full p-2 border border-primary rounded-lg'
        ></textarea>
      </div>

      {/* <OrderItemContainer
        user={{
          fullName: user?.firstName || '',
          phoneNumber: user?.phone || '',
          city: user?.city || '',
        }}
        product={product.createdAt}
        title='Requested Item Information'
      /> */}
      {/* 
      <OrderItemContainer
        user={{
          fullName: user?.firstName || '',
          phoneNumber: user?.phone || '',
          city: user?.city || '',
        }}
        product={selectedProduct || {}}
        title='Requester Form'
      /> */}
    </div>
  );
};

export default OrderPage;
