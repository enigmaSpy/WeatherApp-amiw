import { useContext, useEffect, useState } from "react";
import { MainView } from "./components/layout/MainView";
import { AddressContext } from "./context/AddressContext";
import { fetchWeather, getWeatherBackground } from "./utils/weatherUtils";
import { DailyView } from "./components/layout/DailyView";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  
  const context = useContext(AddressContext); 

  const address = context?.address; 
  const setAddress = context?.setAddress; 

  const getWeatherData = async (lat: number, lon: number) => {
    setIsLoading(true);
    try {
      const data = await fetchWeather(lat, lon);
      setWeather({
        current: data.current,
        daily: data.daily,
      });
    } catch (error) {
      console.error("Błąd ładowania danych", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
       getWeatherData(52.2449, 21.0119);
       return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        
        if (setAddress) {
            setAddress({ lat: latitude, lon: longitude, displayName: "Twoja lokalizacja" });
        }
      },
      (error) => {
        console.error("Błąd GPS:", error.message);
        getWeatherData(52.2449, 21.0119);
      },
      { timeout: 5000 }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (address) {
      getWeatherData(address.lat, address.lon);
    }
  }, [address]);
  const bgGradient = getWeatherBackground(weather?.current?.weather_code);
  return (
    <div className={`flex justify-center items-center flex-col min-h-screen w-full transition-colors duration-1000 bg-gradient-to-br ${bgGradient}`}> 
        <MainView weather={weather ? weather.current : null} isLoading={isLoading}/>
        <DailyView isLoading={isLoading} daily={weather?weather.daily:null}/>
    </div>
  );
}

export default App;