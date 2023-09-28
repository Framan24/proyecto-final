import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherForecast.css";

function WeatherForecast({ sendCountry, apiKey,  }) {
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${sendCountry}&appid=${apiKey}&units=${unit}`
        );

        if (!response.data.list || response.data.list.length === 0) {
          throw new Error("No se encontraron datos de pronóstico.");
        }

        // Obtener la fecha actual
        const currentDate = new Date();

        // Calcular la fecha para el quinto día a partir de la fecha actual
        const fifthDay = new Date(currentDate);
        fifthDay.setDate(currentDate.getDate() + 5);

        // Filtrar los datos para obtener solo los de los próximos cinco días
        const filteredData = response.data.list.filter((item) => {
          // Convertir la fecha del elemento a un objeto Date
          const itemDate = new Date(item.dt * 1000); // Multiplicar por 1000 para convertir segundos a milisegundos

          // Verificar si la fecha del elemento está dentro de los próximos 5 días
          return itemDate >= currentDate && itemDate <= fifthDay;
        });

        // Tomar solo el primer registro de cada día
        const dailyData = [];
        let currentDay = null;

        for (const item of filteredData) {
          const itemDate = new Date(item.dt * 1000);

          if (!currentDay || itemDate.getDate() !== currentDay.getDate()) {
            dailyData.push(item);
            currentDay = itemDate;
          }
        }

        setForecastData(dailyData);
      } catch (error) {
        setError(error);
      }
    };

    fetchWeatherForecast();
  }, [sendCountry, apiKey, unit]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const iconBaseUrl = "https://openweathermap.org/img/wn/";

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  // Función para redondear un número a dos decimales
  const roundToTwoDecimalPlaces = (value) => {
    return Math.round(value * 100) / 100;
  };

  const convertTemperature = (tempCelsius) => {
    if (unit === "imperial") {
      return roundToTwoDecimalPlaces((tempCelsius * 9) / 5 + 32);
    } else {
      return roundToTwoDecimalPlaces(tempCelsius);
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
