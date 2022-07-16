const API_KEY = 'a50c5c89e6094bcfb80760c1cec24902';


let currentCity = (() => {
  let isCurrentCity = true;
  let currentCityWeatherData = null;
  let currentCityForecast = null;

  const setTrue = () => {
    isCurrentCity = true;
  }

  const setFalse = () => {
    isCurrentCity = false
  }

  const setCurrentCityWeatherData = (data) => {
    currentCityWeatherData = data;
  }

  const getCurrentCityWeatherData = () => {
    return currentCityWeatherData;
  }

  const setCurrentCityForecast = (data) => {
    currentCityForecast = data;
  }

  const getCurrentCityForecast = () => {
    return currentCityForecast;
  }

  return {
    isCurrentCity,
    setTrue,
    setFalse,
    setCurrentCityForecast,
    setCurrentCityWeatherData,
    getCurrentCityForecast,
    getCurrentCityWeatherData
  }
})()

export default currentCity

