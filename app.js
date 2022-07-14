import conversion from "./conversion.js";

const API_KEY = 'a50c5c89e6094bcfb80760c1cec24902';

const getCityInput = () => {
  const cityInput = document.querySelector('#city');
  const city = cityInput.value;
  return city;
}

const getMatchingCityList = async(cityInput) => {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=10&appid=${API_KEY}`);
  const cityList = await response.json();
  return cityList;
}

const recordUserInput = () => {
  const citySearchInput = document.querySelector('#city');
  let cityList = [];
  let cityWeatherData = [];

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
    const cardHeader = document.createElement('h2')
    cardHeader.classList.add('card__header');
    cardHeader.append(`${cityData.name}, ${cityData.state}, ${cityData.country}`);
    const cardSubHeader = document.createElement('div');
    cardSubHeader.classList.add('card__subheader');
    cardSubHeader.append('Now');
    const cardWeatherIcon = document.createElement('img');
    cardWeatherIcon.classList.add('card__weather-icon');
    cardWeatherIcon.src = getWeatherIconSrc(cityWeatherData.weather[0].main);
    const cardTemp = document.createElement('div');
    cardTemp.classList.add('card__temp');
    cardTemp.append(`${conversion.KtoC(cityWeatherData.main.temp)}°C`);

    container.append(card);
    card.append(cardHeader, cardSubHeader, cardWeatherIcon, cardTemp);
  }

  citySearchInput.addEventListener('keydown', async(e) => {
    if(e.key === 'Enter'){
      if(!citySearchInput.value) return;
      await setCityListFromInput();
      clearInput();
      await getCityWeatherData(cityList);
      cityList.forEach((city, index) => makeCard(city, cityWeatherData[index]));
    }
  })
}

recordUserInput();


// on form submit, get user input

// make API call to get weather data

// get the specific information that is to be appended to the DOM

// Use the weather data to show the user information, by updating the DOM dynamically