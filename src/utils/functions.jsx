import axios from "axios";
import { baseURL } from "../configs/axios";

export const getForecastData = async (pos) => {
  let location = pos;
  if (location) {
    if (location.latitude) {
      const { latitude, longitude } = location;
      location = `${latitude},${longitude}`;
    }
    const forecastData = await axios.get(
      `${baseURL}forecast.json?key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&q=${location}&aqi=no`
    );
    return forecastData?.data;
  }
};

export const getAutoCompleteLocation = async (text) => {
  const locationData = await axios.get(
    `${baseURL}search.json?key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&q=${text}`
  );
  return locationData?.data;
};
