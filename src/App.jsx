import React, { useEffect, useState} from 'react';
import axios from "axios";
import './App.css';
import WeatherApp from './components/derecho/WeatherApp';
import WeatherForecast from './components/izquierdo/WeatherForecast';
import TodayHighlights from './components/parte de abajo/TodayHighlights'

function App () {
  useEffect(()=>{
    actualisar();
  }),[];




const[ciudad, setCiudad] = useState ("lima")
const [weatherData, setWeatherData] = useState(null);
function actualisar() {
  const apiKey = 'f14a04ef8a47396049184fcf3ec04355';
  axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del clima:', error);
      });
}



    return (
      <section className='appclima'>
        <div>
          <WeatherApp cambiociudad={(el) => {setCiudad(el), actualisar();}}/>
        </div>
        <div>
          <div>
            <WeatherForecast sendCountry={ciudad} apiKey="f14a04ef8a47396049184fcf3ec04355" />
          </div>
          <div>
            <TodayHighlights weatherData={weatherData}/>
          </div>
        </div>
        
        
       
      </section>
    );
    }


export default App;
