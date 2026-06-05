"use client";
import { useState, useRef } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";

interface Props {
  onSearch: (lat: number, lon: number, name: string) => void;
  onLocate: () => void;
  loading: boolean;
}

interface Suggestion {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

// Simple geocoding via a public API
async function geocode(q: string): Promise<Suggestion[]> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5`,
    { headers: { "Accept-Language": "en" } }
  );
  const data = await res.json();
  return data.map((d: { display_name: string; lat: string; lon: string; address?: { country?: string } }) => ({
    name: d.display_name.split(",").slice(0, 2).join(","),
    lat: parseFloat(d.lat),
    lon: parseFloat(d.lon),
    country: d.address?.country ?? "",
  }));
}

export default function SearchBar({ onSearch, onLocate, loading }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (val: string) => {
    setQuery(val);
    if (timer.current) clearTimeout(timer.current);
    if (val.length < 2) { setSuggestions([]); return; }
    timer.current = setTimeout(async () => {
      setSearching(true);
      const s = await geocode(val).catch(() => []);
      setSuggestions(s);
      setSearching(false);
    }, 400);
  };

  const pick = (s: Suggestion) => {
    setQuery(s.name);
    setSuggestions([]);
    onSearch(s.lat, s.lon, s.name);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main Search Input Container */}
      <div className="flex items-center gap-3 px-5 py-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl focus-within:border-cyan-500/50 transition-all">
        {searching ? (
          <Loader2 size={20} className="text-cyan-400 animate-spin flex-shrink-0" />
        ) : (
          <Search size={20} className="text-white/50 flex-shrink-0" />
        )}
        
        <input
          className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-base"
          placeholder="Search city, region, or country…"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && suggestions.length > 0) pick(suggestions[0]);
          }}
        />
        
        <button
          onClick={onLocate}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-semibold text-sm hover:bg-cyan-300 transition-colors disabled:opacity-50 flex-shrink-0 shadow-md shadow-cyan-500/10 cursor-pointer" 
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <MapPin size={16} />}
          <span className="hidden sm:inline">Locate me</span>
        </button>
      </div>

      {/* Suggestions Dropdown Overlay */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2  bg-black/20 backdrop-blur-md border border-white/10  rounded-2xl overflow-hidden z-50 shadow-2xl divide-y divide-white/5">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => pick(s)}
              className="w-full text-left px-5 py-3.5 hover:bg-white/10 transition-colors flex items-center gap-3 group cursor-pointer"
            >
              <MapPin size={14} className="text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-white/90 truncate">{s.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}