import { FC } from 'react';
import { Metadata } from 'next';

import { RoutePath } from 'shared/config';
import { RoutingDefaultParams } from 'shared/types';
import { redirect } from 'shared/lib';

interface RoutingPageProps {
  params: Promise<RoutingDefaultParams>;
}

const metadata: Metadata = {
  title: 'Index page',
};

const RoutingPage: FC<RoutingPageProps> = async ({ params }) => {
  const { locale } = await params;
  redirect({ href: RoutePath.Countries, locale: locale });
  return null;
};

export { RoutingPage as default, metadata };
