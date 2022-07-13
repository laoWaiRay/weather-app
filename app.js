const citySearchInput = document.querySelector('#city');

const getCity = () => {
  const cityInput = document.querySelector('#city');
  const city = cityInput.value;
  return city;
}

const getWeatherData = async(city) => {
  // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a50c5c89e6094bcfb80760c1cec24902`);
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=4&appid=a50c5c89e6094bcfb80760c1cec24902`);
  const weatherData = await response.json();
  return weatherData;
}

citySearchInput.addEventListener('keydown', async(e) => {
  if(!(e.key === 'Enter')) return
  const cityInput = document.querySelector('#city');
  e.preventDefault();
  const weatherData = await getWeatherData(getCity())
                              .catch(err => console.log('Error: could not fetch weather data.', err));
  console.log(weatherData);
  cityInput.value = '';
})


// on form submit, get user input

// make API call to get weather data

// get the specific information that is to be appended to the DOM

// Use the weather data to show the user information, by updating the DOM dynamically