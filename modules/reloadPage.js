import currentPage from "./currentPage.js";
import currentCity from "./currentCity.js";
import makeDetailsPage from "./makeDetailsPage.js";
import makeCardsPage from "./makeCardsPage.js"

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

export default reloadPage