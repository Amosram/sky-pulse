import React from 'react';
import { 
  CloudLightning, 
  CloudRain, 
  CloudFog, 
  CloudSun, 
  Sun, 
  Cloud 
} from 'lucide-react';

export const BASE_URL = "https://api.weather-ai.co";

// Helper helper to convert WMO numeric string codes into standard string descriptions
export function getWMOText(code: string): string {
  switch (code) {
    case "0": return "Clear Sky";
    case "1": return "Mainly Clear";
    case "2": return "Partly Cloudy";
    case "3": return "Overcast";
    case "45": case "48": return "Foggy";
    case "51": case "53": case "55": return "Drizzle";
    case "61": case "63": case "65": return "Rain";
    case "71": case "73": case "75": return "Snow";
    case "95": case "96": case "99": return "Thunderstorm";
    default: return "Cloudy";
  }
}

export function getWeatherIcon(
  conditionCode: string, 
  size = 24, 
  className = "", 
  strokeWidth = 1.5
): React.ReactNode {
  let IconComponent = Cloud; 

  // WMO Code Mapping
  switch (conditionCode) {
    case "0":
      IconComponent = Sun;
      break;
    case "1":
    case "2":
      IconComponent = CloudSun;
      break;
    case "3":
      IconComponent = Cloud;
      break;
    case "45":
    case "48":
      IconComponent = CloudFog;
      break;
    case "51":
    case "53":
      IconComponent = CloudRain;
      break;
    case "61":
    case "63":
    case "65":
      IconComponent = CloudRain;
      break;
    case "95":
    case "96":
    case "99":
      IconComponent = CloudLightning;
      break;
    default:
      IconComponent = Cloud;
  }

  return React.createElement(IconComponent, {
    size,
    className,
    strokeWidth
  });
}

export function formatTemp(temp: number): string {
  return `${Math.round(temp)}°`;
}