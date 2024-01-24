import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../types/ProductTypes';

export interface ProductCardProps {
  className?: string;
  product: Product;
  key: string;
  ratio: string;
  myProduct: boolean;
  href: string;
  onDeleteClick: (productId: string, token: string) => void;
}

const ProductCard: FC<ProductCardProps> = ({
  className = 'h-full',
  product,
  href,
  ratio = 'aspect-w-4 aspect-h-3',
}) => {
  const { category, name } = product;

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`relative flex flex-col group rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 ${className} ${
        isHover ? 'shadow-xl' : 'shadow-md'
      }}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-3xl overflow-hidden z-10 ${ratio}`}
      ></div>
      <Link to={href} className='absolute inset-0'></Link>
      <span className='text-dark text-sm px-2 pb-0.5 bg-gray-300 rounded-md'>
        {category}
      </span>

      <div className='p-4 flex flex-col space-y-3'>
        <h3 className='nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100'>
          <span className='line-clamp-2' title={name}>
            {name}
          </span>
        </h3>
        {/* <div className='flex items-end justify-between mt-auto'>
          <PostCardLikeAndComment className='relative' />
          <PostCardSaveAction className='relative' />
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
