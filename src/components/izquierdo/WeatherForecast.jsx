import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherForecast.css';

function WeatherForecast({ sendCountry, apiKey }) {
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${sendCountry}&appid=${apiKey}&units=metric`
        );

        if (!response.data.list || response.data.list.length === 0) {
          throw new Error('No se encontraron datos de pronóstico.');
        }

        // Filtrar los datos para obtener solo los de los próximos cinco días
        const today = new Date();
        const fiveDaysLater = new Date(today);
        fiveDaysLater.setDate(today.getDate() + 5);

        const filteredData = response.data.list.filter((item) => {
          const itemDate = new Date(item.dt_txt);
          return itemDate >= today && itemDate < fiveDaysLater;
        });

        setForecastData(filteredData.slice(0, 5)); // Mostrar solo los próximos 5 días
      } catch (error) {
        setError(error);
      }
    };

    fetchWeatherForecast();
  }, [sendCountry, apiKey]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const iconBaseUrl = 'https://openweathermap.org/img/wn/';

  return (
    <div>
      <h2>Pronóstico del Clima para los Próximos Cinco Días</h2>
      <div className="forecast-container">
        {forecastData.map((dayData, index) => (
          <div key={index} className="forecast-day">
            <p>Día {index + 1}</p>
            <img
              src={`${iconBaseUrl}${dayData.weather[0].icon}@2x.png`}
              alt={dayData.weather[0].description}
            />
            <p>{dayData.main.temp_max}°C</p>
            <p>{dayData.main.temp_min}°C</p>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default WeatherForecast;
