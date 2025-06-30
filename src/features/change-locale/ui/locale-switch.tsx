'use client';

import { FC } from 'react';

import { Locale, RoutePath } from 'shared/config';
import { clsx, useLocale } from 'shared/lib';
import { Link } from 'shared/ui';
import { PropsWithClassName } from 'shared/types/props';
import { useSearchParams } from 'next/navigation';

export const LocaleSwitch: FC<PropsWithClassName> = ({}) => {
  const activeLocale = useLocale();
  const queryParams = useSearchParams();

  return (
    <div className="flex items-baseline gap-1">
      <Link
        shallow
        className={clsx({
          'opacity-30 pointer-events-none': activeLocale === Locale.Russian,
        })}
        href={RoutePath.Countries + '?' + queryParams}
        locale={Locale.Russian}
      >
        RU
      </Link>
      /
      <Link
        shallow
        className={clsx({
          'opacity-30 pointer-events-none': activeLocale === Locale.English,
        })}
        href={RoutePath.Countries + '?' + queryParams}
        locale={Locale.English}
      >
        EN
      </Link>
    </div>
  );
};
