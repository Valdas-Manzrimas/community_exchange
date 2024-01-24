import { FC } from 'react';
import { Product } from '../../../types/ProductTypes';

export interface CardMetaProps {
  className?: string;
  product: Product;
  meta: ('owner' | 'location' | 'isAvailable' | 'createdAt')[];
}

const CardMeta: FC<CardMetaProps> = ({
  className = 'leading-none text-xs',
  product,
  meta,
}) => {
  return (
    <div
      className={`w-full grid grid-cols-2 grid-rows-2 gap-y-0 text-gray-600 ${className}`}
    >
      {meta.slice(0, 4).map((metaItem, index) => {
        let content;

        switch (metaItem) {
          case 'owner':
            content = product.ownerName;
            break;
          case 'location':
            content = product.location;
            break;
          case 'isAvailable':
            content = product.isAvailable ? 'Available' : 'Not Available';
            break;
          case 'createdAt':
            content = new Date(product.createdAt).toLocaleDateString();
            break;
          default:
            content = '';
        }

        return (
          <span
            className={`block font-medium text-sm ${
              index % 2 !== 0 ? 'text-right' : ''
            }`}
          >
            {content}
          </span>
        );
      })}
    </div>
  );
};

export default CardMeta;
