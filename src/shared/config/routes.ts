export const enum RouteParam {
  CountryCode = ':countryCode',
}

export const enum RoutePath {
  Login = '/login',
  Registration = '/registration',
  Countries = '/countries',
  Country = `/${RoutePath.Countries}/${RouteParam.CountryCode}`,
}

export const PUBLIC_ROUTES = [RoutePath.Registration, RoutePath.Login];
