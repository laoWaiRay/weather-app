import currentPage from "./currentPage.js";

const makeCardsPage = () => {
  currentPage.setPage('cards');
  const content = document.querySelector('.content');
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  content.append(cardContainer);
  cityList.forEach((city, index) => makeCard(city, cityWeatherData[index]));
}