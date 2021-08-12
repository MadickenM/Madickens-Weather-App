function changeTemperature(response) {
  document.querySelector("p").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
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

function searchLocation(position) {
  let apiKey = "d234e1fbf5eb366ef1a99fa2c652b5ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeTemperature);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", showCurrentLocation);

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

function celcius(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#temperature");
  todayTemp.innerHTML = "25°";
}

function farenheit(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#temperature");
  todayTemp.innerHTML = "77°";
}
let changedValue = document.querySelector("#farTemp");
changedValue.addEventListener("click", farenheit);

let regularValue = document.querySelector("#celTemp");
regularValue.addEventListener("click", celcius);

searchCity("London");
