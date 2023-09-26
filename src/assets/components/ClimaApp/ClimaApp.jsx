import React, { useState, useEffect } from 'react';
import Weather from './Weather';

const ClimaApp = () => {
  const [ClimaData, setClimaData] = useState({});
  const apiKey = 'f14a04ef8a47396049184fcf3ec04355';
  const city = 'lima'; // Reemplaza con la ciudad deseada

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData({
          temperature: data.main.temp,
          description: data.weather[0].description,
        });
      });
  }, [city, apiKey]);

  return (
    <div>
      <h1>Aplicación del Clima</h1>
      <Weather weatherData={ClimaData} />
    </div>
  );
};

export default ClimaApp;

