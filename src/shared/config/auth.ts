export const ACCESS_TOKEN_HEADER_NAME = 'Authorization';
export const ACCESS_TOKEN_COOKIE_NAME = 'access_token';
export const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';
export const DISABLE_AUTH_REQUIREMENT =
  process.env.DISABLE_AUTH_REQUIREMENT &&
  JSON.parse(process.env.DISABLE_AUTH_REQUIREMENT);
