import PaymentBadge from './PaymentBadge'
import StatusBadge from './StatusBadge'
import { formatPhp, formatRegistrationDate } from '../utils/formatters'

export default function RegistrationTable({ registrations = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
        <thead className="bg-gray-50 text-xs font-medium text-gray-500">
          <tr>
            <th scope="col" className="whitespace-nowrap px-4 py-3">
              Registration No.
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3">
              Date
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3">
              Participant
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3">
              Car
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3">
              Type
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3">
              Status
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3 text-right">
              Fee / Paid
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3">
              Payment
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {registrations.map((registration) => (
            <tr key={registration.id} className="hover:bg-gray-50">
              <td className="tabular-nums-text whitespace-nowrap px-4 py-3 align-top font-medium text-gray-900">
                {registration.registrationNumber}
              </td>

              <td className="whitespace-nowrap px-4 py-3 align-top text-xs text-gray-600">
                {formatRegistrationDate(registration.registrationDate)}
              </td>

              <td className="px-4 py-3 align-top">
                <div className="font-medium text-gray-900">
                  {registration.participantName}
                </div>
                <div className="mt-0.5 text-xs text-gray-500">
                  {registration.contactNumber}
                  {registration.email ? ` · ${registration.email}` : ''}
                </div>
              </td>

              <td className="px-4 py-3 align-top">
                <div className="text-gray-900">{registration.carMakeModel}</div>
                <div className="tabular-nums-text mt-0.5 text-xs text-gray-500">
                  {registration.plateNumber}
                </div>
              </td>

              <td className="whitespace-nowrap px-4 py-3 align-top text-sm text-gray-700">
                {registration.registrationType}
              </td>

              <td className="whitespace-nowrap px-4 py-3 align-top">
                <StatusBadge status={registration.status} />
              </td>

              <td className="tabular-nums-text whitespace-nowrap px-4 py-3 align-top text-right">
                <div className="font-medium text-gray-900">
                  {formatPhp(registration.amountPaid)}
                </div>
                <div className="text-xs text-gray-500">
                  of {formatPhp(registration.registrationFee)}
                </div>
              </td>

              <td className="whitespace-nowrap px-4 py-3 align-top">
                <PaymentBadge status={registration.paymentStatus} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
