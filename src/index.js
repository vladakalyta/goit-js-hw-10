import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

Notiflix.Notify.init({
  width: '400px',
  position: 'right-top',
  distance: '10px',
  borderRadius: '50px',
});

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

let country = '';

refs.searchBox.addEventListener('input', debounce(inputCounty, DEBOUNCE_DELAY));

function inputCounty(e) {
  MarkUpCountries();
  country = e.target.value.trim();
  fetchCountries(country).then(lengthData).catch(error);
}

function lengthData(data) {
  if (data.length >= 2 && data.length <= 10) {
    countryList(data);
  } else if (data.length === 1) {
    countryInfo(data);
  } else {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function countryList(data) {
  MarkUpCountries();
  const markUpList = data
    .map(country => {
      return `<li><img src=${country.flags.svg} width=40><h2 >${country.name.official}</h2></li>`;
    })
    .join('');
  refs.countryList.insertAdjacentHTML('afterbegin', markUpList);
}

function countryInfo(data) {
  MarkUpCountries();
  const markUpCountryInfo = data
    .map(country => {
      return `<div> 
        <img src=${country.flags.svg}
        alt='Flag of ${country.name}'
        width='45'/>
        <h2>${country.name.official}</h2>
        </div>
      <ul>
        <li> <span class='inforamtion'>Capital:
          </span>${country.capital} </li>
        <li> <span class='inforamtion'>Population:
          </span>${country.population} </li>
        <li> <span class='inforamtion'>Languages:
          </span>${Object.values(country.languages).join(', ')} </li>
      </ul>`;
    })
    .join('');
  refs.countryInfo.insertAdjacentHTML('afterbegin', markUpCountryInfo);
}

function MarkUpCountries() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function error(error) {
  if (error.message === '404') {
    return Notiflix.Notify.failure('Oops, there is no country with that name');
  }
  return Notiflix.Notify.failure(`Oops, server error:"${error}"`);
}