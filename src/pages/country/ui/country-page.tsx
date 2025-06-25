import { FC } from 'react';

import { Image } from 'shared/ui';
import { getCountry } from 'entities/country';
import { getMessages } from 'shared/lib';

interface CountryPageProps {
  countryCode: string;
}

export const CountryPage: FC<CountryPageProps> = async ({ countryCode }) => {
  const [messages, country] = await Promise.all([
    getMessages(),
    getCountry(countryCode),
  ]);

  if (!country) {
    return null;
  }

  return (
    <main>
      <section className="flex flex-col gap-5 p-4">
        <h1 className="text-xl font-bold">{country.name_ru}</h1>
        <span className="flex items-baseline gap-3">
          <span className="w-[200px]">{messages.countries['flag']}:</span>
          <Image
            src={country.flag_url}
            alt={country.name_ru}
            width={40}
            height={40}
            unoptimized
          />
        </span>
        <span className="flex items-baseline gap-3">
          <span className="w-[200px]">{messages.countries['iso-code-2']}:</span>
          <span>{country.iso_code2}</span>
        </span>
        <span className="flex items-baseline gap-3">
          <span className="w-[200px]">{messages.countries['iso-code-3']}:</span>
          <span>{country.iso_code3}</span>
        </span>
      </section>
    </main>
  );
};
