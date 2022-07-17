// import getUserInput from "./modules/getUserInput.js";
import clearContent from "./modules/clearContent.js";
import makeMainPage from "./modules/makeMainPage.js";
import unitTogglerInit from "./modules/unitTogglerInit.js";
import toggleLoader from "./modules/toggleLoader.js";
import storeUserInput from "./modules/storeUserInput.js";
import makeCardsPage from "./modules/makeCardsPage.js";

const citySearchInput = document.querySelector('#city');

citySearchInput.addEventListener('keydown', async(e) => {
  if(e.key === 'Enter'){
    if(!citySearchInput.value) return;
    toggleLoader();
    await storeUserInput.setCityListFromInput();
    await storeUserInput.setCityWeatherData(storeUserInput.getCityList());
    toggleLoader();
    clearContent();
    makeCardsPage();
  }
})

const logo = document.querySelector('.nav__logo');
logo.addEventListener('click', () => {
  clearContent();
  makeMainPage();
})

unitTogglerInit();
makeMainPage();
toggleLoader();
