import { useState, useEffect } from 'react';
import { useRef } from 'react';

interface ImageUploadProps {
  setPropImages: (images: File[]) => void;
  reset: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setPropImages, reset }) => {
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (reset) {
      setImages([]);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [reset]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);

      setImages(files);
      setPropImages(files);
    } else {
      setImages([]);
      setPropImages([]);

      console.log('No files were selected');
    }
  };

  const removeUploadedImage = (index: number) => {
    setImages((prevImages: File[]) => {
      const newImages = prevImages.filter((_, i) => i !== index);
      setPropImages(newImages);
      return newImages;
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className='flex items-center justify-center bg-grey-lighter'>
        <label
          className='w-full flex flex-col items-center px-4 py-6 bg-white text-primary rounded-lg shadow-lg tracking-wide uppercase border border-primary cursor-pointer hover:border-teal hover:text-teal transition-colors transition-500'
          htmlFor='file-upload'
        >
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
            <span className='mt-2 text-base leading-normal'>Select Images</span>
            <input
              ref={inputRef}
              id='file-upload'
              type='file'
              name='images'
              className='hidden'
              multiple
              onChange={handleImageUpload}
            />
          </>
        </label>
      </div>
      <div className='flex flex-wrap mt-4'>
        {images.map((image, index) => (
          <div
            key={index}
            className='w-full p-2 flex items-center justify-between'
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Product Image ${index}`}
              className='w-20 h-auto'
            />
            <p className='font-2'>{image.name}</p>
            <span
              onClick={() => removeUploadedImage(index)}
              className='ml-2 cursor-pointer font-bold text-red-600'
            >
              X
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageUpload;
