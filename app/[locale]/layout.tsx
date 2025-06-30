import { FC, PropsWithChildren } from 'react';
import { PT_Sans, PT_Serif } from 'next/font/google';
import { AppConfig } from 'next-intl';
import { cookies } from 'next/headers';

import 'app/styles/index.css';
import { IntlProvider, ThemeProvider } from 'app/providers';
import {
  THEME_ATTRIBUTE_NAME,
  THEME_COOKIE_NAME,
  Theme,
  isValidTheme,
} from 'shared/config';
import { RoutingDefaultParams } from 'shared/types';
import { clsx } from 'shared/lib';

type RootLayoutProps = PropsWithChildren<{
  params: Promise<RoutingDefaultParams>;
}>;

const PTSans = PT_Sans({
  display: 'swap',
  preload: true,
  variable: '--font-sans',
  weight: ['400', '700'],
});

const PTSerif = PT_Serif({
  display: 'swap',
  preload: true,
  variable: '--font-serif',
  weight: ['400', '700'],
});

const Providers: FC<
  PropsWithChildren & { locale: AppConfig['Locale']; initialTheme: Theme }
> = async ({ locale, initialTheme, children }) => {
  return (
    <IntlProvider locale={locale}>
      <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>
    </IntlProvider>
  );
};

const RootLayout: FC<RootLayoutProps> = async ({ params, children }) => {
  const { locale } = await params;
  const cookie = await cookies();
  const themeCookieValue = cookie.get(THEME_COOKIE_NAME)?.value;
  const theme =
    themeCookieValue && isValidTheme(themeCookieValue)
      ? themeCookieValue
      : Theme.Light;

  const htmlAttributes = {
    lang: locale,
    [THEME_ATTRIBUTE_NAME]: theme,
  };

  return (
    <html {...htmlAttributes}>
      <body
        className={clsx(
          'text-text-primary bg-site-background h-[100dvh]',
          PTSans.variable,
          PTSerif.variable,
        )}
      >
        <Providers
          initialTheme={theme}
          locale={locale}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
