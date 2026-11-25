import {
  BadgeCheck,
  Banknote,
  CheckCircle2,
  Clock,
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
      subtitle: `${safeSummary.pending} pending, ${safeSummary.cancelled} cancelled`,
      icon: Users,
    },
    {
      title: 'Total Payments',
      value: formatPhp(safeSummary.totalPayments),
      subtitle: 'Collected (excludes cancelled)',
      icon: Banknote,
    },
    {
      title: 'Uncollected Payments',
      value: formatPhp(safeSummary.uncollectedPayments),
      subtitle: 'Remaining active balance',
      icon: Clock,
    },
    {
      title: 'Confirmed',
      value: safeSummary.confirmed,
      subtitle: 'Confirmed entries',
      icon: CheckCircle2,
    },
    {
      title: 'Checked In',
      value: safeSummary.checkedIn,
      subtitle: 'Arrived on site',
      icon: BadgeCheck,
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
