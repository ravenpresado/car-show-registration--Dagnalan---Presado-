export default function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  loading = false,
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-gray-500">{title}</p>
        {Icon && <Icon className="h-4 w-4 text-gray-400" aria-hidden="true" />}
      </div>

      {loading ? (
        <div className="mt-2 h-7 w-24 animate-pulse rounded bg-gray-200" />
      ) : (
        <p className="tabular-nums-text mt-1.5 text-2xl font-semibold text-gray-900">
          {value}
        </p>
      )}

      {subtitle && (
        <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
      )}
    </div>
  )
}
