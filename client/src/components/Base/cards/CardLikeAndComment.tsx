import { FC } from 'react';
import CardCommentBtn from './CardCommentBtn';
import CardLikeAction from './CardLikeAction';

export interface CardLikeAndCommentProps {
  className?: string;
  itemClass?: string;
  hiddenCommentOnMobile?: boolean;
  useOnSinglePage?: boolean;
}

const CardLikeAndComment: FC<CardLikeAndCommentProps> = ({
  className = '',
  itemClass = 'px-2 h-6 text-xs',
  hiddenCommentOnMobile = true,
  useOnSinglePage = false,
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <CardLikeAction className={itemClass} />
      <CardCommentBtn
        className={`${
          hiddenCommentOnMobile ? 'hidden sm:flex' : 'flex'
        }  ${itemClass}`}
        isATagOnSingle={useOnSinglePage}
      />
    </div>
  );
};

export default CardLikeAndComment;
