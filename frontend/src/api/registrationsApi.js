const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5205'
).replace(/\/+$/, '')

/**
 * Extracts a human-readable error message from an ASP.NET Core ProblemDetails response.
 */
async function parseProblemDetailsError(response) {
  try {
    const payload = await response.json()

    if (payload?.errors && typeof payload.errors === 'object') {
      const messages = Object.entries(payload.errors)
        .flatMap(([field, fieldErrors]) =>
          Array.isArray(fieldErrors)
            ? fieldErrors.map((msg) => `${field}: ${msg}`)
            : [`${field}: ${fieldErrors}`],
        )
        .filter(Boolean)

      if (messages.length > 0) {
        return messages.join(' ')
      }
    }

    if (payload?.detail) return payload.detail
    if (payload?.title) return payload.title
  } catch {
    // Non-JSON error body; fall through to HTTP status message
  }

  return `Request failed with status ${response.status} (${response.statusText || 'Error'}).`
}

async function fetchJson(path, { signal } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  if (!response.ok) {
    const message = await parseProblemDetailsError(response)
    throw new Error(message)
  }

  return response.json()
}

/**
 * Calls GET /api/registrations with optional filters and paging parameters.
 */
export async function getRegistrations(
  {
    participantName = '',
    type = '',
    status = '',
    page = 1,
    pageSize = 10,
  } = {},
  options = {},
) {
  const params = new URLSearchParams()

  if (participantName.trim()) {
    params.set('participantName', participantName.trim())
  }
  if (type) {
    params.set('type', type)
  }
  if (status) {
    params.set('status', status)
  }

  params.set('page', String(page))
  params.set('pageSize', String(pageSize))

  return fetchJson(`/api/registrations?${params.toString()}`, options)
}

/**
 * Calls GET /api/registrations/summary for dashboard KPI totals.
 */
export async function getSummary(options = {}) {
  return fetchJson('/api/registrations/summary', options)
}
