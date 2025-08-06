const apiKey = "d9713d7db770580992027ae361639cef";

const form = document.querySelector(".weatherForm");
const input = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const cityDisplay = document.querySelector(".cityDisplay");
const temperatureDisplay = document.querySelector(".temperatureDisplay");
const descriptionDisplay = document.querySelector(".descriptionDisplay");
const humidityDisplay = document.querySelector(".humidityDisplay");
const windDisplay = document.querySelector(".windDisplay");
const weatherEmoji = document.querySelector(".weatherEmoji");
const errorMessage = document.querySelector(".errorMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = input.value.trim();
  if (!city) {
    showError("Please enter a city");
    return;
  }

  fetchWeather(city);
});

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("City not found");
      }
      return res.json();
    })
    .then((data) => {
      errorMessage.style.display = "none";

      cityDisplay.textContent = data.name;
      temperatureDisplay.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionDisplay.textContent = capitalizeFirstLetter(data.weather[0].main);
      humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
      windDisplay.textContent = `Wind Speed: ${data.wind.speed} km/h`;
      weatherEmoji.textContent = getWeatherEmoji(data.weather[0].main);

      applyGradient(data.weather[0].main);
      setBackground(data.weather[0].main);
    })
    .catch((err) => {
      showError("City not found");
      console.error(err);
    });
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  card.style.background = "linear-gradient(to bottom right, #2c2c44, #1e1e2f)";
  cityDisplay.textContent = "";
  temperatureDisplay.textContent = "";
  descriptionDisplay.textContent = "";
  humidityDisplay.textContent = "";
  windDisplay.textContent = "";
  weatherEmoji.textContent = "";
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getWeatherEmoji(description) {
  description = description.toLowerCase();

  if (description.includes("sun")) return "☀️";
  if (description.includes("cloud")) return "☁️";
  if (description.includes("rain")) return "🌧️";
  if (description.includes("snow")) return "❄️";
  if (description.includes("storm") || description.includes("thunder")) return "⛈️";
  if (description.includes("clear")) return "✨";

  return "🌈";
}

function applyGradient(description) {
  let gradient = "";

  switch (description.toLowerCase()) {
    case "sunny":
    case "clear":
      gradient = "linear-gradient(to bottom right, #fceabb, #f8b500)";
      break;
    case "clouds":
      gradient = "linear-gradient(to bottom right, #bdc3c7, #2c3e50)";
      break;
    case "rain":
      gradient = "linear-gradient(to bottom right, #4b79a1, #283e51)";
      break;
    case "storm":
    case "thunderstorm":
      gradient = "linear-gradient(to bottom right, #232526, #414345)";
      break;
    case "snow":
      gradient = "linear-gradient(to bottom right, #e6dada, #274046)";
      break;
    default:
      gradient = "linear-gradient(to bottom right, #2c2c44, #1e1e2f)";
  }

  card.style.background = gradient;
}

function setBackground(description) {
  let imagePath = "";

  switch (description.toLowerCase()) {
    case "sunny":
    case "clear":
      imagePath = "img/sunny.jpg";
      break;
    case "clouds":
      imagePath = "img/cloudy.jpg";
      break;
    case "rain":
      imagePath = "img/rainy.jpg";
      break;
    case "snow":
      imagePath = "img/snow.jpg";
      break;
    case "storm":
    case "thunderstorm":
      imagePath = "img/storm.jpg";
      break;
    default:
      imagePath = "img/default.jpg";
  }

  document.body.style.backgroundImage = `url('${imagePath}')`;
}
