import currentPage from "./currentPage.js";
import storeUserInput from "./storeUserInput.js";
import makeCard from "./makeCard.js"

const makeCardsPage = () => {
  currentPage.setPage('cards');
  const content = document.querySelector('.content');
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  content.append(cardContainer);
  storeUserInput.getCityList().forEach((city, index) => makeCard(city, storeUserInput.getCityWeatherData()[index]));
}

export default makeCardsPage