const getWeatherIconSrc = (weatherCode) => {
  if(weatherCode === 'Clear') return './gif/sunny.gif';
  if(weatherCode === 'Rain') return './gif/rain.gif';
  if(weatherCode === 'Clouds') return './gif/partly-cloudy-day.gif';
  if(weatherCode === 'Snow') return './gif/snowy.gif';
  if(weatherCode === 'Thunderstorm') return './gif/lightning.gif';
}

export default getWeatherIconSrc