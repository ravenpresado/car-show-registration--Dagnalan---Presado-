
function RegistrationTable({ registrations = [] }) {
  const getStatusStyle = (status) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-700',
      Confirmed: 'bg-green-100 text-green-700',
      CheckedIn: 'bg-blue-100 text-blue-700',
      Cancelled: 'bg-red-100 text-red-700',
    }

    return styles[status] || 'bg-slate-100 text-slate-700'
  }

  const getPaymentStyle = (status) => {
    const styles = {
      Unpaid: 'bg-red-100 text-red-700',
      Partial: 'bg-yellow-100 text-yellow-700',
      Paid: 'bg-green-100 text-green-700',
    }

    return styles[status] || 'bg-slate-100 text-slate-700'
  }

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h3 className="text-lg font-semibold text-slate-800">
          Registration Records
        </h3>

        <p className="text-sm text-slate-500">
          List of registered car show participants.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-4">Registration No.</th>
              <th className="px-5 py-4">Participant</th>
              <th className="px-5 py-4">Contact</th>
              <th className="px-5 py-4">Car Make & Model</th>
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Payment</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {registrations.length > 0 ? (
              registrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-blue-600">
                    {registration.registrationNumber}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800">
                    {registration.participantName}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {registration.contactNumber}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {registration.carMakeModel}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {registration.registrationType}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(registration.status)}`}>
                      {registration.status === 'CheckedIn'
                        ? 'Checked In'
                        : registration.status}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${getPaymentStyle(registration.paymentStatus)}`}>
                      {registration.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-5 py-10 text-center text-slate-500">
                  No registration records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RegistrationTable
