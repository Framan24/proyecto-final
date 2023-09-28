import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLocationDot } from "react-icons/fa6";
import './WeatherApp.css';

function App(props) {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [inputVisible, setInputVisible] = useState(false);

  function CambiarCiudad() {
    let ciudad = document.getElementById('inputCiudad').value;
    props.cambiociudad(ciudad);
    fetchWeatherData(ciudad);

    const iconCode = weatherData.weather[0].icon;
    const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    setWeatherIcon(weatherIconUrl);
  }

  function toggleInputVisibility() {
    setInputVisible(!inputVisible);
  }

  const apiKey = 'f14a04ef8a47396049184fcf3ec04355';

  useEffect(() => {
    fetchWeatherData();

    // Usar el enlace base de OpenWeatherMap para las imágenes y el icono proporcionado por la API
    const weatherIconUrl = `https://openweathermap.org/img/wn/03d.png`;
    setWeatherIcon(weatherIconUrl);
  }, []);

  const fetchWeatherData = async (c) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${c ? c : 'london'}&appid=${apiKey}&units=metric`
      );

      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const diassemana = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const meces = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayOfWeekAbbr = diassemana[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthAbbr = meces[date.getMonth()];

    return `${dayOfWeekAbbr}, ${dayOfMonth} ${monthAbbr}`;
  };

  return (
    <div className="App">
      {inputVisible  && (
        <div className='barra'>
          <input
            className='buscador'
            id="inputCiudad"
            type="text"
            placeholder="Search for places"
          />
          <button className='btn' onClick={CambiarCiudad}>Search</button>
        </div>
      )}
      <button className='sidebar' onClick={toggleInputVisibility}>
        {inputVisible ? 'X' : 'Seach for places'}
      </button>
      {weatherData && (
        <div>
          {weatherIcon && (
            <img
              className='imagen'
              src={weatherIcon}
              alt={weatherData.weather[0].description}
              style={{ width: '200px', height: '200px' }}
            />
          )}
          <h1 className="numero">
            <strong className='numerogra'>
              {Math.round(weatherData.main.temp)}
              °C
            </strong>
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
