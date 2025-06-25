export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const enum ApiParam {
  CountryCode = ':countryCode',
}

export const enum ApiPath {
  CountriesList = 'https://gist.githubusercontent.com/sanchezzzhak/8606e9607396fb5f8216/raw/39de29950198a7332652e1e8224f988b2e94b166/ISO3166_RU.json',
}
