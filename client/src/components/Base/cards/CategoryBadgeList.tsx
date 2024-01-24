import { FC } from 'react';
import Badge from './Badge';
import { Categories, categoryColors } from '../../../types/ProductTypes';

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  category: Categories;
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = 'flex flex-wrap space-x-2',
  itemClass,
  category,
}) => {
  return (
    <div className={`${className}`}>
      <Badge
        className={itemClass}
        name={category}
        href={category}
        color={categoryColors[category]}
      />
    </div>
  );
};

export default CategoryBadgeList;
