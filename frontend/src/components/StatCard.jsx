export default function StatCard({ label, value, color }) {
  const dotColors = {
    indigo: "bg-primary",
    green: "bg-success",
    amber: "bg-warning",
    red: "bg-danger",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full ${dotColors[color] || dotColors.indigo}`} />
        <span className="text-sm font-medium text-gray-500">{label}</span>
      </div>
      <p className="text-3xl font-bold text-text mt-2">{value}</p>
    </div>
  );
}
