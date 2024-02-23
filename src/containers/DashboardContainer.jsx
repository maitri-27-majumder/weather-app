import React, { useEffect, useState } from "react";
import { getForecastData } from "../utils/functions";
import WeatherOverview from "../components/WeatherOverview";
import { conditionMap } from "../utils/constants";
import "../styles/DashboardContainer.css";
import WeatherDetails from "../components/WeatherDetails";
import { Spin } from "antd";

function DashboardContainer() {
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      getForecastData(position?.coords)
        .then((data) => {
          setForecastData(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }, []);

  const getForcastDataFromLocation = () => {
    setIsLoading(true);
    getForecastData(location)
      .then((data) => {
        setForecastData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading)
    return (
      <div className="weather-loader">
        <Spin size="large" />
      </div>
    );

  return (
    <div
      className={`dashboard-container ${
        forecastData
          ? Object.entries(conditionMap).reduce((acc, item) => {
              if (
                item[1].includes(forecastData.current.condition.text.trim())
              ) {
                return item[0];
              }
              return acc;
            }, "")
          : ""
      }`}
    >
      <WeatherOverview data={forecastData} />
      <WeatherDetails
        data={forecastData}
        location={location}
        setLocation={setLocation}
        getForcastDataFromLocation={getForcastDataFromLocation}
      />
    </div>
  );
}

export default DashboardContainer;
