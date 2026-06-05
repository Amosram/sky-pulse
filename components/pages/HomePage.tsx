"use client";

import Image from 'next/image';
import React, { useState, useCallback } from "react";
import SearchBar from "../SearchBar";
import CurrentWeather from "../CurrentWeather";
import Forecast from "../Forecast";
import HourlyForecast from "../HourlyForecast";
import UnitToggle from "../UnitToggle";
import LoadingState from "../LoadingState";
import { WeatherData } from "@/types/weather";
import { CloudOff } from "lucide-react";
import Link from 'next/link';

export default function Home() {
  // Functional Application States
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  
  const [activeCoords, setActiveCoords] = useState<Record<string, string> | null>(null);
  const [locationName, setLocationName] = useState<string>("");

  // Unified Data Fetch Pipeline
  const fetchWeather = useCallback(async (params: Record<string, string>, currentUnits: "metric" | "imperial") => {
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams({ ...params, units: currentUnits });
      const res = await fetch(`/api/weather?${qs}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error ?? "Failed to fetch weather engine data");
      
      setWeatherData(data);
      setActiveCoords(params); 
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  // Location Handlers
  const handleSearch = (lat: number, lon: number, name: string) => {
    setLocationName(name);
    fetchWeather({ lat: String(lat), lon: String(lon) }, units);
  };

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported in your browser.");
      fetchWeather({ ip: "auto" }, units);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationName("");
        fetchWeather({ lat: String(pos.coords.latitude), lon: String(pos.coords.longitude) }, units);
      },
      () => {
        setLocationName("");
        fetchWeather({ ip: "auto" }, units);
      }
    );
  }, [units, fetchWeather]);

  // Contextual Unit Configuration Changes
  const handleUnitsChange = (newUnits: "metric" | "imperial") => {
    setUnits(newUnits);
    if (activeCoords) {
      fetchWeather(activeCoords, newUnits);
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background Image Layer */}
      <Image 
        src="/images/hero-bg.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-center z-0 opacity-40"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-md z-10" />

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 pt-12 flex flex-col items-center text-center text-white">
        
        {/* Header */}
        <div className="text-center mb-8 w-full pt-9">
          <span className="inline-block text-white mb-4 text-xs capitalize font-medium tracking-wide border rounded-full border-white/20 px-4 py-2 bg-black/10 backdrop-blur-sm">
            ✦ Powered by WeatherAI ✦
          </span>
          <p className="text-white/80 mt-1 text-sm leading-relaxed">
            Real-time weather intelligence for anywhere on Earth
          </p>
        </div>

        {/* Action Controls Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 w-full">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} onLocate={handleLocate} loading={loading} />
          </div>
          <UnitToggle units={units} onChange={handleUnitsChange} />
        </div>

        {/* Error Exception Indicator */}
        {error && (
          <div className="w-full glass-card p-5 flex items-center gap-3 mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-md">
            <CloudOff size={20} className="text-red-400 shrink-0" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Loader */}
        {loading && <div className="w-full my-12"><LoadingState /></div>}

        {/* Dashboard Container */}
        {!loading && weatherData && (
          <div className="space-y-6 w-full text-left border rounded-2xl border-white/10 bg-black/20 backdrop-blur-xl p-6 fade-in mb-10 shadow-xl">
            <CurrentWeather data={weatherData} units={units} locationName={locationName} />
            
            {weatherData.hourly && weatherData.hourly.length > 0 && (
              <HourlyForecast data={weatherData} units={units} />
            )}
            
            {weatherData.daily && weatherData.daily.length > 0 && (
              <Forecast data={weatherData} units={units} />
            )}
          </div>
        )}

        {/* Initial Static Empty Framework */}
        {!loading && !weatherData && !error && (
          <div className="text-center py-16 fade-in w-full">
            <div className="text-7xl mb-4 float-anim">🌍</div>
            <p className="text-white/70 text-sm">
              Search for a location coordinates profile to display deep-learning insights.
            </p>
          </div>
        )}

        {/* Application Footer Context */}
        <footer className="text-center mt-auto mb-8 text-white/40 text-xs w-full pt-10">
          <p>
            Built with{" "}
            <Link href="https://weather-ai.co" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              WeatherAI API
            </Link>{" "}
            · Next.js · Tailwind CSS
          </p>
        </footer>

      </div>
    </section>
  );
}