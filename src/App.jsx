import './App.css';
import Axios from "axios";
import React, { useState } from "react";

export default function App() {

  const KEY = "5d2368cbf4ca0f2a36d6b1c5ae9237ca";

  const [city, setCity] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`);
      setData(response.data);
      console.log(response.data);
    } catch {
      alert("No city found so far");
    } finally {
      setCity(''); // Clear the textbox here
    }
  };

  // Convert Kelvin to Celsius and Fahrenheit
  const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);
  const kelvinToFahrenheit = (temp) => ((temp - 273.15) * 9 / 5 + 32).toFixed(2);

  // Convert Unix timestamp to time string
  const unixToTimeString = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="container">
      <div className="header align-center">
        <h1>Weather Forecast</h1>
      </div>
      <div className="align-center input-section">
        <input
          className="inputget"
          type="text"
          placeholder="Enter City... Ex: Chennai"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button className="fetch" onClick={fetchData}>Fetch</button>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6  order-sm-2 col-xs-2 order-xs-2 middle">
          {data && (
            <>
              <div className="gap">
                <h2>Humidity: {data.main.humidity}%</h2>
              </div>
              <div className="gap">
                <h2>Feels Like: {kelvinToCelsius(data.main.feels_like)}°C</h2>
              </div>
              <div className="gap">
                <h2>Wind Speed: {data.wind.speed} m/s </h2>
              </div>
              <div className="gap">
                <h2>Visibility: {data.visibility / 1000} km</h2>
              </div>
              <div className="gap">
                <h2>Long: {data.coord.lon} <br />Lat: {data.coord.lat}</h2>
              </div>
            </>
          )}
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center  align-items-center order-md-2 order-sm-1 order-xs-1 middle  ">
          <div className="middle gap">
            {data && (
              <>
                <img
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                  alt="Weather Icon"
                  className="weather-icon"
                />
                <h1>{data.name}</h1>
                <p>{data.weather[0].description}</p>
                <p>{kelvinToCelsius(data.main.temp)}°C / {kelvinToFahrenheit(data.main.temp)}°F</p>
              </>
            )}
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 order-md-3 order-sm-3 order-xs-3 middle">
          {data && (
            <>
              <div className="gap">
                <h2>Sunrise: {unixToTimeString(data.sys.sunrise)} <br />Sunset: {unixToTimeString(data.sys.sunset)}</h2>
              </div>
              <div className="gap">
                <h2>Timezone: {data.timezone}</h2>
              </div>
              <div className="gap">
                <h2>Pressure: {data.main.pressure} hPa</h2>
              </div>
              <div className="gap">
                <h2>Sea Level: {data.main.sea_level}m</h2>
              </div>
              <div className="gap">
                <h2>Ground Level: {data.main.grnd_level} m</h2>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
