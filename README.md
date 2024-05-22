# Weather App

A sleek and responsive web application that provides real-time weather updates, forecasts, and alerts. Built using HTML, CSS, and JavaScript, this app offers a user-friendly interface and detailed weather data for locations worldwide.

## Features

- **Current Weather Conditions**: Automatically detects and displays the weather for your current location, including temperature, windspeed, humidity, and cloudiness.
- **Search Functionality**: Look up weather data for any country, state, or city around the globe.
- **Severe Weather Alerts**: Stay safe with real-time alerts for severe weather conditions.
- **Interactive Weather Maps**: Visualize weather patterns with dynamic maps.
- **Session Storage**: Utilizes `sessionStorage` to store user coordinates for a seamless experience.

## Technologies Used

- **HTML**: For structuring the content of the web pages.
- **CSS**: For styling and layout to create a responsive and visually appealing design.
- **JavaScript**: For dynamic content and integrating with the weather API, as well as managing session storage.

## Installation

1. **Clone the repository:**
   ```bash
    https://github.com/Nitin-Gumber/Weather-App.git
   
## Usage

1.   **Weather for Current Location:** Upon loading, the app will prompt you to allow location access. If granted, it will display the current weather conditions for your location, including temperature, windspeed, humidity, and cloudiness. The coordinates are stored in sessionStorage for the duration of the session.
2.   **Search for Other Locations:** Use the search bar to enter any country, state, or city to see the weather conditions for that location.
3.   **View Forecasts and Alerts:** Access the 7-day weather forecast and receive real-time severe weather alerts to stay informed and safe.

## API Integration

This app uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data. Ensure you have an API key and replace it in the JavaScript file.

## License
This project is licensed under the MIT License.

## Acknowledgements
- [OpenWeatherMap](https://openweathermap.org/api)
