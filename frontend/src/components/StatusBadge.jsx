import { BadgeCheck, CheckCircle2, Clock, XCircle } from 'lucide-react'

const STATUS_STYLES = {
  Pending: {
    label: 'Pending',
    className: 'border-amber-200 bg-amber-50 text-amber-800',
    Icon: Clock,
  },
  Confirmed: {
    label: 'Confirmed',
    className: 'border-blue-200 bg-blue-50 text-blue-700',
    Icon: CheckCircle2,
  },
  CheckedIn: {
    label: 'CheckedIn',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    Icon: BadgeCheck,
  },
  Cancelled: {
    label: 'Cancelled',
    className: 'border-rose-200 bg-rose-50 text-rose-700',
    Icon: XCircle,
  },
}

export default function StatusBadge({ status }) {
  const config = STATUS_STYLES[status] ?? {
    label: status || 'Unknown',
    className: 'border-slate-200 bg-slate-100 text-slate-700',
    Icon: Clock,
  }
  const { Icon } = config

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  )
}
