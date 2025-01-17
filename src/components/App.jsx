import React, { useState } from 'react';
import { fetchWeather, fetchForecast, fetchWeatherByCoordinates, fetchForecastByCoordinates } from '../services/WeatherService';
import './App.css'; // Importamos estilos específicos para las tarjetas

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);
      setWeather(weatherData);
      setForecast(forecastData);
      setError(null);
    } catch (err) {
      setError('City not found');
      setWeather(null);
      setForecast(null);
    }
  };

  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
          const weatherData = await fetchWeatherByCoordinates(lat, lon);
          const forecastData = await fetchForecastByCoordinates(lat, lon);
          setWeather(weatherData);
          setForecast(forecastData);
          setError(null);
        } catch (err) {
          setError('Unable to retrieve weather data');
          setWeather(null);
          setForecast(null);
        }
      });
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleLocationSearch}>Use My Location</button>

      {error && <p>{error}</p>}
      {weather && (
        <div className="card weather-card">
          <h2>{weather.name}</h2>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <p>{weather.weather[0].description}</p>
          <p>Temp: {weather.main.temp}°C</p>
        </div>
      )}
      {forecast && (
        <div className="forecast-container">
          <h2>5-Day Forecast</h2>
          <div className="forecast-cards">
            {forecast.list.slice(0, 5).map((item, index) => (
              <div key={index} className="card forecast-card">
                <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                <p>{item.weather[0].description}</p>
                <p>Temp: {item.main.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;