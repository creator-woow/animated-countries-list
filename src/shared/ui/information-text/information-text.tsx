import { FC, PropsWithChildren } from 'react';

import { clsx } from 'shared/lib';

type InformationTextProps = PropsWithChildren<{
  className?: string;
  error?: boolean;
  info?: boolean;
}>;

export const InformationText: FC<InformationTextProps> = ({
  className,
  children,
  error,
  info,
}) => {
  return (
    <div
      className={clsx(className, 'text-sm', {
        'text-danger-300': error,
        'text-unaccented-500': info,
      })}
    >
      {children}
    </div>
  );
};
