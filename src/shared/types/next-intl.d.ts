import { AppConfig } from 'next-intl';

import { SUPPORTED_LOCALES } from 'shared/config/intl';
import common from 'public/messages/en/common.json';
import countries from 'public/messages/en/countries.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: {
      common: typeof common;
      countries: typeof countries;
    };
    Locale: (typeof SUPPORTED_LOCALES)[number];
  }
}

declare module 'next-intl/server' {
  function getMessages(): Promise<AppConfig['Messages']>;
}
