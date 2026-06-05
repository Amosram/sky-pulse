"use client";

import { WeatherData } from "../types/weather";
import { Wind, Droplets, Sun, Navigation, Calendar } from "lucide-react";
import { getWeatherIcon, formatTemp, getWMOText } from "../lib/weatherService";

interface Props { 
  data: WeatherData; 
  units: "metric" | "imperial"; 
  locationName?: string; 
}

export default function CurrentWeather({ data, units, locationName }: Props) {
  if (!data || !data.current) {
    return <div className="p-6 text-white/50 text-center">No current data available</div>;
  }

  const c = data.current;
  const windLabel = units === "metric" ? "km/h" : "mph";

  const tempLabel = units === "metric" ? "°C" : "°F";
  const parsedTemp = Number(c.temperature);
  const displayTemp = units === "imperial" 
    ? Math.round((parsedTemp * 9) / 5 + 32) 
    : Math.round(parsedTemp);

  const parsedWind = Number(c.wind_speed);
  const displayWindSpeed = units === "imperial"
    ? Math.round(parsedWind * 0.621371) 
    : Math.round(parsedWind);

  const cityFallback = data.location?.timezone 
    ? data.location.timezone.split("/")[1].replace("_", " ") 
    : "Your location";
  const city = locationName || cityFallback;
  const country = data.location?.country ? `, ${data.location.country}` : "";

  // Retain and parse the incoming API timestamp
  const rawDate = new Date(c.time);
  const formattedDate = isNaN(rawDate.getTime()) 
    ? c.time 
    : rawDate.toLocaleDateString(undefined, { 
        weekday: "short", 
        month: "short", 
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

  const currentHourData = data.hourly?.find(
    (h) => h.time.substring(0, 13) === c.time.substring(0, 13)
  ) || data.hourly?.[0];

  const resolvedHumidity = currentHourData?.humidity ?? 50;
  const resolvedUV = currentHourData?.uv_index ?? 0;

  const stats = [
    { 
      icon: <Droplets size={18} className="text-blue-400" />, 
      label: "Humidity", 
      value: `${resolvedHumidity}%`
    },
    { 
      icon: <Wind size={18} className="text-teal-400" />, 
      label: "Wind Speed", 
      value: c.wind_speed !== undefined ? `${displayWindSpeed} ${windLabel}` : "--"
    },
    { 
      icon: <Navigation size={18} className="text-emerald-400" style={{ transform: `rotate(${c.wind_direction ?? 0}deg)` }} />, 
      label: "Wind Direction", 
      value: c.wind_direction !== undefined ? `${c.wind_direction}°` : "--" 
    },
    { 
      icon: <Sun size={18} className="text-amber-400" />, 
      label: "UV Index", 
      value: `${resolvedUV}`
    },
  ];

  return (
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-md text-white fade-in">
      {/* Header Info */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-base lg:text-2xl font-bold tracking-tight capitalize">{city}{country}</h2>
          <div className="flex items-center gap-1.5 text-xs text-white/50 mt-1">
            <Calendar size={12} />
            <span>{formattedDate}</span>
            <span className="text-white/20">•</span>
            <span>{getWMOText(c.condition_code)}</span>
          </div>
        </div>
        <span className="text-5xl drop-shadow-md">
          {getWeatherIcon(c.condition_code, 48)}
        </span>
      </div>

      {/* Main Temperature Hero */}
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-6xl font-extrabold tracking-tighter">
         {displayTemp}{tempLabel}
        </span>
      </div>

      {/* Grid Stats Block */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.03]">
            <div className="p-2 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              {stat.icon}
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-white/40">{stat.label}</p>
              <p className="text-sm font-semibold text-white/90 mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}