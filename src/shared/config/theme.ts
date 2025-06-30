export const enum Theme {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export const THEMES = [Theme.System, Theme.Light, Theme.Dark] as const;

export const THEME_ATTRIBUTE_NAME = 'data-theme';
export const THEME_COOKIE_NAME = 'theme';

export const isValidTheme = (theme: string): theme is Theme => {
  return THEMES.includes(theme as Theme);
};
