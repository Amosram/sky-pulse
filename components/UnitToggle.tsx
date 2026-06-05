interface Props {
  units: "metric" | "imperial";
  onChange: (u: "metric" | "imperial") => void;
}

export default function UnitToggle({ units, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-1 shadow-xl h-fit flex-shrink-0">
      {(["metric", "imperial"] as const).map((u) => (
        <button
          key={u}
          onClick={() => onChange(u)}
          className={`px-4 py-2 cursor-pointer rounded-xl text-sm font-semibold transition-all duration-200 ${
            units === u
              ? "bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/10"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          {u === "metric" ? "°C" : "°F"}
        </button>
      ))}
    </div>
  );
}