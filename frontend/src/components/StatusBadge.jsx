import { BadgeCheck, CheckCircle2, Clock, XCircle } from 'lucide-react'

const STATUS_STYLES = {
  Pending: {
    label: 'Pending',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
    Icon: Clock,
  },
  Confirmed: {
    label: 'Confirmed',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
    Icon: CheckCircle2,
  },
  CheckedIn: {
    label: 'CheckedIn',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Icon: BadgeCheck,
  },
  Cancelled: {
    label: 'Cancelled',
    className: 'bg-red-50 text-red-700 border-red-200',
    Icon: XCircle,
  },
}

export default function StatusBadge({ status }) {
  const config = STATUS_STYLES[status] ?? {
    label: status || 'Unknown',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
    Icon: Clock,
  }
  const { Icon } = config

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  )
}
