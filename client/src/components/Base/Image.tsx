import { FC } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  onLoadingComplete?: () => void;
}

const Image: FC<Props> = ({
  fill = false,
  className,
  alt = '',
  style,
  onLoadingComplete,
  ...imgProps
}) => {
  return (
    <img
      {...imgProps}
      className={
        className + (fill ? ' object-cover absolute inset-0 w-full h-full' : '')
      }
      alt={alt}
      style={style}
      onLoad={onLoadingComplete}
    />
  );
};

export default Image;
