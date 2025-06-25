import { ApiPath } from 'shared/config';
import { customFetch } from 'shared/api';

import { Country } from './types';

export const getCountriesList = async () =>
  customFetch.GET<Country[]>(ApiPath.CountriesList);

export const getCountry = async (countryCode: string) => {
  const countries = await getCountriesList();
  return (
    countries.data &&
    countries.data.find((country) => country.iso_code3 === countryCode)
  );
};
