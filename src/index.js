import countryTpl from '../src/templates/cardForCountry.hbs';
import listTpl from '../src/templates/cardListCountries.hbs';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import InfoApiServis from '../src/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  country: document.querySelector('#search-box'),
  listCountries: document.querySelector('.country-list'),
  infoCountry: document.querySelector('.country-info')
}

const infoApiServis = new InfoApiServis;

refs.country.addEventListener('input', debounce(onTakeCountry, DEBOUNCE_DELAY))

function onTakeCountry(e) {
  infoApiServis.query = e.target.value.trim();

  infoApiServis.fetchCountry().then(renderCardCountry).catch(errorMeseges)
}

function renderCardCountry(countries) {

  if (countries.length === 0) {
    inputClear()
  } else if (countries.length === 1) {
    inputClear()
    return refs.infoCountry.insertAdjacentHTML('beforeend', countryTpl(countries))
  } else if (countries.length > 1 && countries.length < 11) {
    inputClear()
    return refs.listCountries.insertAdjacentHTML('beforeend', listTpl(countries))
  } else if (countries.length > 10) {
    inputClear()
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
  } else errorMeseges()
}

function inputClear() {
  refs.listCountries.innerHTML = '';
  refs.infoCountry.innerHTML = '';
}

function errorMeseges() {
  inputClear()
  Notiflix.Notify.failure('Oops, there is no country with that name')
}
