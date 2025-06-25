'use client';

import { FC, PropsWithChildren, useState } from 'react';

import {
  THEME_ATTRIBUTE_NAME,
  THEME_COOKIE_NAME,
  Theme,
  isValidTheme,
} from 'shared/config';
import { getClientCookie, setClientCookie } from 'shared/lib';
import { ThemeContext } from 'shared/context';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const activeTheme = getClientCookie(THEME_COOKIE_NAME);

    if (activeTheme && isValidTheme(activeTheme)) {
      return activeTheme;
    }

    return Theme.default;
  });

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
