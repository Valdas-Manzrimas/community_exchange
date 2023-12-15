import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { handleErrors } from '../Base/functions/handleErrors';
import { setAlert } from '../../store/slices/alertSlice';
import ImageUpload from '../Base/ImageUpload';
import LoadingSpinner from '../Base/LoadingSpinner';
import * as yup from 'yup';

type FormState = {
  name: string;
  community: string;
  description: string;
  category: string;
  tags: never[];
  owner: string;
  condition: string;
  location: string;
  isAvailable: string;
  wantedProducts: never[];
  images: File[];
};

interface CreateProductProps {
  toggleModal: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  condition: yup.string().required('Condition is required'),
  location: yup.string().required('Location is required'),
});

const CreateProduct: React.FC<CreateProductProps> = (props) => {
  const userId = useSelector((state: RootState) => state.persisted.user.id);

  const [form, setForm] = useState<FormState>({
    name: '',
    community: '', // here we need to get the community id from the state
    description: '',
    category: '',
    tags: [],
    condition: '',
    owner: userId,
    location: '',
    isAvailable: 'true',
    wantedProducts: [],
    images: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const { toggleModal } = props;
  const [resetImages, setResetImages] = useState(false);

  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.persisted.auth
  );

  const dispatch = useDispatch();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
    setFormError('');
    setIsSubmitting(false);
  };

  const handleImagesChange = (images: File[]) => {
    setResetImages(false);
    setForm((prevForm) => ({ ...prevForm, images }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsSubmitting(true);

    try {
      await schema.validate(form);

      const imageUploadPromises = form.images
        .map((image) => {
          if (image) {
            const formData = new FormData();
            formData.append('images', image);

            return axios.post(
              'http://localhost:8080/api/product/uploadImage',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );
          }
        })
        .filter(Boolean);

      const imageResponses = await Promise.all(imageUploadPromises);
      const uploadedImageLinks = imageResponses.map((res) => res && res.data);
      const productForm = { ...form, images: uploadedImageLinks };

      setResetImages(true);

      axios
        .post('http://localhost:8080/api/product/create', productForm, {
          headers: isAuthenticated && token ? { 'x-access-token': token } : {},
        })
        .then(() => {
          dispatch(
            setAlert({
              status: 'success',
              message: 'Product created successfully',
            })
          );
          setIsLoading(false);
          setError(null);

          toggleModal();
          setForm((prevForm) => ({
            ...prevForm,
            images: [],
          }));
        })
        .catch((error: unknown) => {
          setIsLoading(false);
          if (error instanceof Error) {
            setFormError(error.message);
          }
          if (axios.isAxiosError(error)) {
            setError((error as AxiosError).message);
            handleErrors(error as AxiosError, dispatch);
          }
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setFormError(error.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      {isLoading && <LoadingSpinner />}
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
              value={form.name}
              onChange={handleChange}
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
              value={form.description}
              onChange={handleChange}
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
              value={form.category}
              onChange={handleChange}
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
              value={form.tags}
              onChange={handleChange}
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
              value={form.condition}
              onChange={handleChange}
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
              value={form.location}
              onChange={handleChange}
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
                value={form.isAvailable}
                onChange={handleChange}
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
              value={form.wantedProducts}
              onChange={handleChange}
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
            <ImageUpload
              setPropImages={handleImagesChange}
              reset={resetImages}
            />
          </div>
        </div>
        {formError ||
          (error && <div className='text-error'>{formError || error}</div>)}
        <div className='flex items-center justify-center'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-narvik-600 border-narvik-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
            disabled={isSubmitting}
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
