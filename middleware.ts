import { MiddlewareConfig, NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import {
  DISABLE_AUTH_REQUIREMENT,
  LOCALE_PREFIX,
  SUPPORTED_LOCALES,
} from 'shared/config';
import { authMiddleware } from 'features/auth';

const intlMiddleware = createIntlMiddleware({
  locales: SUPPORTED_LOCALES,
  defaultLocale: SUPPORTED_LOCALES[0],
  localePrefix: LOCALE_PREFIX,
});

export const middleware = async (req: NextRequest) => {
  const authVerifiedReq = DISABLE_AUTH_REQUIREMENT
    ? req
    : await authMiddleware(req);
  return intlMiddleware(authVerifiedReq);
};

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|manifest|sw|workbox|raster-images|robots|messages|assets|favicon).*)',
  ],
};
