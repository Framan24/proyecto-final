import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLocationDot } from "react-icons/fa6";
import './WeatherApp.css';
function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState('');

  const apiKey = 'f14a04ef8a47396049184fcf3ec04355';

  useEffect(() => {
    if (weatherData && weatherData.weather && weatherData.weather[0]) {
      // Usar el enlace base de OpenWeatherMap para las imágenes y el icono proporcionado por la API
      const iconCode = weatherData.weather[0].icon;
      const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
      setWeatherIcon(weatherIconUrl);
    }
  }, [weatherData]);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
// funcion para sacar los dias del año
const handleDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const diassemana = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const meces = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
  const dayOfWeekAbbr = diassemana[date.getDay()];
  const dayOfMonth = date.getDate();
  const monthAbbr = meces[date.getMonth()];

  return `${dayOfWeekAbbr}, ${dayOfMonth} ${monthAbbr}`;
};
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Seach for places"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeatherData}>Obtener Clima</button>
      {weatherData && (
        <div>
          {weatherIcon && (
            <img className='imagen'
              src={weatherIcon}
              alt={weatherData.weather[0].description}
              style={{ width: '200px', height: '200px' }}
            />
          )}
           <h1 className="numero">
                <strong className='numerogra'>
                  {Math.round(weatherData.main.temp)}
                °C
                </strong >
              </h1>
          <p className='descripcion'>{weatherData.weather[0].description}</p>
          <p className='today'>Today • {handleDate(weatherData.dt)}</p>
          <p className='ciudad'> <FaLocationDot />{weatherData.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;
