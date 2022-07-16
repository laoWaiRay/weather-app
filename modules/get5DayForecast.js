const API_KEY = 'a50c5c89e6094bcfb80760c1cec24902';

const get5DayForecast = async (latitude, longitude) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`, { mode: 'cors' });
  const data = await response.json();
  return data;
}

export default get5DayForecast