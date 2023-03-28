import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { debounce } from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const createCountryList = ({ name, flags }) => {
    const item = document.createElement('li');
    const nameCountry = document.createElement('p');
    nameCountry.innerText = name.common;
    const iconCountry = document.createElement('img');
    iconCountry.setAttribute('src', flags.svg)
    item.append(iconCountry, nameCountry);
    return item;
}
const renderCountryList = (param) => {
    countryList.replaceChildren();
    countryList.append(...param.map(createCountryList))
};

const createCountryCard = ([{name, flags, capital, population, languages}]) => {
 const card = document.createElement('div');
 const item = document.createElement('li');
 const nameCountry = document.createElement('p');
 nameCountry.innerText = name.common;
 const iconCountry = document.createElement('img');
 iconCountry.setAttribute('src', flags.svg)
 item.append(iconCountry, nameCountry);

 const capitalEl = document.createElement('p');
 capitalEl.innerText = `Capital: ${capital}`;
 const populationEl = document.createElement('p');
 populationEl.innerText = `Population: ${population} `;
 const languagesEl = document.createElement('p');
const lang = Object.values(languages).join('');
 languagesEl.innerText = `Languages: ${lang}`
 card.append(item);

 countryInfo.replaceChildren();
 countryInfo.append(card, capitalEl, populationEl, languagesEl);
}


const onInputChange = () => {
    renderCountryList([])
    countryInfo.replaceChildren();
    const countryName = input.value;
       fetchCountries(countryName)
        .then((country) => {
            if (country.length === 1) {
                createCountryCard(country);
            }
            else if (country.length > 10) {   
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
            else renderCountryList(country)
            console.log(country)
        })
        .catch((error) => {console.log(error);
        Notiflix.Notify.failure('Oops, there is no country with that name')});
}

input.addEventListener('input', _.debounce(onInputChange, DEBOUNCE_DELAY));

