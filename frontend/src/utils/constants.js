export const CATEGORIES = ["Account", "Billing", "Technical", "Feature Request", "Bug Report"];
export const PRIORITIES = ["High", "Medium", "Low"];
export const STATUSES = ["Open", "In Progress", "Resolved"];

export const PRIORITY_COLORS = {
  High: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500", darkBg: "dark:bg-red-900/30", darkText: "dark:text-red-400" },
  Medium: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500", darkBg: "dark:bg-amber-900/30", darkText: "dark:text-amber-400" },
  Low: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400", darkBg: "dark:bg-gray-800", darkText: "dark:text-gray-400" },
};

export const STATUS_COLORS = {
  Open: { bg: "bg-sky-100", text: "text-sky-700", dot: "bg-sky-500", darkBg: "dark:bg-sky-900/30", darkText: "dark:text-sky-400" },
  "In Progress": { bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-500", darkBg: "dark:bg-violet-900/30", darkText: "dark:text-violet-400" },
  Resolved: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500", darkBg: "dark:bg-emerald-900/30", darkText: "dark:text-emerald-400" },
};
