"use strick";

// fetch the elements
const userTab = document.querySelector("#data-userWeather"); // by default user Tab
const searchTab = document.querySelector("#data-searchWeather"); // move to search tab
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(
  ".grant-location-container" // userTab [grant lacoation conatiner]
);
const searchForm = document.querySelector("#data-searchForm"); //search tab input form
const loadingScreen = document.querySelector(".loading-container"); // loading gif
const userInfoContainer = document.querySelector(".user-info-container"); // show weather info

// intially variables need?

let oldTab = userTab; // deafault tab initailise
const API_KEY = "e50b47e1eeea480a636d53d6359744ab";
oldTab.classList.add("current-tab");

// agar local storage me user ke coordinate hai toh function call ho rha hoga
getfromSessionStorage();

// Switch the tab
function switchTab(newTab) {
  if (newTab != oldTab) {
    oldTab.classList.remove("current-tab");
    oldTab = newTab;
    oldTab.classList.add("current-tab");

    if (!searchForm.classList.contains("active")) {
      // kya search form wala container is invisible, if yes then make it visible
      userInfoContainer.classList.remove("active");
      grantAccessContainer.classList.remove("active");
      searchForm.classList.add("active");
    } else {
      // main pehle search wale tab pr tha ab your tab visible karna hai
      searchForm.classList.remove("active");
      userInfoContainer.classList.remove("active");
      // ab main your weather tab me aagya hu, toh weather bhi display krna poadega, so let's check local storage first
      // for coordinates, if we haved saved them there.
      getfromSessionStorage();
    }
  }
}

userTab.addEventListener("click", () => {
  // pass clicked tab as input parameter
  switchTab(userTab);
});

searchTab.addEventListener("click", () => {
  // pass clicked tab as input parameter
  switchTab(searchTab);
});

// check if coordinates are already present in session storage
function getfromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if (!localCoordinates) {
    // agar local coordinates nahi mile
    grantAccessContainer.classList.add("active");
  } else {
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
  }
}

// API call with the help of user coordinate
async function fetchUserWeatherInfo(coordinates) {
  const { lat, lon } = coordinates; // destructure
  grantAccessContainer.classList.remove("active");
  // make loader visible
  loadingScreen.classList.add("active");

  // API Call
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    // Display weather data render function calling
    renderWeatherInfo(data);
  } catch (err) {
    alert(`Check your internet connection ${err}`);
  }
}

// Display weather data render function
function renderWeatherInfo(weatherInfo) {
  // firstly, we have to fetch  the elements
  const cityName = document.querySelector("#data-cityName");
  const countryIcon = document.querySelector("#data-countryIcon");
  const desc = document.querySelector("#data-weatherDesc");
  const weatherIcon = document.querySelector("#data-weatherIcon");
  const temp = document.querySelector("#data-temp");
  const windSpeed = document.querySelector("#data-windspeed");
  const humidity = document.querySelector("#data-humidity");
  const cloudiness = document.querySelector("#data-clouds");

  // fetch values from weather Info Object and put it UI elements
  cityName.innerText = weatherInfo?.name;
  countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
  desc.innerText = weatherInfo?.weather?.[0]?.description;
  weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
  temp.innerText = `${weatherInfo?.main?.temp} °C`;
  windSpeed.innerText = `${weatherInfo?.wind?.speed}m/s`;
  humidity.innerText = `${weatherInfo?.main?.humidity}%`;
  cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}

// user ki getLocation function with help of navigation geolocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition); // showposition => callback function ko call krdiya
  } else {
    alert(
      `It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.`
    );
  }

  // define callback function
  function showPosition(position) {
    const userCoordinates = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    //user coordinates set in local storage [sessionStorage]
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
  }
}

// element fetch and listener
const grandAccessBtn = document.querySelector("#data-grantAccess");
grandAccessBtn.addEventListener("click", getLocation);

const searchInput = document.querySelector("#data-searchInput");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = searchInput.value;
  if (cityName === "") {
    return;
  } else {
    fetchSearchWeatherInfo(cityName);
  }
});

// fetch API with help of city Name
async function fetchSearchWeatherInfo(city) {
  loadingScreen.classList.add("active");
  userInfoContainer.classList.remove("active");
  grantAccessContainer.classList.remove("active");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
  } catch (err) {
    alert(`Check your internet connection ${err}`);
  }
}