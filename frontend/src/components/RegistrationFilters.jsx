import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react'

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
    <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-slate-500" aria-hidden="true" />
          <h2 className="font-display text-xl font-bold tracking-wide text-slate-900">
            Registrations
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-end">
          <div className="sm:col-span-2 lg:w-64">
            <label
              htmlFor="participant-search"
              className="mb-1 block text-xs font-semibold text-slate-600"
            >
              Participant Name
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="participant-search"
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search participant name..."
                maxLength={150}
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pr-3 pl-9 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
              />
            </div>
          </div>

          <div className="lg:w-44">
            <label
              htmlFor="registration-type-filter"
              className="mb-1 block text-xs font-semibold text-slate-600"
            >
              Registration Type
            </label>
            <select
              id="registration-type-filter"
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
            >
              {TYPE_OPTIONS.map((option) => (
                <option key={option.value || 'all'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:w-44">
            <label
              htmlFor="registration-status-filter"
              className="mb-1 block text-xs font-semibold text-slate-600"
            >
              Status
            </label>
            <select
              id="registration-status-filter"
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value || 'all'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="button"
              onClick={onClear}
              disabled={!hasActiveFilters}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus:ring-2 focus:ring-blue-600/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 lg:w-auto"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Clear filters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
