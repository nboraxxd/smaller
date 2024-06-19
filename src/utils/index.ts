import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isBrowser = typeof window !== 'undefined'

export function addFirstSlashToUrl(url: string) {
  return url.startsWith('/') ? url : `/${url}`
}

export function formatSecondsToMMSS(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSecs = seconds % 60
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(remainingSecs).padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
}
