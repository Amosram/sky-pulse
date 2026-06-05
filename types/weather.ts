export interface WeatherLocation {
  lat: number;
  lon: number;
  timezone: string;
  requested_lat: number;
  requested_lon: number;
  country: string;
}

export interface CurrentWeatherInfo {
  time: string;
  temperature: number;
  wind_speed: number;
  wind_direction: number;
  condition_code: string;
  icon: string;
  humidity: number;
  feels_like: number;
  uv_index: number;
  wind_gust: number;
  icon_path: string;
}

export interface HourlyWeatherInfo {
  time: string;
  temperature: number;
  precipitation_probability: number;
  wind_speed: number;
  condition_code: string;
  icon: string;
  humidity: number;
  feels_like: number;
  wind_gust: number;
  uv_index: number;
  icon_path: string;
}

export interface DailyWeatherInfo {
  date: string;
  temp_min: number;
  temp_max: number;
  precipitation_sum: number;
  sunrise: string;
  sunset: string;
  condition_code: string;
  icon: string;
  precipitation_probability: number;
  wind_max: number;
  icon_path: string;
}

export interface WeatherData {
  location: WeatherLocation;
  current: CurrentWeatherInfo;
  hourly: HourlyWeatherInfo[];
  daily: DailyWeatherInfo[];
  ai_summary?: string;
  client_geo?: {
    country: string;
    ip_hash: string;
  };
}