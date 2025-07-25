import { FC } from 'react';
import NextImage from 'next/image';

import { PropsWithClassName } from 'shared/types/props';

interface ImageProps extends PropsWithClassName {
  width: number;
  height: number;
  src?: string;
  alt?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover';
  unoptimized?: boolean;
  onError?: () => void;
}

export const Image: FC<ImageProps> = ({
  className,
  alt = '',
  src = '',
  objectFit = 'cover',
  height,
  priority,
  unoptimized,
  width,
  onError,
}) => {
  return (
    <NextImage
      className={className}
      src={src}
      alt={alt}
      height={height}
      width={width}
      priority={priority}
      objectFit={objectFit}
      unoptimized={unoptimized}
      onError={onError}
    />
  );
};
