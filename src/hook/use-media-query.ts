import { useCallback, useSyncExternalStore, useEffect, useState } from 'react'

type MediaQueryRange =
  | {
      minWidth?: number
      maxWidth: number
    }
  | {
      minWidth: number
      maxWidth?: number
    }
  | {
      minWidth: number
      maxWidth: number
    }

type MediaQuery =
  | `only screen and (max-width: ${string}px)`
  | `only screen and (min-width: ${string}px)`
  | `only screen and (min-width: ${string}px) and (max-width: ${string}px)`

export default function useMediaQuery({ minWidth, maxWidth }: MediaQueryRange): boolean {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  let mediaQuery: MediaQuery

  if (minWidth && !maxWidth) {
    mediaQuery = `only screen and (min-width: ${minWidth}px)`
  } else if (!minWidth && maxWidth) {
    mediaQuery = `only screen and (max-width: ${maxWidth}px)`
  } else {
    mediaQuery = `only screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`
  }

  const subscribe = useCallback(
    (callback: () => void) => {
      if (!mounted) {
        return () => {}
      }

      const matchMedia = window.matchMedia(mediaQuery)
      matchMedia.addEventListener('change', callback)

      return () => {
        matchMedia.removeEventListener('change', callback)
      }
    },
    [mediaQuery, mounted]
  )

  const getSnapshot = useCallback(() => {
    if (!mounted) {
      return false
    }

    return window.matchMedia(mediaQuery).matches
  }, [mediaQuery, mounted])

  const getServerSnapshot = () => {
    return false // Return false during server-side rendering
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
