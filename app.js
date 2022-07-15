import getUserInput from "./getUserInput.js";
import unitsManager from "./unitsManager.js";
import makeCard from "./makeCard.js";
import currentPage from "./currentPage.js";
import currentCity from "./currentCity.js";
import getSpecificCityWeatherData from "./getSpecificCityWeatherData.js";
import clearContent from "./clearContent.js";
import makeDetailsPage from "./makeDetailsPage.js";
import get5DayForecast from "./get5DayForecast.js";

const API_KEY = 'a50c5c89e6094bcfb80760c1cec24902';

let cityList = [];
let cityWeatherData = [];

// Weather data for searched cities
let specificCityWeatherData;
let forecast;

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

const reloadPage = () => {
  if (currentPage.getPage() === 'cards') makeCardsPage();
  if (currentPage.getPage() === 'details' && currentCity.isCurrentCity === true) {
    const hourlyWeatherData = currentCity.getCurrentCityForecast().list.slice(0,8);
    makeDetailsPage(currentCity.getCurrentCityWeatherData(), hourlyWeatherData);
  }
  if (currentPage.getPage() === 'details' && currentCity.isCurrentCity === false) {
    const hourlyWeatherData = forecast.list.slice(0,8);
    makeDetailsPage(specificCityWeatherData, hourlyWeatherData);
  }
}

const celsiusToggler = document.querySelector('.nav__temp-celsius');
const fahrenheitToggler = document.querySelector('.nav__temp-fahrenheit');

celsiusToggler.addEventListener('click', () => {
  unitsManager.setUnits('Celsius');
  if (currentPage.getPage() === 'main') return;
  clearContent();
  reloadPage();
})

fahrenheitToggler.addEventListener('click', () => {
  unitsManager.setUnits('Fahrenheit');
  if (currentPage.getPage() === 'main') return;
  clearContent();
  reloadPage();
})

const makeMainPage = () => {
  currentPage.setPage('main');
  const content = document.querySelector('.content');
  const getUserLocationBtn = document.createElement('button');
  getUserLocationBtn.classList.add('get-user-location-btn');
  getUserLocationBtn.append('Get Weather');

  getUserLocationBtn.addEventListener('click', () => {
    currentCity.setTrue();
    const successHandler = async (response) => {
      const { latitude, longitude } = await response.coords;
      currentCity.setCurrentCityWeatherData(await getSpecificCityWeatherData(latitude,longitude));
      currentCity.setCurrentCityForecast(await get5DayForecast(latitude,longitude));
      const hourlyWeatherData = currentCity.getCurrentCityForecast().list.slice(0,8);
      makeDetailsPage(currentCity.getCurrentCityWeatherData(), hourlyWeatherData);
    }
    clearContent();
    if(currentCity.getCurrentCityWeatherData() === null) navigator.geolocation.getCurrentPosition(successHandler);
    else {
      const hourlyWeatherData = currentCity.getCurrentCityForecast().list.slice(0,8);
      makeDetailsPage(currentCity.getCurrentCityWeatherData(), hourlyWeatherData);
    }
  })

  content.append(getUserLocationBtn);
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
    await setCityListFromInput();
    await getCityWeatherData(cityList);

    clearContent();
    makeCardsPage();
  }
})

const logo = document.querySelector('.nav__logo');
logo.addEventListener('click', () => {
  clearContent();
  makeMainPage();
})

makeMainPage();

