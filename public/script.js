// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const weatherInfo = document.getElementById('weather-info');
const locationInfo = document.getElementById('location-info');

// Weather data elements
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');
const cityName = document.getElementById('city-name');
const dateTime = document.getElementById('date-time');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

let lastSearchedCity = '';

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

// Handle search
async function handleSearch() {
  const city = cityInput.value.trim();

  if (!city) {
    showError('Please enter a city name');
    return;
  }

  // Clear previous states
  hideError();
  hideWeather();
  showLoading();

  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch weather data');
    }

    // Store for geolocation fallback
    lastSearchedCity = city;

    // Display weather data
    displayWeather(data);
    showWeather();
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}

// Display weather data
function displayWeather(data) {
  temperature.textContent = `${data.temperature}°C`;
  description.textContent = data.description;
  cityName.textContent = `${data.name}, ${data.country}`;
  feelsLike.textContent = `${data.feels_like}°C`;
  humidity.textContent = `${data.humidity}%`;
  windSpeed.textContent = `${data.wind_speed} m/s`;
  pressure.textContent = `${data.pressure} hPa`;
  visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
  sunrise.textContent = data.sunrise;
  sunset.textContent = data.sunset;

  // Set weather icon
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
  weatherIcon.alt = data.description;

  // Update date/time
  updateDateTime(data.timezone, data.dt);

  // Update location info
  locationInfo.textContent = `Weather for ${data.name}, ${data.country}`;
}

// Update date and time based on timezone
function updateDateTime(timezone, timestamp) {
  const localTime = new Date((timestamp + timezone) * 1000);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  };

  // Calculate timezone offset for display
  const tzHours = timezone / 3600;
  const tzLabel = `UTC${tzHours >= 0 ? '+' : ''}${tzHours}`;

  dateTime.textContent = `${localTime.toLocaleDateString('en-US', options)} (${tzLabel})`;
}

// Get user's location on page load (optional)
async function getLocation() {
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      showLoading();
      hideError();
      hideWeather();

      try {
        const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch weather for your location');
        }

        displayWeather(data);
        showWeather();
        cityInput.value = data.name;
        lastSearchedCity = data.name;
        locationInfo.textContent = `Weather for your current location (${data.name}, ${data.country})`;
      } catch (error) {
        // Silently fail for geolocation, user can still search manually
        console.log('Geolocation weather fetch failed:', error.message);
        hideLoading();
      }
    },
    (error) => {
      console.log('Geolocation error:', error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

// UI State management
function showLoading() {
  loading.style.display = 'flex';
  weatherInfo.style.display = 'none';
  errorMessage.style.display = 'none';
}

function hideLoading() {
  loading.style.display = 'none';
}

function showWeather() {
  weatherInfo.style.display = 'block';
}

function hideWeather() {
  weatherInfo.style.display = 'none';
}

function showError(message) {
  errorText.textContent = message;
  errorMessage.style.display = 'flex';
  hideWeather();
  hideLoading();
}

function hideError() {
  errorMessage.style.display = 'none';
}

// Add some example cities on load for user convenience
const exampleCities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney'];

function addExampleCities() {
  const searchContainer = document.querySelector('.search-container');
  const examplesDiv = document.createElement('div');
  examplesDiv.className = 'example-cities';
  examplesDiv.style.cssText = 'margin-top: 10px; text-align: center; font-size: 0.9rem; color: rgba(255,255,255,0.8);';

  const examplesText = document.createElement('p');
  examplesText.textContent = 'Try: ';
  examplesDiv.appendChild(examplesText);

  exampleCities.forEach((city, index) => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = city;
    link.style.cssText = 'color: white; margin: 0 5px; text-decoration: underline; cursor: pointer;';
    link.addEventListener('click', (e) => {
      e.preventDefault();
      cityInput.value = city;
      handleSearch();
    });
    examplesDiv.appendChild(link);

    if (index < exampleCities.length - 1) {
      examplesDiv.appendChild(document.createTextNode('|'));
    }
  });

  searchContainer.appendChild(examplesDiv);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  addExampleCities();

  // Auto-focus search input
  cityInput.focus();

  // Optionally get user's location automatically
  // Uncomment the line below if you want to auto-detect location on page load
  // getLocation();
});
