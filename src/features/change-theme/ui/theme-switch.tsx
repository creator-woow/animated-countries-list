'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';

import { DarkThemeIcon, LightThemeIcon } from 'shared/icons';
import { THEMES, Theme } from 'shared/config';
import { clsx, useTheme } from 'shared/lib';
import { Button } from 'shared/ui';
import { PropsWithClassName } from 'shared/types/props';

const THEME_BUTTON_SIZE = 40;
const THEME_BUTTONS_GAP = 16;

export const ThemeSwitch: FC<PropsWithClassName> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const buttons = THEMES.map((variant) => (
    <Button
      key={variant}
      className="flex justify-center items-center"
      style={{ width: THEME_BUTTON_SIZE, height: THEME_BUTTON_SIZE }}
      variant="clear"
      size="content"
      onClick={() => setTheme(variant)}
    >
      {variant === Theme.System && (
        <span className="flex gap-1 items-center">
          <DarkThemeIcon
            width={10}
            height={10}
          />
          /
          <LightThemeIcon
            width={10}
            height={10}
          />
        </span>
      )}
      {variant === Theme.Dark && (
        <DarkThemeIcon
          width={20}
          height={20}
        />
      )}
      {variant === Theme.Light && (
        <LightThemeIcon
          width={20}
          height={20}
        />
      )}
    </Button>
  ));

  const activeThemeIndex = THEMES.findIndex((variant) => variant === theme);

  return (
    <div
      className={clsx(
        className,
        `border border-solid rounded-xl overflow-hidden`,
      )}
    >
      <div
        className="relative m-2 flex"
        style={{ gap: THEME_BUTTONS_GAP }}
      >
        {buttons}
        <motion.div
          className={clsx(
            'h-full -z-1 vertical-centered-absolute rounded-xl bg-primary-200',
          )}
          style={{ width: THEME_BUTTON_SIZE }}
          initial={false}
          animate={{
            translateX:
              activeThemeIndex * THEME_BUTTON_SIZE +
              THEME_BUTTONS_GAP * activeThemeIndex,
          }}
        />
      </div>
    </div>
  );
};
