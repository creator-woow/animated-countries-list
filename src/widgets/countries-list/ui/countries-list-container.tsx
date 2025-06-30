import { FC } from 'react';

import { PropsWithClassName } from 'shared/types/props';
import { getCountriesList } from 'entities/country';
import { getMessages } from 'shared/lib';

import { CountriesList } from './countries-list';

type CountriesListContainerProps = PropsWithClassName;

export const CountriesListContainer: FC<CountriesListContainerProps> = async ({
  className,
}) => {
  const [messages, countries] = await Promise.all([
    getMessages(),
    getCountriesList(),
  ]);

  if (!countries.ok) {
    return null;
  }

  return (
    <CountriesList
      className={className}
      countries={countries.data}
      messages={messages.countries}
    />
  );
};
