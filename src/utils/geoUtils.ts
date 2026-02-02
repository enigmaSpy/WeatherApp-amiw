

export const getCoordsFromAddress = async (city: string): Promise<AddressData | null>=> {
    try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) return null;
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    };
    } catch (error) {
        console.error("Błąd połączenia", error);
        return null;
    }
  };


export const getWeatherData = async (lat: number, lon: number) => {
    try {
      const baseUrl = "https://api.open-meteo.com/v1/forecast";
      const url = `${baseUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Błąd sieci");
      }
      const data = await response.json();
      return{
        current: data.current,
        daily: data.daily,
      };
    } catch (error) {
      console.error("Błąd ładowania danych", error);
    } 
  };