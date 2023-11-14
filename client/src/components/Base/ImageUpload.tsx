import axios from 'axios';
import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../store/slices/alertSlice';

interface ImageUploadProps {
  setPropImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setPropImages }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsUploading(true);
    const formData = new FormData();
    if (event.target.files) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }

      try {
        const response = await axios.post(
          'http://localhost:8080/api/product/uploadImage',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        // Assuming response.data is an array of image URLs
        setImages((prevImages) => [...prevImages, ...response.data.imageUrls]);
        setPropImages((prevImages) => [
          ...prevImages,
          ...response.data.imageUrls,
        ]);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsUploading(false);
      }
    } else {
      setIsUploading(false);
      console.log('No files were selected');
    }
  };

  const removeUploadedImage = async (imageName: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/product/deleteImage/${imageName}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Response is not OK');
      }

      const data = await response.json();
      dispatch(setAlert({ status: 'success', message: data.message }));
      // Remove the image from the images array
      setImages((images) =>
        images.filter((image) => {
          const url = new URL(image);
          const currentImageName = url.pathname.split('/').pop();
          return currentImageName !== imageName;
        })
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const dispatch = useDispatch();

  return (
    <>
      <div className='flex items-center justify-center bg-grey-lighter'>
        <label
          className='w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-narvik-600'
          htmlFor='file-upload'
        >
          {isUploading ? (
            <LoadingSpinner />
          ) : (
            <>
              <svg
                className='w-8 h-8'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M15 4h-3.586c-.32 0-.633.122-.866.342l-1.292 1.292c-.39.39-1.024.39-1.414 0L5.452 4.342A1.21 1.21 0 005.086 4H3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-1 10H6c-.55 0-1-.45-1-1V8h10v5c0 .55-.45 1-1 1zm-5-3a2 2 0 100-4 2 2 0 000 4z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='mt-2 text-base leading-normal'>
                Select Images
              </span>
              <input
                id='file-upload'
                type='file'
                name='images'
                className='hidden'
                multiple
                onChange={handleImageUpload}
              />
            </>
          )}
        </label>
      </div>
      <div className='flex flex-wrap mt-4'>
        {images.map((image, index) => {
          let url;
          let imageName: string | undefined;

          try {
            url = new URL(image);
            imageName = url.pathname.split('/').pop();
          } catch (_) {
            // Handle the error here. For example, you might want to set `imageName` to a default value.
            imageName = 'default';
          }

          return (
            <div
              key={index}
              className='w-full p-2 flex items-center justify-between'
            >
              <img
                src={image}
                alt={`Product Image ${index}`}
                className='w-20 h-auto'
              />
              <p className='font-2'>{imageName}</p>
              <span
                onClick={() => imageName && removeUploadedImage(imageName)}
                className='ml-2 cursor-pointer font-bold text-red-600'
              >
                X
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageUpload;
