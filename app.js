let now = new Date();
let day = now.getDay();
let hour = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = days[now.getDay()];
minutes = ("0" + now.getMinutes()).slice(-2);
let currentTime = document.querySelector("#date");
currentTime.innerHTML = `${day} ${hour}:${minutes}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  let forecastHTML = `<div class="col-6" id="forecast">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div><span class="forecastDate" id="forecast-date">${day}</span><span class="forecastIcon" id="forecast-icon"> &#x2600</span>
    <span class="forecastMax" id="forecastMax">26°</span><span class="forecastMin" id="forecast-Min">14°</span>
   </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function changeTemperature(response) {
  document.querySelector("p").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".humid").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#weatherIcon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "d234e1fbf5eb366ef1a99fa2c652b5ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-box").value;
  searchCity(city);
}

let form = document.querySelector(".searchbox");
form.addEventListener("submit", handleSubmit);

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrTemp");
fahrenheitLink.addEventListener("click", displayFarenheitTemperature);

let celsiusLink = document.querySelector("#celTemp");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
searchCity("London");
displayForecast();
