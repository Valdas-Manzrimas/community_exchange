import { MainColor } from '../../../types/ProductTypes';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface BadgeProps {
  className?: string;
  name: ReactNode;
  color?: MainColor;
  href?: string;
}

const Badge: FC<BadgeProps> = ({
  className = 'absolute',
  name,
  color = 'light',
  href,
}) => {
  const getColorClass = (hasHover = true) => {
    switch (color) {
      case 'pink':
        return `text-light bg-pink ${hasHover ? 'hover:bg-pink' : ''}`;
      case 'red':
        return `text-light bg-red-400 ${hasHover ? 'hover:bg-red-300' : ''}`;
      case 'gray':
        return `text-light bg-gray ${hasHover ? 'hover:bg-gray' : ''}`;
      case 'green':
        return `text-light bg-green ${hasHover ? 'hover:bg-green' : ''}`;
      case 'purple':
        return `text-light bg-purple ${hasHover ? 'hover:bg-purple' : ''}`;
      case 'indigo':
        return `text-light bg-indigo ${hasHover ? 'hover:bg-indigo' : ''}`;
      case 'yellow':
        return `text-dark bg-yellow ${hasHover ? 'hover:bg-yellow' : ''}`;
      case 'blue':
        return `text-light bg-blue ${hasHover ? 'hover:bg-blue' : ''}`;
      case 'teal':
        return `text-light bg-teal ${hasHover ? 'hover:bg-teal' : ''}`;
      default:
        return `text-dark bg-light ${hasHover ? 'hover:bg-pink' : ''}`;
    }
  };

  const CLASSES =
    'inline-flex px-2.5 py-1 rounded-full font-medium text-xs ' + className;
  return !href ? (
    <Link
      to={href || '/'}
      className={`transition-colors duration-300 ${CLASSES} ${getColorClass()}`}
    >
      {name}
    </Link>
  ) : (
    <span className={`${CLASSES} ${getColorClass(false)} `}>{name}</span>
  );
};

export default Badge;
