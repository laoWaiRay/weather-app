const API_KEY = 'a50c5c89e6094bcfb80760c1cec24902';

import getUserInput from "./getUserInput.js"

const storeUserInput = (() => {
  let cityList = [];
  let cityWeatherData = [];

  const setCityListFromInput = async() => {
    cityList = await getUserInput.getMatchingCityList()
                                .catch(err => console.log('Error: could not fetch weather data.', err));
  }

  const setCityWeatherData = async(cityList) => {
    cityWeatherData = [];
    console.log(cityList)
    for (let city of cityList) {
      const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`, { mode: 'cors' });
      const data = await result.json();
      cityWeatherData.push(data);
    } 
  }

  const getCityList = () => cityList;

  const getCityWeatherData = () => cityWeatherData;

  return{
    setCityListFromInput,
    setCityWeatherData,
    getCityList,
    getCityWeatherData
  }
})()



export default storeUserInput