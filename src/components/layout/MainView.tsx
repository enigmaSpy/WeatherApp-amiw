import { getWeatherInfo } from "../../utils/weatherDescription";
import { SearchBar } from "../ui/SearchBar";

const now = new Date();
const dayFormatter = new Intl.DateTimeFormat("pl-PL", {
  weekday: "long",
});
const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
});

const currentDay = dayFormatter.format(now);
export const MainView = ({ weather }: { weather: CurrentWeather | null }) => {
  return (
    <div>
      <div>
        <h1>City</h1>
        <p>{currentDay.charAt(0).toLocaleUpperCase() + currentDay.slice(1)}</p>
        <p>{dateFormatter.format(now)}</p>
        <h2>{getWeatherInfo(weather!.weather_code).icon}</h2>
        <p>{weather?.temperature_2m} ℃</p>
        <p>{getWeatherInfo(weather!.weather_code).label}</p>
      </div>
      <div>
        <SearchBar/>
      </div>
    </div>
  );
};
