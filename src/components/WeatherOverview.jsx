import React, { useEffect, useState } from "react";
import { dayMap, monthMap } from "../utils/constants";
import "../styles/WeatherOverview.css";

function WeatherOverview({ data }) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setDate(new Date());
    }, 1000 * 60);
  }, []);

  return (
    <>
      {data && (
        <div className="overview-container">
          <div className="overview-data">
            <div>{data.current.temp_c}°</div>
            <div>
              <div>{data.location.name}</div>
              <div>
                {date.getHours()}:
                {date.getMinutes().toString().length < 2 ? 0 : ""}
                {date.getMinutes()}- {dayMap[date.getDay()].slice(0, 3)},{" "}
                {date.getDate()} {monthMap[date.getMonth()].slice(0, 3)} '
                {date.getFullYear().toString().slice(-2)}
              </div>
            </div>
            <div>
              <img src={data.current.condition.icon} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherOverview;
