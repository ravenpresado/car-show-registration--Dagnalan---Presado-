import { RotateCcw, Search } from 'lucide-react'

const TYPE_OPTIONS = [
  { value: '', label: 'All Types' },
  { value: 'Exhibitor', label: 'Exhibitor' },
  { value: 'Competitor', label: 'Competitor' },
  { value: 'VIP', label: 'VIP' },
]

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Confirmed', label: 'Confirmed' },
  { value: 'CheckedIn', label: 'CheckedIn' },
  { value: 'Cancelled', label: 'Cancelled' },
]

export default function RegistrationFilters({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  onClear,
}) {
  const hasActiveFilters = Boolean(
    searchTerm.trim() || selectedType || selectedStatus,
  )

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="text-base font-semibold text-gray-900">
          Registrations
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-end">
          <div className="sm:col-span-2 lg:w-64">
            <label
              htmlFor="participant-search"
              className="mb-1 block text-xs font-medium text-gray-600"
            >
              Search
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="participant-search"
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search participant name..."
                maxLength={150}
                className="w-full rounded-md border border-gray-300 bg-white py-1.5 pr-3 pl-9 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="lg:w-40">
            <label
              htmlFor="registration-type-filter"
              className="mb-1 block text-xs font-medium text-gray-600"
            >
              Type
            </label>
            <select
              id="registration-type-filter"
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-900 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
            >
              {TYPE_OPTIONS.map((option) => (
                <option key={option.value || 'all'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:w-40">
            <label
              htmlFor="registration-status-filter"
              className="mb-1 block text-xs font-medium text-gray-600"
            >
              Status
            </label>
            <select
              id="registration-status-filter"
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-900 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value || 'all'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onClear}
            disabled={!hasActiveFilters}
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Clear filters</span>
          </button>
        </div>
      </div>
    </div>
  )
}
