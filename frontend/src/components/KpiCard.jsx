export default function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accentClass = 'bg-slate-100 text-slate-700',
  valueClass = 'text-slate-900',
  isCurrency = false,
  loading = false,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>
          {loading ? (
            <div className="mt-2 h-8 w-28 animate-pulse rounded-md bg-slate-200" />
          ) : (
            <p
              className={`mt-1.5 truncate font-bold tracking-tight ${
                isCurrency ? 'font-mono-tabular text-2xl' : 'font-display text-3xl'
              } ${valueClass}`}
            >
              {value}
            </p>
          )}
        </div>
        {Icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${accentClass}`}
            aria-hidden="true"
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {subtitle && (
        <p className="mt-2 text-xs text-slate-500">{subtitle}</p>
      )}
    </div>
  )
}
