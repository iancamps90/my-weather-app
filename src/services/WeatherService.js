// src/services/WeatherService.js
import axios from 'axios';

const API_KEY = '20fce56325f8977287150562f7a38d98';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchWeather = async (city) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

export const fetchForecast = async (city) => {
    try {
        const response = await axios.get(FORECAST_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        throw error;
    }
};

export const fetchWeatherByCoordinates = async (lat, lon) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

export const fetchForecastByCoordinates = async (lat, lon) => {
    try {
        const response = await axios.get(FORECAST_URL, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        throw error;
    }
};