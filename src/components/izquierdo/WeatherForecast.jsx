import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherForecast.css";

function WeatherForecast({ sendCountry, apiKey }) {
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${sendCountry}&appid=${apiKey}&units=metric`
        );

        if (!response.data.list || response.data.list.length === 0) {
          throw new Error("No se encontraron datos de pronóstico.");
        }

       // Obtener la fecha actual
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        // Filtrar los datos para obtener solo los de los próximos cinco días
        const filteredData = response.data.list.filter((item) => {
          // Convertir la fecha del elemento a un objeto Date
          const itemDate = new Date(item.dt * 1000); // Multiplicar por 1000 para convertir segundos a milisegundos

          // Verificar si la fecha del elemento es mayor o igual a la fecha actual
          // Esto mostrará los datos de los próximos 5 días.
          return itemDate >= currentDate;
        }); 

        // Tomar solo los primeros 5 elementos para los próximos 5 días
        setForecastData(filteredData.slice(0, 5));
      } catch (error) {
        setError(error);
      }
    };

    fetchWeatherForecast();
  }, [sendCountry, apiKey]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const iconBaseUrl = "https://openweathermap.org/img/wn/";
  const toggleUnit = () => {
    if (unit === "metric") {
      setUnit("imperial");
    } else {
      setUnit("metric");
    }
  };

  const convertTemperature = (tempCelsius) => {
    if (unit === "imperial") {
      return (tempCelsius * 9) / 5 + 32;
    } else {
      return tempCelsius;
    }
  };

  return (
    <div>
      <div className="botton">
        <button className="bot" onClick={toggleUnit}>
          ({unit === "metric" ? "°C" : "°F"})
        </button>
      </div>
      <div className="forecast-container">
        {forecastData.map((dayData, index) => (
          <div key={index} className="forecast-day">
            <p>Fecha: {new Date(dayData.dt * 1000).toLocaleDateString()}</p>
            <img
              src={`${iconBaseUrl}${dayData.weather[0].icon}@2x.png`}
              alt={dayData.weather[0].description}
            />
            <p>Max: {convertTemperature(dayData.main.temp_max)}°</p>
            <p>Min: {convertTemperature(dayData.main.temp_min)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast;
