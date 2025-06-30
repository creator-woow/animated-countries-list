import { FC } from 'react';

import { Image } from 'shared/ui';
import { PropsWithClassName } from 'shared/types/props';

interface CountryFlagProps extends PropsWithClassName {
  url: string;
  alt?: string;
  height?: number;
  width?: number;
}

export const CountryFlag: FC<CountryFlagProps> = ({
  className,
  width = 50,
  height = 30,
  alt,
  url,
}) => {
  return (
    <Image
      priority
      unoptimized
      className={className}
      src={'https:' + url}
      alt={alt}
      width={width}
      height={height}
    />
  );
};
