import "./TodayHighlights.css";
import { RiNavigationFill } from "react-icons/ri";
function TodayHighlights(props) {
  if (!props.weatherData) {
    return <div>Cargando...</div>;
  } else {
    return (
      <div className='div-Today-Highlights'>
      <h2>Today’s Highlights</h2>
      <div className='weather-info'>
        <div className='day-weather1'>
          <p className='status'>Wind Status</p>
          <h2 className='w-status'>
            <strong className='strong-status'>
            {props.weatherData.wind.speed}
            </strong>
           
          </h2>
          <div className='wind-status'>
            <div className='icon-status'>
              <RiNavigationFill className='icon' />
            </div>
          </div>
        </div>
        <div className='div-tag-day-weather1'>
          <p className='p-humidity'>Humidity</p>
          <h2 className='h2-humidity'>
          {props.weatherData.main.humidity}%
          </h2>
          <div className='div-rod-humidity'>
            <div className='div-percentage-humidity'>
              <p>0</p>
              <p>50</p>
              <p>100</p>
            </div>
            <div className='div1-percentage-bar-humidity'>
              <div
                className='div2-percentage-bar-humidity'
                style={{
                  '--w': `${props.weatherData.main.humidity}%`,
                }}
              />
            </div>
            <p className='p-percentage-humidity'>%</p>
          </div>
        </div>
        
      </div>
     <div className="abajo">
      <div className='div-tag-day-weather2'>
                  <p className='p-tag-day-weather2'>Visibility</p>
                  <h2 className='h2-tag-day-weather2'>
                    <strong className='strong-tag-day-weather2'>
                      {Math.round(props.weatherData.visibility / 1000)}
                    </strong>{' '}
                    km
                  </h2>
                </div>
                <div className='div-tag-day-weather2'>
                  <p className='p-tag-day-weather2'>Air Pressure</p>
                  <h2 className='h2-tag-day-weather2'>
                    <strong className='strong-tag-day-weather2'>
                      {Math.round(props.weatherData.main.pressure)}
                    </strong>{' '}
                    hPa
                  </h2>
                </div>
      </div> 
    </div>
    );
  }
}

export default TodayHighlights;
