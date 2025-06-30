import { FC } from 'react';

import { clsx } from 'shared/lib';

import './loader.css';
import { PropsWithClassName } from 'shared/types/props';

interface LoaderProps extends PropsWithClassName {}

export const Loader: FC<LoaderProps> = ({ className }) => {
  return <span className={clsx(className, 'loader', 'w-[20px] h-[20px]')} />;
};
