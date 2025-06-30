'use client';

import { FC, PropsWithChildren, useState } from 'react';

import { THEME_ATTRIBUTE_NAME, THEME_COOKIE_NAME, Theme } from 'shared/config';
import { ThemeContext } from 'shared/context';
import { setClientCookie } from 'shared/lib';

interface ThemeProviderProps extends PropsWithChildren {
  initialTheme: Theme;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  initialTheme,
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const handleThemeChange = (newTheme: Theme) => {
    setClientCookie(THEME_COOKIE_NAME, newTheme);
    setTheme(newTheme);
    document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, newTheme);
  };

  const contextValue = {
    theme,
    setTheme: handleThemeChange,
  };

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
};
