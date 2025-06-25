import { FC } from 'react';

import { Image } from 'shared/ui';

interface CountryFlagProps {
  className?: string;
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
      className={className}
      src={'https:' + url}
      alt={alt}
      width={width}
      height={height}
      priority
      unoptimized
    />
  );
};
