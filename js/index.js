"use strict";
let searchInput = document.querySelector("#search");

async function search(location) {
    let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${location}&days=3`);

    if (weather.ok && weather.status !== 400) {
        let data = await weather.json();
        displayCurrent(data.location, data.current);
        displayAnother(data.forecast.forecastday);
    }
}

searchInput.addEventListener("keyup", (event) => search(event.target.value));

let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(location, currentWeather) {
    if (currentWeather != null) {
        let lastUpdated = new Date(currentWeather.last_updated.replace(" ", "T"));
        let weatherHtml = `
        <div class="weather-card position-relative rounded-start-2">
            <div class="weather-header rounded-start-2 position-absolute end-0 start-0 top-0 w-100 p-1 px-2 d-flex justify-content-between">
                <h4 class="day">${daysOfWeek[lastUpdated.getDay()]}</h4>
                <h4 class="date">${lastUpdated.getDate()} ${months[lastUpdated.getMonth()]}</h4>
            </div>
            <div class="weather-body d-flex flex-column align-items-center mt-2">
                <h5 class="location">${location.name}</h5>
                <div class="weather-info d-flex">
                    <div class="weather-degree">${currentWeather.temp_c}<sup>o</sup>C</div>
                    <div class="weather-icon align-self-center"><img src="https:${currentWeather.condition.icon}" alt="icon"></div>
                </div>
                <div class="weather-custom">${currentWeather.condition.text}</div>
                <div class="weather-footer d-flex">
                    <span><img src="images/icon-umberella@2x.png" alt="weather-icon"> 10%</span>
                    <span><img src="images/icon-wind@2x.png" alt="weather-icon"> 32km/h</span>
                    <span><img src="images/icon-compass@2x.png" alt="weather-icon"> east</span>
                </div>
            </div>
        </div>`;
        document.querySelector("#divs").innerHTML = weatherHtml;
    }
}

function displayAnother(forecastData) {
    let weatherHtml = "";
    for (let i = 1; i < forecastData.length; i++) {
        weatherHtml += `
        <div class="weather-card2 position-relative weather-days">
            <div class="weather-header position-absolute end-0 start-0 top-0 w-100 p-1 d-flex justify-content-center">
                <h4 class="day">${daysOfWeek[new Date(forecastData[i].date.replace(" ", "T")).getDay()]}</h4>
            </div>
            <div class="weather-body h-100 d-flex flex-column justify-content-center align-items-center">
                <div class="weather-icon">
                    <img class="" src="https:${forecastData[i].day.condition.icon}" alt="icon">
                </div>
                <div class="weather-degree fs-2">${forecastData[i].day.maxtemp_c}<sup>o</sup>C</div>
                <small>${forecastData[i].day.mintemp_c}<sup>o</sup></small>
                <div class="weather-custom mt-3">${forecastData[i].day.condition.text}</div>
            </div>
        </div>`;
    }
    document.querySelector("#divs").innerHTML += weatherHtml;
}

search("london");
