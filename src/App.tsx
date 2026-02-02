import { useContext, useEffect, useState } from "react";
import { MainView } from "./components/layout/MainView";
import { AddressContext } from "./context/AddressContext";
import { fetchWeather } from "./utils/weatherUtils";

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

  return (
    <> 
        <MainView weather={weather ? weather.current : null} isLoading={isLoading}/>
    </>
  );
}

export default App;