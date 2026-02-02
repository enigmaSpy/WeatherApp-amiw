import { useContext } from "react";
import { getWeatherInfo } from "../../utils/weatherDescription";
import { SearchBar } from "../ui/SearchBar";
import { AddressContext } from "../../context/AddressContext";

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
export const MainView = ({ weather, isLoading }: { weather: CurrentWeather | null, isLoading: boolean }) => {
  const { address } = useContext(AddressContext)!;

  const weatherInfo = weather ? getWeatherInfo(weather.weather_code) : null;

  const renderOrLoading = (data: React.ReactNode) => {
    return isLoading || !weather ? <span>Ładowanie...</span> : data;
  };

  return (
    <div>
      <div>
        <h1>{address?.displayName || "Wyszukaj lokalizację"}</h1>
        <p>{currentDay.charAt(0).toLocaleUpperCase() + currentDay.slice(1)}</p>
        <p>{dateFormatter.format(now)}</p>
        <h2>{renderOrLoading(weatherInfo?.icon)}</h2>
        <p>
          {renderOrLoading(`${weather?.temperature_2m} ℃`)}
        </p>
        
        <p>{renderOrLoading(weatherInfo?.label)}</p>
      </div>
      <div>
        <SearchBar />
      </div>
    </div>
  );
};
