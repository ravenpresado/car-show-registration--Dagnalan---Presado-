import { AlertCircle, CheckCircle2, CircleDot } from 'lucide-react'

const PAYMENT_STYLES = {
  Unpaid: {
    label: 'Unpaid',
    className: 'bg-red-50 text-red-700 border-red-200',
    Icon: AlertCircle,
  },
  Partial: {
    label: 'Partial',
    className: 'bg-amber-50 text-amber-800 border-amber-200',
    Icon: CircleDot,
  },
  Paid: {
    label: 'Paid',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Icon: CheckCircle2,
  },
}

export default function PaymentBadge({ status }) {
  const config = PAYMENT_STYLES[status] ?? {
    label: status || 'Unknown',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
    Icon: AlertCircle,
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
