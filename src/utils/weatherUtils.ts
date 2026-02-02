export const fetchWeather = async (lat: number, lon: number): Promise<WeatherResponse> => {
  const baseUrl = "https://api.open-meteo.com/v1/forecast";
  const url = `${baseUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Błąd sieci");
  
  return response.json();
};