import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import useProduct from '../../Base/functions/hooks/useProduct';
import LoadingSpinner from '../../Base/LoadingSpinner';

const SingleProduct = () => {
  const { productId = '' } = useParams();

  const { product, productLoading } = useProduct(productId);

  const [mainImage, setMainImage] = useState<string | null>(null);

  const userId = useSelector((state: RootState) => state.persisted.user.id);

  useEffect(() => {
    if (product && product.images.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  if (productLoading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const isOwner = userId === product.owner;

  return (
    <div className='w-full flex flex-col justify-center max-w-screen-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col md:flex-row ml-4 mr-16'>
        <div className='w-1/2 flex flex-col items-center justify-center'>
          <div className='w-3/4 h-[660px] mt-8 rounded-lg flex flex-col items-center justify-center'>
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                className=' h-4/6 object-cover mt-8'
              />
            ) : (
              <img
                src={'/assets/imgs/theme/404.png'}
                alt={product.name}
                className=' h-full object-cover'
              />
            )}
            <div className='w-full flex space-x-2 mt-3 self-start p-2 bg-gray-50'>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index}`}
                  className='w-24 h-24 object-cover cursor-pointer'
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='w-1/2 pl-4'>
          <h1 className='text-2xl font-bold my-8 text-center'>
            {product.name}
          </h1>
          <div className='mb-6'>
            <span className='font-bold text-gray-700'>
              Product Description:
            </span>
            <p className='text-gray-600 mt-2'>{product.description}</p>
          </div>
          <div className='my-6 flex items-center'>
            <span className='font-bold text-gray-700'>Categories:</span>
            <p className='text-gray-600 ml-8'>{product.category}</p>
          </div>
          <div className='my-6 flex items-center'>
            <span className='font-bold text-gray-700'>Location:</span>
            <p className='text-gray-600 ml-8'>{product.location}</p>
          </div>
          <div className='my-6 flex items-center'>
            <span className='font-bold text-gray-700'>Available:</span>
            <p className='text-gray-600 ml-8'>
              {product.isAvailable ? 'Yes' : 'No'}
            </p>
          </div>
          <div className='my-6 flex items-center'>
            <span className='font-bold text-gray-700'>In Wishlist:</span>
            <p className='text-gray-600 ml-8'>{product.inWishlist}</p>
          </div>
          <div className='my-6 flex items-center'>
            <span className='font-bold text-gray-700'>Created:</span>
            <p className='text-gray-600 ml-8'>
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>

          {isOwner && product.updatedAt && (
            <div className='my-6 flex items-center'>
              <span className='font-bold text-gray-700'>Updated At:</span>
              <p className='text-gray-600 ml-8'>
                {new Date(product.updatedAt).toLocaleDateString()}
              </p>
            </div>
          )}
          <div className='my-6 flex items-center'>
            <span className='font-bold text-gray-700'>Tags:</span>
            <p className='text-gray-600 ml-8'>
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
      <div className='w-full flex mx-2 mt-16 justify-center'>
        {!isOwner && (
          <>
            <div className='w-1/4 px-2'>
              <button className='w-full bg-narvik-300 py-2 px-4 rounded-full font-bold hover:bg-narvik-400'>
                Offer Order
              </button>
            </div>
            <div className='w-1/4 px-2'>
              <button className='w-full bg-gray-300 py-2 px-4 rounded-full font-bold hover:bg-gray-400 '>
                Add to Wishlist
              </button>
            </div>
          </>
        )}
        {isOwner && (
          <div className='w-1/4 px-2'>
            <button className='w-full bg-gray-100 border py-2 px-4 rounded-full font-bold hover:bg-bermuda '>
              Edit mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
