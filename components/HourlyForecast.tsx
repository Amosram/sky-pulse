"use client";

import { WeatherData } from "../types/weather";
import { getWeatherIcon, formatTemp } from "../lib/weatherService";

interface Props { 
  data: WeatherData; 
  units: "metric" | "imperial"; 
}

export default function HourlyForecast({ data, units }: Props) {
  const unitLabel = units === "metric" ? "°C" : "°F";
  

  const hourly = data.hourly?.slice(0, 24) ?? [];
  if (!hourly.length) return null;

  return (
    <div className="p-6 [animation-delay:200ms]">
      <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">
        Hourly Forecast
      </h3>
      
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex gap-3 min-w-max">
          {hourly.map((h, i) => {
            
            const dateObj = new Date(h.time);
            const hour = dateObj.getHours();
            
            
            const label = i === 0 
              ? "Now" 
              : `${hour === 0 ? "12am" : hour === 12 ? "12pm" : hour > 12 ? `${hour - 12}pm` : `${hour}am`}`;
            
            return (
              <div 
                key={i} 
                className={`flex flex-col items-center gap-2 px-3 py-3 rounded-2xl min-w-[68px] border transition-all ${
                  i === 0 
                    ? "bg-cyan-500/10 border-cyan-500/30 shadow-md shadow-cyan-500/5" 
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <span className="text-xs text-white/60">{label}</span>
                
              
                <div className={i === 0 ? "text-cyan-400" : "text-white/80"}>
                  {getWeatherIcon(h.condition_code, 22, "", 1.5)}
                </div>
          
                <span className="text-sm font-semibold text-white">
                  {formatTemp(h.temperature)}{unitLabel}
                </span>
              
                {h.precipitation_probability !== undefined && h.precipitation_probability > 0 && (
                  <span className="text-[10px] text-blue-400 font-medium bg-blue-500/10 px-1.5 py-0.5 rounded-full mt-0.5">
                    💧 {h.precipitation_probability}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}