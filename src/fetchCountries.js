const fetchCountry = 'https://restcountries.com/v3.1/name/';
const parameters = 'fields=name,capital,population,flags,languages';

export default function fetchCountries(name) {
  return fetch(`${fetchCountry}${name}?${parameters}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
