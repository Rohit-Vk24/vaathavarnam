import React, { useEffect, useRef, useState } from "react";
import "./Card.css";
import clear from "../Assets/clear.png";
import humidity from "../Assets/humidity.png";
import wind from "../Assets/wind.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import rain from "../Assets/rain.png";
import snow from "../Assets/snow.png";

function Card() {
  const [weatherstate, setweatherstate] = useState(false);

  const allIcons = {
    Old: clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const inputref = useRef();

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fd37b5d449cd7a7f93809c8eea037523`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icons = allIcons[data.weather[0].icon] || clear;

      setweatherstate({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.round(data.main.temp),
        location: data.name,
        icon: icons,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    search("tada").then((data) => console.log(data));
  }, []);

  return (
    <div className="card">
      <div className="wrap">
        <div className="search">
          <input ref={inputref} type="text" className="searchTerm" placeholder="Enter City" />
          <button type="submit" className="searchButton"  onClick={()=>{search(inputref.current.value)}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={"20px"}
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </button>
        </div>
        <div className="weather">
          <img src={weatherstate.icon} alt="pic" />
          <h1 className="temp">{weatherstate.temperature}°c</h1>
          <p className="city">{weatherstate.location}</p>
          <div className="moreinfo">
            <img src={humidity} alt="pic" />
            <span>
              <b>{weatherstate.humidity}%</b> <br />
              Humidity
            </span>

            <img src={wind} alt="pic" />
            <span>
              <b>{weatherstate.windSpeed}kmph</b>
              <br />
              Wind Speed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
