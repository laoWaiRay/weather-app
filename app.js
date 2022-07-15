import conversion from "./conversion.js";

const API_KEY = 'a50c5c89e6094bcfb80760c1cec24902';

let cityList = [];
let cityWeatherData = [];
let units = 'Celsius';

const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ampm;
  return strTime;
}

const getCityInput = () => {
  const cityInput = document.querySelector('#city');
  const city = cityInput.value;
  return city;
}

const getMatchingCityList = async(cityInput) => {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${API_KEY}`);
  const cityList = await response.json();
  return cityList;
}

const citySearchInput = document.querySelector('#city');
const celsiusToggler = document.querySelector('.nav__temp-celsius');
const fahrenheitToggler = document.querySelector('.nav__temp-fahrenheit');


const clearInput = () => {
  citySearchInput.value = '';
}

const setCityListFromInput = async() => {
  cityList = await getMatchingCityList(getCityInput())
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

const getWeatherIconSrc = (weatherCode) => {
  if(weatherCode === 'Clear') return './gif/sunny.gif';
  if(weatherCode === 'Rain') return './gif/rain.gif';
  if(weatherCode === 'Clouds') return './gif/partly-cloudy-day.gif';
  if(weatherCode === 'Snow') return './gif/snowy.gif';
  if(weatherCode === 'Thunderstorm') return './gif/lightning.gif';
}

const makeCard = (cityData, cityWeatherData) => {
  const container = document.querySelector('.card-container');
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-latitude', cityData.lat);
  card.setAttribute('data-longitude', cityData.lon);
  // console.log(card.dataset.longitude)
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
  if(units === 'Celsius') cardTemp.append(`${conversion.KtoC(cityWeatherData.main.temp)}°C`);
  if(units === 'Fahrenheit') cardTemp.append(`${conversion.KtoF(cityWeatherData.main.temp)}°F`);

  card.addEventListener('click', async() => {
    const latitude = card.dataset.latitude;
    const longitude = card.dataset.longitude;
    const cityWeatherData = await getSpecificCityWeatherData(latitude,longitude);
    const forecast = await get5DayForecast(latitude, longitude);
    const hourlyWeatherData = forecast.list.slice(0,8);
    clearContent();
    makeDetailsPage(cityWeatherData, hourlyWeatherData);
  })

  container.append(card);
  card.append(cardHeader, cardSubHeader, cardWeatherIcon, cardTemp);
}

celsiusToggler.addEventListener('click', () => {
  units = 'Celsius';
})

fahrenheitToggler.addEventListener('click', () => {
  units = 'Fahrenheit';
})

const get5DayForecast = async (latitude, longitude) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
  const data = await response.json();
  return data;
}

const clearContent = () => {
  const content = document.querySelector('.content');
  while (content.firstChild) {
    content.firstChild.remove();
  }
}

const getSpecificCityWeatherData = async(latitude, longitude) => {
  const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
  const cityWeatherData = await result.json();
  return cityWeatherData;
}

const makeDetailsPage = (cityWeatherData, hourlyWeatherData) => {
  const content = document.querySelector('.content');
  const template = document.querySelector('#details-template');
  const detailsTemplate = document.importNode(template.content, true);
  content.append(detailsTemplate);

  const headerHeading = document.querySelector('.details-header__heading');
  headerHeading.innerText = `${cityWeatherData.name}, ${cityWeatherData.sys.country}`;
  const headerIcon = document.querySelector('.details-header__icon');
  headerIcon.src = getWeatherIconSrc(cityWeatherData.weather[0].main);
  const headerTemp = document.querySelector('.details-header__temp');
  if (units === 'Celsius') headerTemp.innerText = `${conversion.KtoC(cityWeatherData.main.temp)}°C`;
  if (units === 'Fahrenheit') headerTemp.innerText = `${conversion.KtoF(cityWeatherData.main.temp)}°F`;
  const headerSubtext = document.querySelector('.details-header__subtext');
  headerSubtext.innerText = cityWeatherData.weather[0].description;
  const tempHigh = document.querySelector('.high');
  if (units === 'Celsius') tempHigh.innerText = `H: ${conversion.KtoC(cityWeatherData.main.temp_max)}°C`;
  if (units === 'Fahrenheit') tempHigh.innerText = `H: ${conversion.KtoF(cityWeatherData.main.temp_max)}°F`;
  const tempLow = document.querySelector('.low');
  if (units === 'Celsius') tempLow.innerText = `L: ${conversion.KtoC(cityWeatherData.main.temp_min)}°C`;
  if (units === 'Fahrenheit') tempLow.innerText = `L: ${conversion.KtoF(cityWeatherData.main.temp_min)}°F`;
  const sunrise = document.querySelector('.sunrise');
  const sunriseDate = new Date(cityWeatherData.sys.sunrise * 1000);
  sunrise.innerText = `Sunrise: ${formatAMPM(sunriseDate)}`;
  const sunset = document.querySelector('.sunset');
  const sunsetDate = new Date(cityWeatherData.sys.sunset * 1000);
  sunset.innerText = `Sunset: ${formatAMPM(sunsetDate)}`;
  const humidity = document.querySelector('.humidity-number');
  humidity.innerText = cityWeatherData.main.humidity;
  const feelsLike = document.querySelector('.feels-like-number');
  if (units === 'Celsius') feelsLike.innerText = conversion.KtoC(cityWeatherData.main.feels_like);
  if (units === 'Fahrenheit') feelsLike.innerText = conversion.KtoF(cityWeatherData.main.feels_like);
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
    if (units === 'Celsius') hourlyForecastTemp.append(`${conversion.KtoC(tempInKelvin)}°C`);
    if (units === 'Fahrenheit') hourlyForecastTemp.append(`${conversion.KtoF(tempInKelvin)}°F`);
    hourlyForecastContainer.append(hourlyForecastItem);
    hourlyForecastItem.append(hourlyForecastTime, hourlyForecastIcon, hourlyForecastTemp);
  })
}

const makeMainPage = () => {
  const content = document.querySelector('.content');
  const getUserLocationBtn = document.createElement('button');
  getUserLocationBtn.classList.add('get-user-location-btn');
  getUserLocationBtn.append('Get Weather');

  getUserLocationBtn.addEventListener('click', () => {
    const successHandler = async (response) => {
      const { latitude, longitude } = await response.coords;
      const cityWeatherData = await getSpecificCityWeatherData(latitude,longitude);
      const forecast = await get5DayForecast(latitude, longitude);
      const hourlyWeatherData = forecast.list.slice(0,8);
      makeDetailsPage(cityWeatherData, hourlyWeatherData);
    }
    clearContent();
    navigator.geolocation.getCurrentPosition(successHandler);
  })

  content.append(getUserLocationBtn);
}

citySearchInput.addEventListener('keydown', async(e) => {
  if(e.key === 'Enter'){
    if(!citySearchInput.value) return;
    await setCityListFromInput();
    clearInput();
    await getCityWeatherData(cityList);

    clearContent();
    const content = document.querySelector('.content');
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    content.append(cardContainer);
    cityList.forEach((city, index) => makeCard(city, cityWeatherData[index]));
    console.dir(cityList)
    console.dir(cityWeatherData)
  }
})

const logo = document.querySelector('.nav__logo');
logo.addEventListener('click', () => {
  clearContent();
  makeMainPage();
})


makeMainPage();

// on form submit, get user input

// make API call to get weather data

// get the specific information that is to be appended to the DOM

// Use the weather data to show the user information, by updating the DOM dynamically