import { DateTime } from "luxon";
import "./current-weather.css"

const formatDateTime = (epochDateTime) => {
  const epochTimeInMillis = epochDateTime.toString().length === 10 ? epochDateTime * 1000 : epochDateTime;
    return DateTime.fromMillis(epochTimeInMillis).toFormat("cccc, dd LLL yyyy' | 'HH:mm a");
  };
  
  
  const formatTime = (epochTime) => {
    const epochTimeSun = epochTime.toString().length === 10 ? epochTime * 1000 : epochTime;
    return DateTime.fromMillis(epochTimeSun).toFormat("HH:mm a");
  };
  
  
  
  const CurrentWeather = ({data}) => {
  
    const formatBckgd = () => {
     if (data.main.temp <= 3) {
      return "Vcold";
    } else if (data.main.temp > 3 && data.main.temp <= 10) {
      return "cold";
    } else if (data.main.temp > 10 && data.main.temp <= 17) {
      return "mid";
    } else if (data.main.temp > 17 && data.main.temp <= 26) {
      return "hot";
    } else if (data.main.temp > 26) {
      return "Vhot";
    } else {
       if (!data.main.temp) return "base"
    }
    }
  
    return (<>
        <div className={`weather ${formatBckgd()}`}>
        <div className="top">
          <h1 className="city">{data.city}</h1>
          <span className="para-value">{formatDateTime(data.dt)}</span>
  
          <div className="current">
            <p className="temp">{Math.round(data.main.temp)}&deg;</p>
  
            <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`}></img>
          </div>
  
          <p className="weather-description">{data.weather[0].description}</p>
  
          <div className="para-row">
            <span className="para-label">Feels Like: </span>
            <span className="para-value">{Math.round(data.main.feels_like)}&deg;</span>
          </div>
  
          <div className="high-low">
            <div className="para-row">
              <span className="para-label">H: </span>
              <span className="para-value">{Math.round(data.main.temp_max)}&deg;</span>
            </div>
            <div className="para-row">
              <span className="para-label">L: </span>
              <span className="para-value">{Math.round(data.main.temp_min)}&deg;</span>
            </div>
          </div>
  
          <div className="high-low">
            <div className="para-row">
              <span className="para-label">Wind: </span>
              <span className="para-value">{data.wind.speed} m/s</span>
            </div>
            <div className="para-row">
              <span className="para-label">Humidity: </span>
              <span className="para-value">{data.main.humidity}%</span>
            </div>
          </div>
  
          <div className="high-low">
            <div className="para-row">
              <span className="para-label">Pressure: </span>
              <span className="para-value">{data.main.pressure} hPa</span>
            </div>
            <div className="para-row">
              <span className="para-label">Visibilty: </span>
              <span className="para-value">{data.visibility / 1000} km</span>
            </div>
          </div>
  
          <div className="high-low">
            <div className="para-row">
              <span className="para-label">Sunrise: </span>
              <span className="para-value">{formatTime(data.sys.sunrise)}</span>
            </div>
            <div className="para-row">
              <span className="para-label">Sunset: </span>
              <span className="para-value">{formatTime(data.sys.sunset)}</span>
            </div>
          </div>
  
        </div>
  
      </div> </>
    );
  }
  
  export default CurrentWeather;