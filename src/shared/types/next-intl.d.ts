import { AppConfig } from 'next-intl';

import { SUPPORTED_LOCALES } from 'shared/config/intl';
import auth from '../../../public/messages/en/auth.json';
import common from '../../../public/messages/en/common.json';
import home from '../../../public/messages/en/home.json';
import sidebar from '../../../public/messages/en/sidebar.json';
import validation from '../../../public/messages/en/validation.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: {
      common: typeof common;
      auth: typeof auth;
      validation: typeof validation;
      sidebar: typeof sidebar;
      home: typeof home;
    };
    Locale: (typeof SUPPORTED_LOCALES)[number];
  }
}

declare module 'next-intl/server' {
  function getMessages(): Promise<AppConfig['Messages']>;
}
