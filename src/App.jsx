import './App.css';
import WeatherApp from './components/derecho/WeatherApp';
import WeatherForecast from './components/izquierdo/WeatherForecast';
import TodayHighlights from './components/parte de abajo/TodayHighlights'

function App () {

  
    return (
      <section className='appclima'>
    
        <WeatherApp/>
        <WeatherForecast sendCountry="lima" apiKey="f14a04ef8a47396049184fcf3ec04355" />
       
      </section>
    );
  }


export default App;
