import { FC } from 'react';

import { CountriesList } from 'widgets/countries-list';
import { getMessages } from 'shared/lib';

export const CountriesPage: FC = async ({}) => {
  const messages = await getMessages();

  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden p-4">
      <h1 className="grow-0 shrink-0 font-bold text-xl mb-3">
        {messages.countries.list}
      </h1>
      <div className="grow shrink">
        <CountriesList />
      </div>
    </main>
  );
};
