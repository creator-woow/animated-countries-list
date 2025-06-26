import { FC, memo } from 'react';
import { AppConfig } from 'next-intl';
import { motion } from 'framer-motion';

import { Button, Link, VirtualListChildProps } from 'shared/ui';
import { Country, CountryFlag } from 'entities/country';
import { RouteParam, RoutePath } from 'shared/config';
import { clsx } from 'shared/lib';

import { DELETING_ANIMATION_DURATION_SECONDS } from '../lib/const';
import { areEqual } from 'react-window';

interface CountryListElementProps extends VirtualListChildProps<Country[]> {
  messages: AppConfig['Messages']['countries'];
  isComingUp?: boolean;
  isComingDown?: boolean;
  isDeleting?: boolean;
  onStartDeleteAnimations?: () => void;
}

export const CountriesListElement: FC<CountryListElementProps> = memo(
  ({
    index,
    data: countries,
    messages,
    style,
    isComingUp,
    isComingDown,
    isDeleting,
    onStartDeleteAnimations,
  }) => {
    const country = countries[index];

    return (
      <motion.li
        className={clsx(
          'flex items-center gap-4 p-4 border-b border-gray-300',
          {
            'pointer-events-none': isDeleting,
            'last:border-b-0': !isDeleting,
          },
        )}
        style={style}
        initial={{ opacity: 1, translateY: 0, translateX: 0 }}
        animate={{
          translateY: isComingDown ? `100%` : isComingUp ? `-100%` : 0,
          translateX: isDeleting ? '100%' : 0,
          opacity: isDeleting ? 0 : 1,
        }}
        transition={{ duration: DELETING_ANIMATION_DURATION_SECONDS }}
      >
        <CountryFlag
          key={country.iso_code3}
          className="h-[30px]"
          url={country.flag_url}
          alt={country.name_ru}
          width={50}
          height={30}
        />
        <span className="truncate">{country.name_ru}</span>
        <div className="ml-auto flex items-center gap-3">
          <Button
            disabled={isDeleting}
            onClick={onStartDeleteAnimations}
          >
            {messages['delete']}
          </Button>
          <Link
            href={RoutePath.Country.replace(
              RouteParam.CountryCode,
              country.iso_code3,
            )}
          >
            {messages['more-details']}
          </Link>
        </div>
      </motion.li>
    );
  },
  areEqual,
);

CountriesListElement.displayName = 'CountriesListElement';
