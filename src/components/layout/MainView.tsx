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

  const renderOrLoading = (data: React.ReactNode, css:string) => {
    return isLoading || !weather ? <span className={css}>Ładowanie...</span> : data;
  };

  return (
    <div className="max-w-md mx-auto  p-6 bg-slate-900 backdrop-blur-md text-slate-100 rounded-3xl shadow-2xl border  border-slate-800">
      <div className="text-center mb-8 ">
        <h1 className="text-xl font-light text-slate-400 truncate">
          {address?.displayName || "Wyszukaj lokalizację..."}
        </h1>
        <div className="mt-2 text-sm uppercase tracking-widest text-blue-400">
          {currentDay} • {dateFormatter.format(now)}
        </div>
      </div>

      <div className="flex flex-col items-center mb-10">
        <span className="text-7xl mb-4">
          {renderOrLoading(weatherInfo?.icon, "w-20")}
        </span>
        <div className="text-6xl font-bold tracking-tighter">
          {renderOrLoading(`${Math.round(weather?.temperature_2m || 0)}°C`, "w-24")}
        </div>
        <div className="text-lg text-slate-400 mt-2">
          {renderOrLoading(weatherInfo?.label, "w-32")}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <div className="text-xs text-slate-500 uppercase mb-1">Wilgotność</div>
          <div className="text-xl font-semibold">
            {renderOrLoading(`${weather?.relative_humidity_2m}%`, "w-10")}
          </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <div className="text-xs text-slate-500 uppercase mb-1">Wiatr</div>
          <div className="text-xl font-semibold flex items-center gap-2">
            {renderOrLoading(`${weather?.wind_speed_10m} km/h`, "w-16")}
            {weather && (
              <span 
                className="inline-block transition-transform duration-1000"
                style={{ transform: `rotate(${weather.wind_direction_10m}deg)` }}
              >
                ↑
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <SearchBar />
      </div>
    </div>
  );
};
