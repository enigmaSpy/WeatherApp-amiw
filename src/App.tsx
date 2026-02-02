import { useEffect, useState } from "react";
import { MainView } from "./components/layout/MainView";
import { AddressProvider } from "./context/AddressContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const getWeatherData = async (lat: number, lon: number) => {
    try {
      setIsLoading(true);
      const baseUrl = "https://api.open-meteo.com/v1/forecast";
      const url = `${baseUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Błąd sieci");
      }
      const data = await response.json();
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          getWeatherData(lat, lon);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("Brak zgody użytkownika");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Niedostępna lokalizacja");
              break;
            case error.TIMEOUT:
              console.error("timeout");
              break;
            default:
              console.error("Błąd: ", error.message);
              break;
          }
          getWeatherData(52.2449, 21.0119);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
        },
      );
    }
    getWeatherData(52.2449, 21.0119);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <AddressProvider>
      <>
        {!isLoading ? (
          <MainView weather={weather ? weather.current : null} />
        ) : (
          <div>Ładowanie</div>
        )}
      </>
    </AddressProvider>
  );
}

export default App;
