interface CurrentWeather{
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    wind_direction_10m: number;
}
interface DailyWeather{
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
}
interface WeatherResponse {
  current: CurrentWeather;
  daily: DailyWeather;
}

interface AddressData{
  lat: number;
  lon: number;
  displayName: string;
}

