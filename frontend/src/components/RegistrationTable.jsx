import { Car, Crown, Mail, Phone, Shield, Trophy } from 'lucide-react'
import PaymentBadge from './PaymentBadge'
import StatusBadge from './StatusBadge'
import { formatPhp, formatRegistrationDate } from '../utils/formatters'

const TYPE_STYLES = {
  Exhibitor: {
    className: 'border-slate-200 bg-slate-100 text-slate-700',
    Icon: Shield,
  },
  Competitor: {
    className: 'border-red-200 bg-red-50 text-red-700',
    Icon: Trophy,
  },
  VIP: {
    className: 'border-purple-200 bg-purple-50 text-purple-700',
    Icon: Crown,
  },
}

export default function RegistrationTable({ registrations = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
          <tr>
            <th scope="col" className="whitespace-nowrap px-4 py-3.5">
              Registration No.
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3.5">
              Date
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3.5">
              Participant
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3.5">
              Car
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3.5">
              Type
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3.5">
              Status
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3.5 text-right">
              Fee / Paid
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3.5">
              Payment
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {registrations.map((registration) => {
            const typeConfig = TYPE_STYLES[registration.registrationType] ?? {
              className: 'border-slate-200 bg-slate-100 text-slate-700',
              Icon: Car,
            }
            const TypeIcon = typeConfig.Icon

            return (
              <tr
                key={registration.id}
                className="transition-colors hover:bg-slate-50/80"
              >
                <td className="whitespace-nowrap px-4 py-3.5 align-top">
                  <span className="font-mono-tabular inline-block rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-800">
                    {registration.registrationNumber}
                  </span>
                </td>

                <td className="whitespace-nowrap px-4 py-3.5 align-top text-xs text-slate-600">
                  {formatRegistrationDate(registration.registrationDate)}
                </td>

                <td className="px-4 py-3.5 align-top">
                  <div className="font-semibold text-slate-900">
                    {registration.participantName}
                  </div>
                  <div className="mt-1 flex flex-col gap-0.5 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Phone className="h-3 w-3 shrink-0 text-slate-400" aria-hidden="true" />
                      <span className="font-mono-tabular">{registration.contactNumber}</span>
                    </span>
                    {registration.email && (
                      <span className="inline-flex items-center gap-1">
                        <Mail className="h-3 w-3 shrink-0 text-slate-400" aria-hidden="true" />
                        <span className="truncate max-w-[200px]">{registration.email}</span>
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3.5 align-top">
                  <div className="font-medium text-slate-800">
                    {registration.carMakeModel}
                  </div>
                  <span className="font-mono-tabular mt-1 inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-700">
                    <Car className="h-3 w-3 text-slate-400" aria-hidden="true" />
                    {registration.plateNumber}
                  </span>
                </td>

                <td className="whitespace-nowrap px-4 py-3.5 align-top">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-semibold ${typeConfig.className}`}
                  >
                    <TypeIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {registration.registrationType}
                  </span>
                </td>

                <td className="whitespace-nowrap px-4 py-3.5 align-top">
                  <StatusBadge status={registration.status} />
                </td>

                <td className="whitespace-nowrap px-4 py-3.5 align-top text-right">
                  <div className="font-mono-tabular text-xs font-medium text-slate-500">
                    {formatPhp(registration.registrationFee)}
                  </div>
                  <div className="font-mono-tabular mt-0.5 text-sm font-semibold text-slate-900">
                    {formatPhp(registration.amountPaid)}
                  </div>
                </td>

                <td className="whitespace-nowrap px-4 py-3.5 align-top">
                  <PaymentBadge status={registration.paymentStatus} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
