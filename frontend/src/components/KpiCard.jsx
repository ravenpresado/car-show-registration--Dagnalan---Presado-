function KpiCard({ title, value, description, icon, color }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <span className={`text-2xl ${color}`}>
          {icon}
        </span>
      </div>

      <h3 className="mt-3 text-3xl font-bold text-slate-800">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  )
}

export default KpiCard