function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="col-6" id="forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div><span class="forecastDate" id="forecast-date">${formatDay(
          forecastDay.dt
        )}</span><img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="35"
        />
    <span class="forecastMax" id="forecastMax">${Math.round(
      forecastDay.temp.max
    )}°</span><span class="forecastMin" id="forecast-Min">${Math.round(
          forecastDay.temp.min
        )}°</span>
   </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "d234e1fbf5eb366ef1a99fa2c652b5ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function changeTemperature(response) {
  document.querySelector("p").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  let dateElement = document.querySelector("#date");
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
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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

searchCity("London");
