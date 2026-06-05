"use client";

import { WeatherData } from "../types/weather";
import { getWeatherIcon, formatTemp } from "../lib/weatherService";

interface Props { 
  data: WeatherData; 
  units: "metric" | "imperial"; 
}

// Helper to extract day name from standard ISO date strings (YYYY-MM-DD)
function getDayName(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export default function Forecast({ data, units }: Props) {

  const forecast = data.daily ?? [];
  if (!forecast.length) return null;

  return (
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-md fade-in" style={{ animationDelay: "0.1s" }}>
      <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">
        {forecast.length}-Day Forecast
      </h3>
      <div className="space-y-3">
        {forecast.map((day, i) => {
        
          const range = day.temp_max - day.temp_min;
          const barWidth = Math.min(100, Math.max(20, (range / 20) * 100));

          return (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
              {/* Day Label */}
              <span className="w-12 text-sm font-medium text-white/90">
                {i === 0 ? "Today" : getDayName(day.date)}
              </span>
              
              {/* Weather Icon Component */}
              <span className="text-2xl text-cyan-400 flex items-center justify-center">
                {getWeatherIcon(day.condition_code, 24)}
              </span>
              
              <div className="flex items-center gap-1">
                {/* Precipitation Probability */}
                {day.precipitation_probability !== undefined && day.precipitation_probability > 0 && (
                  <span className="text-xs text-blue-400 mr-2 font-medium bg-blue-500/10 px-1.5 py-0.5 rounded-full">
                    💧 {day.precipitation_probability}%
                  </span>
                )}
                
                {/* Low Temp */}
                <span className="text-sm text-white/40 w-12 text-right">
                  {formatTemp(day.temp_min)}
                </span>
                
                {/* Visual Temperature Range Bar slider */}
                <div className="w-16 h-1.5 rounded-full bg-white/10 mx-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-amber-400"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                
                {/* High Temp */}
                <span className="text-sm font-semibold text-white w-12">
                  {formatTemp(day.temp_max)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}