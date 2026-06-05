import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.WEATHER_AI_API_KEY ?? "";
const BASE = "https://api.weather-ai.co";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const ip = searchParams.get("ip");
  const units = searchParams.get("units") ?? "metric";

  try {
    let url: string;

    if (ip) {
      // Auto-detection by IP
      url = `${BASE}/v1/weather-geo?ip=auto&days=7&ai=true&units=${units}`;
    } else if (lat && lon) {
      url = `${BASE}/v1/weather?lat=${lat}&lon=${lon}&days=7&ai=true&units=${units}`;
    } else {
      return NextResponse.json({ error: "lat/lon or ip required" }, { status: 400 });
    }

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json({ error: err?.message ?? "API error", status: res.status }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
