import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import countryList from './templates/country-list.hbs';
import countryCard from './templates/country-card.hbs';

import { fetchDataByCountryName } from './fetchCountries';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const countrySearch = document.querySelector('#search-box');
const countryDataEl = document.querySelector('.country-info');
const countryListEl = document.querySelector('.country-list');

countrySearch.addEventListener(
  'input',
  debounce(handleSearchCountry, DEBOUNCE_DELAY)
);

function handleSearchCountry(evt) {
  // evt.preventDefault();

  const searchNameContry = evt.target.value.trim();

  if (!searchNameContry) {
    countryDataEl.innerHTML = '';
    countryListEl.innerHTML = '';
    return;
  }

  fetchDataByCountryName(searchNameContry)
    .then(renderCountryCard)
    .catch(onFetchError);
}

function renderCountryCard(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  if (countries.length >= 2 && countries.length <= 10) {
    const markup = countries
      .map(country => {
        return countryList(country);
      })
      .join('');
    countryListEl.innerHTML = markup;
    countryDataEl.innerHTML = '';
  }

  if (countries.length === 1) {
    const markup = countries
      .map(country => {
        return countryCard(country);
      })
      .join('');
    countryDataEl.innerHTML = markup;
    countryListEl.innerHTML = '';
  }
}

function onFetchError(error) {
  if (error.message === '404') {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    countryDataEl.innerHTML = '';
    countryListEl.innerHTML = '';
  }
}
