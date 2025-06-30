import { getRequestConfig } from 'next-intl/server';

export const enum Locale {
  English = 'en',
  Russian = 'ru',
}

export const SUPPORTED_LOCALES = [Locale.English, Locale.Russian] as const;
export const LOCALE_PREFIX = 'always' as const;

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const reqLocale = await requestLocale;
  const isValidLocale =
    !!reqLocale &&
    SUPPORTED_LOCALES.includes(reqLocale as (typeof SUPPORTED_LOCALES)[number]);
  const activeLocale = isValidLocale
    ? (reqLocale as (typeof SUPPORTED_LOCALES)[number])
    : locale;

  return {
    locale: activeLocale ?? SUPPORTED_LOCALES[0],
    messages: {
      common: {
        ...(await import(`public/messages/${activeLocale}/common.json`)),
      },
      countries: {
        ...(await import(`public/messages/${activeLocale}/countries.json`)),
      },
    },
  };
});
