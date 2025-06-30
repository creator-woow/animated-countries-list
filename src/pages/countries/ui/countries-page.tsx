import { FC } from 'react';

import { CountriesList } from 'widgets/countries-list';
import { LocaleSwitch } from 'features/change-locale';
import { ThemeSwitch } from 'features/change-theme';
import { getMessages } from 'shared/lib';

export const CountriesPage: FC = async ({}) => {
  const messages = await getMessages();

  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden p-4">
      <div className="mb-2 flex flex-col justify-between gap-5 items-baseline tablet:flex-row">
        <h1 className="grow-0 shrink-0 font-bold text-xl">
          {messages.countries.list}
        </h1>
        <div className="flex items-center gap-4">
          <ThemeSwitch />
          <LocaleSwitch />
        </div>
      </div>
      <div className="grow shrink">
        <CountriesList />
      </div>
    </main>
  );
};
