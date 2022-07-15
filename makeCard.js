import unitsManager from "./unitsManager.js";
import getWeatherIconSrc from "./getWeatherIconSrc.js";
import conversion from "./conversion.js";
import currentCity from "./currentCity.js";
import getSpecificCityWeatherData from "./getSpecificCityWeatherData.js";
import get5DayForecast from "./get5DayForecast.js";
import clearContent from "./clearContent.js";
import makeDetailsPage from "./makeDetailsPage.js";

const makeCard = (cityData, cityWeatherData) => {
  const container = document.querySelector('.card-container');
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-latitude', cityData.lat);
  card.setAttribute('data-longitude', cityData.lon);
  const cardHeader = document.createElement('h2')
  cardHeader.classList.add('card__header');
  cardHeader.append(`${cityData.name}${cityData.state ? ', ' + cityData.state : ''}${cityData.country ? ', ' + cityData.country : ''}`);
  const cardSubHeader = document.createElement('div');
  cardSubHeader.classList.add('card__subheader');
  cardSubHeader.append('Now');
  const cardWeatherIcon = document.createElement('img');
  cardWeatherIcon.classList.add('card__weather-icon');
  cardWeatherIcon.src = getWeatherIconSrc(cityWeatherData.weather[0].main);
  const cardTemp = document.createElement('div');
  cardTemp.classList.add('card__temp');
  if(unitsManager.getUnits() === 'Celsius') cardTemp.append(`${conversion.KtoC(cityWeatherData.main.temp)}°C`);
  if(unitsManager.getUnits() === 'Fahrenheit') cardTemp.append(`${conversion.KtoF(cityWeatherData.main.temp)}°F`);

  card.addEventListener('click', async() => {
    currentCity.setFalse();
    const latitude = card.dataset.latitude;
    const longitude = card.dataset.longitude;
    const specificCityWeatherData = await getSpecificCityWeatherData(latitude,longitude);
    const forecast = await get5DayForecast(latitude, longitude);
    const hourlyWeatherData = forecast.list.slice(0,8);
    clearContent();
    makeDetailsPage(specificCityWeatherData, hourlyWeatherData);
  })

  container.append(card);
  card.append(cardHeader, cardSubHeader, cardWeatherIcon, cardTemp);
}

export default makeCard