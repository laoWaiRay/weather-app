import currentCity from "./currentCity.js";
import currentPage from "./currentPage.js";
import makeDetailsPage from "./makeDetailsPage.js";
import clearContent from "./clearContent.js";
import getSpecificCityWeatherData from "./getSpecificCityWeatherData.js";
import get5DayForecast from "./get5DayForecast.js";
import toggleLoader from "./toggleLoader.js";

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
      toggleLoader();
    }
    clearContent();
    if(currentCity.getCurrentCityWeatherData() === null) {
      toggleLoader();
      navigator.geolocation.getCurrentPosition(successHandler);
    }
    else {
      const hourlyWeatherData = currentCity.getCurrentCityForecast().list.slice(0,8);
      makeDetailsPage(currentCity.getCurrentCityWeatherData(), hourlyWeatherData);
    }
  })

  content.append(getUserLocationBtn);
}

export default makeMainPage