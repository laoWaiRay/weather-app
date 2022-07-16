const API_KEY = 'a50c5c89e6094bcfb80760c1cec24902';

const getSpecificCityWeatherData = async(latitude, longitude) => {
  const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
  const cityWeatherData = await result.json();
  return cityWeatherData;
}

export default getSpecificCityWeatherData