import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TodayHighlights() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = 'f14a04ef8a47396049184fcf3ec04355';
    const city = 'lima';

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del clima:', error);
      });
  }, []);

  if (!weatherData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Weather Information for Bogotá</h2>
      <p>Speed: {weatherData.wind.speed} m/s</p>
      <p>Visibility: {weatherData.visibility} meters</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Pressure: {weatherData.main.pressure} hPa</p>
    </div>
  );
}

export default TodayHighlights;
