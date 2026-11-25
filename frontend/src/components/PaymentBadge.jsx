import { AlertCircle, CheckCircle2, CircleDot } from 'lucide-react'

const PAYMENT_STYLES = {
  Unpaid: {
    label: 'Unpaid',
    className: 'border-red-200 bg-red-50 text-red-700',
    Icon: AlertCircle,
  },
  Partial: {
    label: 'Partial',
    className: 'border-amber-200 bg-amber-50 text-amber-800',
    Icon: CircleDot,
  },
  Paid: {
    label: 'Paid',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    Icon: CheckCircle2,
  },
}

export default function PaymentBadge({ status }) {
  const config = PAYMENT_STYLES[status] ?? {
    label: status || 'Unknown',
    className: 'border-slate-200 bg-slate-100 text-slate-700',
    Icon: AlertCircle,
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
