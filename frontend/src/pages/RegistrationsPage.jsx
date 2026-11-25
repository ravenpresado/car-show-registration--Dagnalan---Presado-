import { useEffect, useRef, useState } from 'react'
import {
  AlertTriangle,
  Loader2,
  RefreshCw,
  RotateCcw,
  SearchX,
} from 'lucide-react'
import { getRegistrations, getSummary } from '../api/registrationsApi'
import KpiCards from '../components/KpiCards'
import Pagination from '../components/Pagination'
import RegistrationFilters from '../components/RegistrationFilters'
import RegistrationTable from '../components/RegistrationTable'
import { useDebounce } from '../hooks/useDebounce'

export default function RegistrationsPage() {
  const [summary, setSummary] = useState(null)
  const [items, setItems] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadTick, setReloadTick] = useState(0)

  const hasSummaryRef = useRef(false)
  const debouncedSearch = useDebounce(search, 400)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function loadDashboard() {
      setLoading(true)
      setError('')

      try {
        const listPromise = getRegistrations(
          {
            participantName: debouncedSearch,
            type,
            status,
            page,
            pageSize,
          },
          { signal: controller.signal },
        )

        const summaryPromise = hasSummaryRef.current
          ? Promise.resolve(null)
          : getSummary({ signal: controller.signal })

        const [listData, summaryData] = await Promise.all([
          listPromise,
          summaryPromise,
        ])

        if (!active) return

        setItems(listData.items ?? [])
        setTotalCount(listData.totalCount ?? 0)
        setTotalPages(listData.totalPages ?? 0)

        if (summaryData) {
          hasSummaryRef.current = true
          setSummary(summaryData)
        }
      } catch (err) {
        if (!active || err?.name === 'AbortError') return
        const detail = err?.message ? ` (${err.message})` : ''
        setError(
          `Cannot reach the API. Please check that the backend server is running and try again.${detail}`,
        )
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      active = false
      controller.abort()
    }
  }, [debouncedSearch, type, status, page, pageSize, reloadTick])

  const handleSearchChange = (value) => {
    setSearch(value)
    setPage(1)
  }

  const handleTypeChange = (value) => {
    setType(value)
    setPage(1)
  }

  const handleStatusChange = (value) => {
    setStatus(value)
    setPage(1)
  }

  const handlePageSizeChange = (nextSize) => {
    setPageSize(nextSize)
    setPage(1)
  }

  const handleClearFilters = () => {
    setSearch('')
    setType('')
    setStatus('')
    setPage(1)
  }

  const handleRetry = () => {
    hasSummaryRef.current = false
    setReloadTick((tick) => tick + 1)
  }

  return (
    <div className="space-y-5">
      <KpiCards summary={summary} loading={loading} />

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <RegistrationFilters
          searchTerm={search}
          onSearchChange={handleSearchChange}
          selectedType={type}
          onTypeChange={handleTypeChange}
          selectedStatus={status}
          onStatusChange={handleStatusChange}
          onClear={handleClearFilters}
        />

        {error ? (
          <div
            role="alert"
            className="flex flex-col items-center justify-center px-6 py-12 text-center"
          >
            <AlertTriangle className="h-7 w-7 text-red-600" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-gray-900">
              Unable to load registrations
            </p>
            <p className="mt-1 max-w-md text-sm text-gray-600">{error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              <span>Try again</span>
            </button>
          </div>
        ) : loading ? (
          <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center justify-center px-6 py-12 text-center"
          >
            <Loader2
              className="h-6 w-6 animate-spin text-gray-500"
              aria-hidden="true"
            />
            <p className="mt-2.5 text-sm text-gray-600">
              Loading registrations...
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <SearchX className="h-7 w-7 text-gray-400" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-gray-900">
              No registrations match your filters
            </p>
            <p className="mt-1 max-w-md text-sm text-gray-500">
              Try a different participant name or clear the active filters.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Clear filters</span>
            </button>
          </div>
        ) : (
          <RegistrationTable registrations={items} />
        )}

        <Pagination
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
          totalPages={totalPages}
          loading={loading}
          onPageChange={setPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </section>
    </div>
  )
}
