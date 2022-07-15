const getUserInput = (() => {
  const API_KEY = 'a50c5c89e6094bcfb80760c1cec24902';

  const getMatchingCityList = async() => {
    const cityInput = document.querySelector('#city');
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&limit=5&appid=${API_KEY}`);
    const cityList = await response.json();
    cityInput.value = '';
    return cityList;
  }

  return {
    getMatchingCityList
  }
})()

export default getUserInput