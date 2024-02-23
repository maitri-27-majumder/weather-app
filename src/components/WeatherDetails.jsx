import { Dropdown, Input } from "antd";
import React, { useCallback, useState } from "react";
import MaxTemp from "../assets/icons/MaxTemp";
import "../styles/WeatherDetails.css";
import MinTemp from "../assets/icons/MinTemp";
import Humidity from "../assets/icons/Humidity";
import Wind from "../assets/icons/Wind";
import { getAutoCompleteLocation } from "../utils/functions";
import _ from "lodash";
import Search from "antd/es/input/Search";

function WeatherDetails({
  data,
  location,
  setLocation,
  getForcastDataFromLocation,
}) {
  const [locationList, setLocationList] = useState([]);
  const handleWeatherLocationChange = (e) => {
    debouncedLocationGetter(e.target.value);
    setLocation(e.target.value);
  };

  const debouncedLocationGetter = useCallback(
    _.debounce((value) => {
      getAutoCompleteLocation(value).then((data) => {
        setLocationList(data);
      });
    }, 1000),
    []
  );
  return (
    <>
      {data && (
        <div className="weather-details-container">
          <Dropdown
            menu={{
              items: locationList.map((item, index) => {
                return {
                  key: index + 1,
                  label: (
                    <div>
                      {item.name}, {item.region}, {item.country}
                    </div>
                  ),
                };
              }),
              onClick: ({ key }) => {
                const loc = locationList[Number(key) - 1];
                setLocation(`${loc.name},${loc.region},${loc.country}`);
              },
            }}
          >
            <Search
              placeholder="Search Location..."
              onChange={handleWeatherLocationChange}
              onSearch={getForcastDataFromLocation}
              className="weather-location-input"
              value={location}
            />
          </Dropdown>
          <div className="weather-details-forecast-container">
            <div className="weather-details-forecast">
              <div>Weather Details...</div>
              <div>
                {data.forecast.forecastday[0].day.condition.text.toUpperCase()}
              </div>
              <div className="weather-details-forecast-list">
                <div className="weather-details-forecast-list-item">
                  <div>Temp max</div>
                  <div>
                    <div>{data.forecast.forecastday[0].day.maxtemp_c}°</div>
                    <MaxTemp />
                  </div>
                </div>
                <div className="weather-details-forecast-list-item">
                  <div>Temp min</div>
                  <div>
                    <div>{data.forecast.forecastday[0].day.mintemp_c}°</div>
                    <MinTemp />
                  </div>
                </div>
                <div className="weather-details-forecast-list-item">
                  <div>Humidity</div>
                  <div>
                    <div>{data.forecast.forecastday[0].day.avghumidity}%</div>
                    <Humidity />
                  </div>
                </div>
                <div className="weather-details-forecast-list-item">
                  <div>Wind</div>
                  <div>
                    <div>
                      {data.forecast.forecastday[0].day.maxwind_kph}km/h
                    </div>
                    <Wind />
                  </div>
                </div>
              </div>
            </div>
            <div className="weather-details-forecast">
              <div>Today's Weather Forecast...</div>
              <div className="weather-details-hourly-forecast-list">
                {data.forecast.forecastday[0].hour.map((item, index) => {
                  return (
                    <div
                      className="weather-details-hourly-forecast-list-item"
                      key={`hourly-forcast-item-${index}`}
                    >
                      <div>
                        <img src={item.condition.icon} />
                        <div>
                          <div>{item.time.slice(-5)}</div>
                          <div>{item.condition.text}</div>
                        </div>
                      </div>
                      <div>{item.temp_c}°</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherDetails;
