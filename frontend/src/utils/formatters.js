const currencyFormatter = new Intl.NumberFormat('en-PH', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
})

/**
 * Formats a numeric value as Philippine Peso currency (e.g. "₱2,500.00").
 */
export function formatPhp(amount) {
  const safeValue = Number.isFinite(Number(amount)) ? Number(amount) : 0
  return `₱${currencyFormatter.format(safeValue)}`
}

/**
 * Formats an ISO timestamp consistently (e.g. "Feb 10, 2027 08:30 AM").
 */
export function formatRegistrationDate(isoString) {
  if (!isoString) return '—'
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return '—'
  return `${dateFormatter.format(date)} ${timeFormatter.format(date)}`
}
