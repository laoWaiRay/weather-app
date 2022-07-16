import currentPage from "./currentPage.js";
import unitsManager from "./unitsManager.js";
import conversion from "./conversion.js";
import formatAMPM from "./formatAMPM.js";
import getWeatherIconSrc from "./getWeatherIconSrc.js";

const makeDetailsPage = (cityWeatherData, hourlyWeatherData) => {
  currentPage.setPage('details');
  const content = document.querySelector('.content');
  const template = document.querySelector('#details-template');
  const detailsTemplate = document.importNode(template.content, true);
  content.append(detailsTemplate);

  const headerHeading = document.querySelector('.details-header__heading');
  headerHeading.innerText = `${cityWeatherData.name}, ${cityWeatherData.sys.country}`;
  const headerIcon = document.querySelector('.details-header__icon');
  headerIcon.src = getWeatherIconSrc(cityWeatherData.weather[0].main);
  const headerTemp = document.querySelector('.details-header__temp');
  if (unitsManager.getUnits() === 'Celsius') headerTemp.innerText = `${conversion.KtoC(cityWeatherData.main.temp)}°C`;
  else headerTemp.innerText = `${conversion.KtoF(cityWeatherData.main.temp)}°F`;
  const headerSubtext = document.querySelector('.details-header__subtext');
  headerSubtext.innerText = cityWeatherData.weather[0].description;
  const tempHigh = document.querySelector('.high');
  if (unitsManager.getUnits() === 'Celsius') tempHigh.innerText = `H: ${conversion.KtoC(cityWeatherData.main.temp_max)}°C`;
  else tempHigh.innerText = `H: ${conversion.KtoF(cityWeatherData.main.temp_max)}°F`;
  const tempLow = document.querySelector('.low');
  if (unitsManager.getUnits() === 'Celsius') tempLow.innerText = `L: ${conversion.KtoC(cityWeatherData.main.temp_min)}°C`;
  else tempLow.innerText = `L: ${conversion.KtoF(cityWeatherData.main.temp_min)}°F`;
  const sunrise = document.querySelector('.sunrise');
  const sunriseDate = new Date(cityWeatherData.sys.sunrise * 1000);
  sunrise.innerText = `Sunrise: ${formatAMPM(sunriseDate)}`;
  const sunset = document.querySelector('.sunset');
  const sunsetDate = new Date(cityWeatherData.sys.sunset * 1000);
  sunset.innerText = `Sunset: ${formatAMPM(sunsetDate)}`;
  const humidity = document.querySelector('.humidity-number');
  humidity.innerText = cityWeatherData.main.humidity;
  const feelsLike = document.querySelector('.feels-like-number');
  if (unitsManager.getUnits() === 'Celsius') feelsLike.innerText = conversion.KtoC(cityWeatherData.main.feels_like);
  else feelsLike.innerText = conversion.KtoF(cityWeatherData.main.feels_like);

  const hourlyForecastContainer = document.querySelector('.hourly-forecast__container');
  hourlyWeatherData.forEach((weatherObj) => {
    const weatherDate = new Date(weatherObj.dt * 1000);
    const time = formatAMPM(weatherDate);
    const weatherCode = weatherObj.weather[0].main;
    const tempInKelvin = weatherObj.main.temp;
    const hourlyForecastItem = document.createElement('div');
    hourlyForecastItem.classList.add('hourly-forecast__item');
    const hourlyForecastTime = document.createElement('span');
    hourlyForecastTime.classList.add('hourly-forecast__time');
    hourlyForecastTime.append(time);
    const hourlyForecastIcon = document.createElement('img');
    hourlyForecastIcon.classList.add('hourly-forecast__icon');
    hourlyForecastIcon.src = getWeatherIconSrc(weatherCode);
    const hourlyForecastTemp = document.createElement('span');
    hourlyForecastTemp.classList.add('hourly-forecast__temp');
    if (unitsManager.getUnits() === 'Celsius') hourlyForecastTemp.append(`${conversion.KtoC(tempInKelvin)}°C`);
    else hourlyForecastTemp.append(`${conversion.KtoF(tempInKelvin)}°F`);
    hourlyForecastContainer.append(hourlyForecastItem);
    hourlyForecastItem.append(hourlyForecastTime, hourlyForecastIcon, hourlyForecastTemp);
  })
}

export default makeDetailsPage