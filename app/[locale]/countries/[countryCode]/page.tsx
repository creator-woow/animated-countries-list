import { FC } from 'react';
import { Metadata } from 'next';

import { CountryPage } from 'pages/country';
import { getCountry } from 'entities/country';
import { notFound } from 'next/navigation';

interface RoutingPageProps {
  params: Promise<{
    countryCode: string;
  }>;
}

const generateMetadata = async ({
  params,
}: RoutingPageProps): Promise<Metadata> => {
  const { countryCode } = await params;
  const country = await getCountry(countryCode);

  if (!country) {
    notFound();
  }

  return {
    title: country.name_ru,
  };
};

const RoutingPage: FC<RoutingPageProps> = async ({ params }) => {
  const { countryCode } = await params;
  return <CountryPage countryCode={countryCode} />;
};

export { RoutingPage as default, generateMetadata };
