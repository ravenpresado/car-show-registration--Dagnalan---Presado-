
function RegistrationFilters({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  onReset,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-800">
          Registration Management
        </h3>
        <p className="text-sm text-slate-500">
          Search and filter participant registrations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Search */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Search Participant
          </label>
          <input
            type="text"
            placeholder="Enter participant name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Registration Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Registration Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
          >
            <option value="">All Types</option>
            <option value="Exhibitor">Exhibitor</option>
            <option value="Competitor">Competitor</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Registration Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="CheckedIn">Checked In</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onReset}
          className="rounded-lg bg-slate-100 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}

export default RegistrationFilters
