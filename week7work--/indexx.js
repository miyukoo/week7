function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  
  let cityName = searchInputElement.value;
  cityElement.innerHTML = cityName;

  let Key = "5bo34abbe03172f23694c7869ee00et8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${Key}`;

  axios.get(apiUrl).then(weather);
}

function weather(response) {
  let temperature = response.data.temperature.current;
  let weatherDescription = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let windspeed = response.data.wind.speed;

  let weatherDetailsElement = document.querySelector(".current-details");


  let temperatureElement = document.querySelector(".current-temperature-value");
  let temperatureUnitElement = document.querySelector(
    ".current-temperature-unit"
  );
  let iconElement = document.querySelector("#weather-icon");
  let icon = response.data.condition.icon;
  let iconurl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`;
  iconElement.setAttribute("src", iconurl);

  temperatureElement.innerHTML = Math.round(temperature);
  temperatureUnitElement.innerHTML = "°C";
 
  weatherDetailsElement.innerHTML=`${formatDate(new Date(response.data.time*1000))}, ${weatherDescription} <br />
  Humidity: <strong>${humidity}%</strong>, Wind: <strong>${windspeed} km/h<strong/>`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);
