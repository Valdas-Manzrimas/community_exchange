import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface CardOrderBtnProps {
  className?: string;
  productId: string;
}

const CardOrderBtn: FC<CardOrderBtnProps> = ({
  className = 'flex px-3 h-8',
  productId,
}) => {
  return (
    <Link
      to={`/dashboard/order/${productId}`}
      className={`relative items-center flex justify-center min-w-[56px] rounded-full text-gray-800 transition-colors hover:bg-tertiary-100  hover:text-tertiary  ${className}`}
      title='Comments'
      onClick={(e) => e.stopPropagation()}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 24 24'
        width='20'
        height='20'
      >
        <path d='M14,22.03c-.39,0-.78-.08-1.16-.23-1.13-.47-1.84-1.52-1.85-2.75v-2.06H3.97c-2.19,0-3.97-1.8-3.97-4.01v-1.98c0-2.21,1.78-4.01,3.97-4.01h7.03v-2.06c0-1.23,.71-2.28,1.85-2.75,1.13-.47,2.38-.22,3.24,.65l6.72,6.33,.02,.02c1.55,1.55,1.55,4.07,0,5.62l-6.77,6.37c-.56,.56-1.3,.86-2.06,.86ZM3.97,8.99c-1.09,0-1.97,.9-1.97,2.01v1.98c0,1.11,.89,2.01,1.97,2.01H12c.55,0,1,.45,1,1v3.06c0,.6,.47,.84,.61,.9,.14,.06,.64,.22,1.07-.21l6.77-6.37c.74-.74,.75-1.99-.01-2.76l-6.73-6.33c-.45-.45-.95-.29-1.09-.24-.14,.06-.61,.3-.61,.9v3.05c0,.55-.45,1-1,1H3.97Z' />
      </svg>
    </Link>
  );
};

export default CardOrderBtn;
