import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { handleErrors } from '../Base/functions/handleErrors';
import { setAlert } from '../../store/slices/alertSlice';
import ImageUpload from '../Base/ImageUpload';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');
  const [isAvailable, setIsAvailable] = useState<string>('true');
  const [wantedProducts, setWantedProducts] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.persisted.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.persisted.user.id);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const product = {
      name,
      description,
      category,
      owner: userId,
      images: images,
      tags,
      condition,
      location,
      isAvailable,
      wantedProducts: wantedProducts,
    };
    try {
      axios
        .post('http://localhost:8080/api/product/create', product, {
          headers: isAuthenticated && token ? { 'x-access-token': token } : {},
        })
        .then(() => {
          navigate('/my-products');
          dispatch(
            setAlert({
              status: 'success',
              message: 'Product created successfully',
            })
          );
        });
    } catch (error) {
      handleErrors(error, dispatch);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold mb-4'>Create Product</h1>
      <form onSubmit={handleSubmit} className='w-full max-w-lg'>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='name'
            >
              Name
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='name'
              type='text'
              placeholder='Product Name'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='description'
            >
              Description
            </label>
            <textarea
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='description'
              placeholder='Product Description'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='category'
            >
              Category
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='category'
              type='text'
              placeholder='Product Category'
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='tags'
            >
              Tags
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='tags'
              type='text'
              placeholder='Product Tags'
              value={tags}
              onChange={(event) => setTags(event.target.value.split(','))}
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='condition'
            >
              Condition
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='condition'
              type='text'
              placeholder='Product Condition'
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='location'
            >
              Location
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='location'
              type='text'
              placeholder='Product Location'
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='isAvailable'
            >
              Availability
            </label>
            <div className='relative'>
              <select
                className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='isAvailable'
                value={isAvailable}
                onChange={(event) => setIsAvailable(event.target.value)}
              >
                <option value='true'>Available</option>
                <option value='false'>Not Available</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                  <path
                    fillRule='evenodd'
                    d='M3.27 4.317a1 1 0 011.32-.083l.094.083 6 6a1 1 0 01-1.32 1.497l-.094-.083L5 7.414l-.707.707a1 1 0 01-1.497-1.32l.083-.094 2-2a1 1 0 011.32-.083l.094.083 4 4a1 1 0 01-1.32 1.497l-.094-.083L9 6.414l-.707.707a1 1 0 01-1.497-1.32l.083-.094 2-2a1 1 0 011.32-.083l.094.083 3 3a1 1 0 01-1.32 1.497l-.094-.083L11 4.414l-.707.707a1 1 0 01-1.497-1.32l.083-.094z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='wantedProducts'
            >
              Wanted Products
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='wantedProducts'
              type='text'
              placeholder='Wanted Products'
              value={wantedProducts}
              onChange={(event) =>
                setWantedProducts(event.target.value.split(','))
              }
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='images'
            >
              Images
            </label>
            <ImageUpload setPropImages={setImages} />
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-narvik-600 border-narvik-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
