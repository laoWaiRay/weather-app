import currentPage from "./currentPage.js";
import clearContent from "./clearContent.js";
import reloadPage from "./reloadPage.js";
import unitsManager from "./unitsManager.js";

const unitTogglerInit = () => {
  const celsiusToggler = document.querySelector(".nav__temp-celsius");
  const fahrenheitToggler = document.querySelector(".nav__temp-fahrenheit");

  celsiusToggler.addEventListener("click", () => {
    unitsManager.setUnits("Celsius");
    if (currentPage.getPage() === "main") return;
    clearContent();
    reloadPage();
  });

  fahrenheitToggler.addEventListener("click", () => {
    unitsManager.setUnits("Fahrenheit");
    if (currentPage.getPage() === "main") return;
    clearContent();
    reloadPage();
  });
  
};

export default unitTogglerInit
