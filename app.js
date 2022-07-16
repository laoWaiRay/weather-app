import getUserInput from "./modules/getUserInput.js";
import currentPage from "./modules/currentPage.js";
import clearContent from "./modules/clearContent.js";
import makeMainPage from "./modules/makeMainPage.js";
import makeCard from "./modules/makeCard.js";
import unitTogglerInit from "./modules/unitToggler.js";
import toggleLoader from "./modules/toggleLoader.js";

const API_KEY = 'a50c5c89e6094bcfb80760c1cec24902';

let cityList = [];
let cityWeatherData = [];

const setCityListFromInput = async() => {
  cityList = await getUserInput.getMatchingCityList()
                              .catch(err => console.log('Error: could not fetch weather data.', err));
}

const getCityWeatherData = async(cityList) => {
  cityWeatherData = [];
  for (let city of cityList) {
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`);
    const data = await result.json();
    cityWeatherData.push(data);
  } 
}

const makeCardsPage = () => {
  currentPage.setPage('cards');
  const content = document.querySelector('.content');
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  content.append(cardContainer);
  cityList.forEach((city, index) => makeCard(city, cityWeatherData[index]));
}

const citySearchInput = document.querySelector('#city');

citySearchInput.addEventListener('keydown', async(e) => {
  if(e.key === 'Enter'){
    if(!citySearchInput.value) return;
    toggleLoader();
    await setCityListFromInput();
    await getCityWeatherData(cityList);
    toggleLoader();
    clearContent();
    makeCardsPage();
  }
})

const logo = document.querySelector('.nav__logo');
logo.addEventListener('click', () => {
  clearContent();
  makeMainPage();
})

unitTogglerInit();
makeMainPage();
toggleLoader();
