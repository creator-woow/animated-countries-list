import { CSSProperties, FC, PropsWithChildren } from 'react';

import { Link as NavLink, clsx } from 'shared/lib';
import { Locale } from 'shared/config';
import { PropsWithClassName } from 'shared/types/props';

interface LinkProps extends PropsWithChildren, PropsWithClassName {
  href?: string;
  style?: CSSProperties;
  locale?: Locale;
  ariaLabel?: string;
  shallow?: boolean;
  replace?: boolean;
}

export const Link: FC<LinkProps> = ({
  className,
  href = '',
  style,
  ariaLabel,
  locale,
  children,
  shallow,
  replace,
}) => {
  return (
    <NavLink
      className={clsx(
        className,
        'hover:opacity-70',
        'transition-opacity duration-200',
      )}
      style={style}
      href={href}
      locale={locale}
      aria-label={ariaLabel}
      shallow={shallow}
      replace={replace}
    >
      {children}
    </NavLink>
  );
};
