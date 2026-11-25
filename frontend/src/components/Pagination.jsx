import { ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE_OPTIONS = [5, 10, 20]

function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ])

  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b)

  const result = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push('...')
    }
    result.push(sorted[i])
  }
  return result
}

export default function Pagination({
  page,
  pageSize,
  totalCount,
  totalPages,
  loading = false,
  onPageChange,
  onPageSizeChange,
}) {
  const startItem = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const endItem = Math.min(page * pageSize, totalCount)
  const visiblePages = getVisiblePages(page, totalPages)
  const isFirstPage = page <= 1
  const isLastPage = totalPages === 0 || page >= totalPages

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/60 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
        <span className="font-medium">
          {totalCount === 0
            ? 'Showing 0 of 0'
            : `Showing ${startItem}–${endItem} of ${totalCount}`}
        </span>

        <div className="flex items-center gap-2">
          <label htmlFor="page-size-select" className="font-medium text-slate-600">
            Per page
          </label>
          <select
            id="page-size-select"
            value={pageSize}
            disabled={loading}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <nav
        aria-label="Registration pagination"
        className="flex flex-wrap items-center gap-1.5"
      >
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={loading || isFirstPage}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 focus:ring-2 focus:ring-blue-600/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span>Prev</span>
        </button>

        {visiblePages.map((entry, index) =>
          entry === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 py-1 text-xs font-medium text-slate-400"
            >
              ...
            </span>
          ) : (
            <button
              key={entry}
              type="button"
              onClick={() => onPageChange(entry)}
              disabled={loading}
              aria-current={entry === page ? 'page' : undefined}
              className={`min-w-[2rem] rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition focus:ring-2 focus:ring-blue-600/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                entry === page
                  ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {entry}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={loading || isLastPage}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 focus:ring-2 focus:ring-blue-600/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </nav>
    </div>
  )
}
