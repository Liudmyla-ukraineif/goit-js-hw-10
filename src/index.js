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
    return refs.infoCountry.insertAdjacentHTML('beforeend', countryTpl(countries[0]))
  } else if (countries.length > 1 && countries.length < 11) {
    inputClear()
    return refs.listCountries.insertAdjacentHTML('beforeend', listTpl({ name, capital, population, flags, languages }))
  } else return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}

function inputClear() {
  refs.listCountries.innerHTML = '';
  refs.infoCountry.innerHTML = '';
}

function errorMeseges() {
  Notiflix.Notify.failure('Oops, there is no country with that name')
}



// function createMarkup({ name, capital, population, flags, languages }) {
//   const lang = Object.values(languages).join(', ');
//   const markup = `<img src="${flags.svg}" width="30" , height="20">
//   <h2>${name.official}</h2>
//   <p><span>Capital: </span>${capital}</p>
//   <p><span>Population: </span>${population}</p>
//   <p><span>Languages: </span>${lang}</p>`;
//   countryCard.insertAdjacentHTML('beforeend', markup);
// }


// function list(countries) {
//   return countries.map(({ name, flags }) => `<li><img src="${flags.png}" alt="flag" height="80"> 
//   <h2><span class="name-card">Offficial name: </span>${name.official}</h2></li>`
//   ).join("");
// }