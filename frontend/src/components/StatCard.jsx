const colorMap = {
  violet: { bg: "bg-violet-50", dot: "bg-violet-500", text: "text-violet-700" },
  red: { bg: "bg-red-50", dot: "bg-red-500", text: "text-red-700" },
  amber: { bg: "bg-amber-50", dot: "bg-amber-500", text: "text-amber-700" },
  emerald: { bg: "bg-emerald-50", dot: "bg-emerald-500", text: "text-emerald-700" },
};

export default function StatCard({ label, value, color = "violet" }) {
  const c = colorMap[color] || colorMap.violet;

  return (
    <div className={`${c.bg} rounded-2xl p-5 border border-transparent hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-2 h-2 rounded-full ${c.dot}`} />
        <span className={`text-xs font-semibold tracking-wide uppercase ${c.text}`}>{label}</span>
      </div>
      <p className="text-3xl font-bold text-slate-900 tabular-nums">{value}</p>
    </div>
  );
}
