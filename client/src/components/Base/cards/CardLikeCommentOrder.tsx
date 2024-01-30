import { FC } from 'react';
import CardCommentBtn from './CardCommentBtn';
import CardLikeAction from './CardLikeAction';
import CardOrderBtn from './CardOrderBtn';

export interface CardLikeAndCommentProps {
  className?: string;
  itemClass?: string;
  hiddenCommentOnMobile?: boolean;
  useOnSinglePage?: boolean;
  orderProductId: string;
}

const CardLikeAndComment: FC<CardLikeAndCommentProps> = ({
  className = '',
  itemClass = 'px-2 h-6 text-xs',
  hiddenCommentOnMobile = true,
  useOnSinglePage = false,
  orderProductId,
}) => {
  return (
    <div className={`w-full flex items-center space-x-2 ${className}`}>
      <CardLikeAction className={itemClass} />
      <CardCommentBtn
        className={`${
          hiddenCommentOnMobile ? 'hidden sm:flex' : 'flex'
        }  ${itemClass}`}
        isATagOnSingle={useOnSinglePage}
      />
      <div className='w-full flex justify-end'>
        <CardOrderBtn className={itemClass} productId={orderProductId} />
      </div>
    </div>
  );
};

export default CardLikeAndComment;
