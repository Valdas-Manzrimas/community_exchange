// OrderItemContainer.tsx
import React from 'react';
import Dropdown from '../../Base/Dropdown';

type User = {
  fullName: string;
  phoneNumber: string | number;
  city: string;
};

type Product = {
  _id: string;
  images: string[];
  name: string;
  ownerName: string;
  location: string;
  createdAt: string;
};

type OrderItemContainerProps = {
  user: User;
  product: Product[];
  title: string;
};

const OrderItemContainer: React.FC<OrderItemContainerProps> = ({
  user,
  product,
  title,
}) => {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );

  return (
    <div className='w-full max-w-2xl p-4 bg-white shadow rounded-lg grid grid-cols-2 gap-4 items-center'>
      <h2 className='col-span-2 text-2xl font-bold mb-4'>{title}</h2>

      <div>
        <Dropdown
          buttonText='Select a product'
          buttonStyles='border border-primary px-2 py-1 rounded-lg text-left max-h-[34px] max-w-[250px] line-clamp-1'
          options={product.map((product) => ({
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
            displayValue: product.name,
          }))}
          onOptionClick={(productId) => {
            const selectedProduct = product.find(
              (product) => product._id === productId
            );
            setSelectedProduct(selectedProduct || null);
          }}
        />

        {selectedProduct && (
          <>
            <img
              src={selectedProduct.images[0]}
              alt={selectedProduct.name}
              className='w-1/2 h-auto object-cover'
            />
            <p>Product: {selectedProduct.name}</p>
            <p>Owner: {selectedProduct.ownerName}</p>
            <p>Location: {selectedProduct.location}</p>
            <p>
              Created at:{' '}
              {new Date(selectedProduct.createdAt).toLocaleDateString()}
            </p>
          </>
        )}
      </div>

      <div>
        <p>Full name: {user.fullName}</p>
        <p>Phone Number: {user.phoneNumber}</p>
        <p>City: {user.city}</p>
      </div>
    </div>
  );
};

export default OrderItemContainer;
