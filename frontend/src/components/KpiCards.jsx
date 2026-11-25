import {
  BadgeCheck,
  Banknote,
  CheckCircle2,
  ClockAlert,
  Users,
} from 'lucide-react'
import KpiCard from './KpiCard'
import { formatPhp } from '../utils/formatters'

export default function KpiCards({ summary, loading = false }) {
  const safeSummary = summary ?? {
    totalRegistrations: 0,
    totalPayments: 0,
    uncollectedPayments: 0,
    confirmed: 0,
    checkedIn: 0,
    pending: 0,
    cancelled: 0,
  }

  const cards = [
    {
      title: 'Total Registrations',
      value: safeSummary.totalRegistrations,
      subtitle: `${safeSummary.pending} pending · ${safeSummary.cancelled} cancelled`,
      icon: Users,
      accentClass: 'bg-slate-100 text-slate-700',
      valueClass: 'text-slate-900',
      isCurrency: false,
    },
    {
      title: 'Total Payments',
      value: formatPhp(safeSummary.totalPayments),
      subtitle: 'Collected (excludes cancelled)',
      icon: Banknote,
      accentClass: 'bg-emerald-50 text-emerald-700',
      valueClass: 'text-emerald-700',
      isCurrency: true,
    },
    {
      title: 'Uncollected Payments',
      value: formatPhp(safeSummary.uncollectedPayments),
      subtitle: 'Remaining active balance',
      icon: ClockAlert,
      accentClass: 'bg-amber-50 text-amber-700',
      valueClass: 'text-amber-700',
      isCurrency: true,
    },
    {
      title: 'Confirmed',
      value: safeSummary.confirmed,
      subtitle: 'Approved event entries',
      icon: CheckCircle2,
      accentClass: 'bg-blue-50 text-blue-700',
      valueClass: 'text-blue-700',
      isCurrency: false,
    },
    {
      title: 'Checked In',
      value: safeSummary.checkedIn,
      subtitle: 'Vehicles arrived on site',
      icon: BadgeCheck,
      accentClass: 'bg-indigo-50 text-indigo-700',
      valueClass: 'text-indigo-700',
      isCurrency: false,
    },
  ]

  return (
    <section aria-label="Registration summary KPIs">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => (
          <KpiCard key={card.title} {...card} loading={loading && !summary} />
        ))}
      </div>
    </section>
  )
}
