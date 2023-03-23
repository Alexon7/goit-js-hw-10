const BASE_URL = 'https://restcountries.com/v3.1/name';

export function fetchDataByCountryName(CountryName) {
  return fetch(
    `${BASE_URL}/${CountryName}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    return res.json();
  });
}
