'use server';

import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

import {
  ACCESS_TOKEN_COOKIE_NAME,
  PUBLIC_ROUTES,
  RoutePath,
} from 'shared/config';
import { getUserClaims } from 'features/auth/index';

export const authMiddleware = async (req: NextRequest) => {
  // todo: check secure of this fragment
  if (
    PUBLIC_ROUTES.some(
      (routePath) =>
        routePath.includes(req.nextUrl.pathname) ||
        req.nextUrl.pathname.includes(routePath),
    )
  ) {
    return req;
  }

  const cookie = await cookies();
  const accessToken = cookie.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const userClaims = accessToken ? await getUserClaims(accessToken) : null;

  if (userClaims) {
    return req;
  } else {
    req.nextUrl.pathname = RoutePath.Login;
  }

  return req;
};
