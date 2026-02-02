export const fetchWeather = async (lat: number, lon: number): Promise<WeatherResponse> => {
  const baseUrl = "https://api.open-meteo.com/v1/forecast";
  const url = `${baseUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Błąd sieci");
  
  return response.json();
};

export const getWeatherBackground = (code: number | undefined): string => {
  if (code === undefined) return "from-slate-800 to-slate-950"; 

  if (code <= 1) return "from-blue-400 to-blue-600";
  if (code <= 3) return "from-slate-400 to-slate-600";
  if (code >= 95) return "from-purple-900 via-slate-900 to-black";
  if (code >= 71) return "from-blue-100 to-slate-400";
  if (code >= 51) return "from-indigo-700 to-blue-900";
  
  return "from-slate-800 to-slate-950";
};