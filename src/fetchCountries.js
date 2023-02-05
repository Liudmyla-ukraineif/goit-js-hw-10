export default class InfoApiServis {
  constructor() {
    this.searchCountry = '';
  }

  fetchCountry() {
    console.log(this);
    const URL = 'https://restcountries.com/v3.1/name/';

    return fetch(`${URL}${this.searchCountry}?fields=name,capital,region,population,flags,languages`)
      .then(response => response.json())
      .then(countries => { return countries })
  }

  resetList() {
    this.searchCountry = '';
  }
    
  get query(){
    return this.searchCountry;
  }

  set query(newQuery){
    this.searchCountry = newQuery;
  }
}