import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../../types/ProductTypes';
import CategoryBadgeList from './CategoryBadgeList';
import CardMeta from './CardMeta';
import CardLikeAndComment from './CardLikeAndComment';

export interface ProductCardProps {
  className?: string;
  product: Product;
  key: string;
  ratio?: string;
  myProduct: boolean;
  href: string;
  onDeleteClick: (productId: string, token: string) => void;
}

const ProductCard: FC<ProductCardProps> = ({
  className = 'h-full',
  product,
  href,
}) => {
  const { category, name, images } = product;

  //   const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  const navigateToProduct = () => {
    navigate(`/dashboard${href}`);
  };

  return (
    <div
      className={`relative flex flex-col group rounded-3xl overflow-hidden bg-white max-w-[280px] hover:shadow-md hover:transition-shadow ${className}`}
      onClick={navigateToProduct}
    >
      <div className={`block relative w-full rounded-t-3xl z-10 h-56`}>
        <div className='relative w-full h-full rounded-t-3xl z-10'>
          <div className='w-full h-full'>
            {images.length > 0 ? (
              <img
                className='object-cover absolute inset-0 w-full h-full'
                src={images[0]}
                alt={name}
              />
            ) : (
              <img
                className='object-cover absolute inset-0 w-full h-full opacity-25'
                src='/assets/imgs/background/image-not-found.png'
                alt='something'
              />
            )}
          </div>
          <span className='absolute top-2 inset-x-3 z-10'>
            <CategoryBadgeList category={category} />
          </span>
        </div>
      </div>
      <Link to={href} className='absolute inset-0'></Link>

      <div className='p-2 flex flex-col space-y-3'>
        <div className='flex w-full'>
          <CardMeta
            meta={['owner', 'createdAt', 'location', 'isAvailable']}
            product={product}
          />
        </div>
        <h3 className='block text-base font-semibold text-dark'>
          <span className='line-clamp-2 leading-normal h-[3rem]' title={name}>
            {name}
          </span>
        </h3>

        {/* buttons */}
        <div className='flex justify-between items-center'>
          <CardLikeAndComment className='relative' />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
