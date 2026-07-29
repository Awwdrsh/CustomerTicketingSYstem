import { CATEGORIES, STATUSES } from "../utils/constants";

export default function FilterBar({ filters, onFilterChange }) {
  const selectClass = "px-3 py-2 rounded-xl border border-border dark:border-slate-700 text-sm bg-surface dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:focus:border-violet-400 transition-all cursor-pointer";

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <div>
        <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Status</label>
        <select
          value={filters.status}
          onChange={(e) => onFilterChange((prev) => ({ ...prev, status: e.target.value }))}
          className={selectClass}
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Category</label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange((prev) => ({ ...prev, category: e.target.value }))}
          className={selectClass}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
