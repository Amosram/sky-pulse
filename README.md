# SkyPulse — Weather Intelligence App

A sleek, real-time weather app built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**, powered by the [WeatherAI API](https://weather-ai.co).

## Features

-  **City search** with live autocomplete (OpenStreetMap Nominatim)
-  **Auto-detect location** via browser geolocation or IP fallback
-  **°C / °F toggle** — metric and imperial support
-  **AI weather summaries** — powered by WeatherAI's built-in AI insights
-  **7-day forecast** with temperature ranges and rain probability
-  **24h hourly forecast** with scrollable timeline
-  Humidity, wind speed, UV index, visibility, pressure, sunrise & sunset

---

## Prerequisites

- **Node.js** 18+
- **pnpm** — install if you don't have it:
  ```bash
  npm install -g pnpm
  ```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Amosram/sky-pulse.git
cd skypulse-weather
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project:

```bash
cp .env.example .env.local
```

Then open `.env.local` and add your WeatherAI API key:

```env
WEATHER_AI_API_KEY=your_actual_api_key_here
```

> Get your API key from the [WeatherAI Dashboard](https://weather-ai.co) → **API Keys**

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router, API routes, server components
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [WeatherAI API](https://weather-ai.co/docs) — Weather data + AI summaries (WMO codes)
- [Nominatim / OpenStreetMap](https://nominatim.org/) — Free city geocoding
- [Lucide React](https://lucide.dev/) — Icons

---
