import jwt from 'jsonwebtoken'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { TokenPayload } from '@/types'
import authApi from '@/api-requests/auth.api'
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeTokensFromLocalStorage,
  setAccessTokenToLocalStorage,
} from '@/utils/local-storage'

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

export function generateRandomId(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }

  return randomString
}

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number).replace('₫', '').trim()
}

export function extractCategorySlug(categorySlugInput: string) {
  const parts = categorySlugInput.split(/-id[^-]*$/)
  return parts[0]
}

export function extractProductId(productSlugInput: string) {
  const parts = productSlugInput.split('-p')

  return parts.at(-1)
}

export function extractProductSlug(productSlugInput: string) {
  const slugLastDashIndex = productSlugInput.lastIndexOf('-')
  const partialSlug = productSlugInput.substring(0, slugLastDashIndex)

  return partialSlug
}

export async function checkAndRefreshToken(params?: { onSuccess?: () => void; onError?: () => void }) {
  // Không nên đưa logic lấy access token và refresh token ra khỏi function `checkAndRefreshToken`
  // Vì để mỗi lần mà gọi function `checkAndRefreshToken` thì sẽ lấy access token và refresh token mới
  // Để tránh hiện tượng bug nó lấy access token và refresh token cũ ở lần đầu rồi gọi cho các lần tiếp theo
  const accessToken = getAccessTokenFromLocalStorage()
  const refreshToken = getRefreshTokenFromLocalStorage()

  // Chưa đăng nhập thì không cần check refresh token
  if (!accessToken || !refreshToken) return

  const accessTokenDecoded = jwt.decode(accessToken) as TokenPayload
  const refreshTokenDecoded = jwt.decode(refreshToken) as TokenPayload

  // Thời điểm hết hạn của token được tính theo epoch time (s)
  // Còn khi dùng cú pháp `new Date().getTime()` thì nó sẽ trả về epoch time (ms) nên cần chia cho 1000
  const now = Math.floor(new Date().getTime() / 1000)

  // Ví dụ access token có thời gian hết hạn là 30s
  // thì chúng ta sẽ refresh token khi access token còn 1/3 thời gian, tức còn 10s
  // Thời gian còn lại của access token sẽ tính theo công thức: accessTokenDecoded.exp - now
  // Thời gian hết hạn của access token sẽ tính theo công thức: accessTokenDecoded.exp - accessTokenDecoded.iat
  // Thời gian còn lại của access token nhỏ hơn 1/3 thời gian hết hạn của access token thì tiến hành refresh token
  const shouldRefreshToken = accessTokenDecoded.exp - now < (accessTokenDecoded.exp - accessTokenDecoded.iat) / 5

  // Trường hợp BẮT BUỘC PHẢI refresh token nhưng khi đó refresh token đã hết hạn thì không xử lý nữa
  if (shouldRefreshToken && refreshTokenDecoded.exp <= now) {
    removeTokensFromLocalStorage(true)
    return params?.onError && params.onError()
  }

  if (shouldRefreshToken) {
    try {
      const response = await authApi.refreshTokenFromBrowserToServer()
      const { accessToken } = response.payload.data

      setAccessTokenToLocalStorage(accessToken)
      params?.onSuccess && params.onSuccess()
    } catch (error) {
      params?.onError && params.onError()
    }
  }
}
