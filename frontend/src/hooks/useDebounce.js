import { useEffect, useState } from 'react'

/**
 * Delays updating the returned value until `delayMs` milliseconds have passed
 * since the last change to `value`.
 */
export function useDebounce(value, delayMs = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delayMs)

    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debouncedValue
}
