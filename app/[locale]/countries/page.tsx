import { Metadata } from 'next';

import { CountriesPage } from 'pages/countries';
import { getMessages } from 'shared/lib';

const generateMetadata = async (): Promise<Metadata> => {
  const messages = await getMessages();

  return {
    title: messages.countries.list,
  };
};

export { CountriesPage as default, generateMetadata };
