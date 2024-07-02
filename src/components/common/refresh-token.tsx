'use client'

import ms from 'ms'
import jwt from 'jsonwebtoken'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import envConfig from '@/constants/config'
import authApi from '@/api-requests/auth.api'
import { TokenPayload } from '@/types'
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from '@/utils/local-storage'

// không check refresh token cho các path này
const UNAUTHENTICATED_PATHS = ['/login', '/register', '/logout', '/refresh-token']

export default function RefreshToken() {
  const pathname = usePathname()

  useEffect(() => {
    if (UNAUTHENTICATED_PATHS.includes(pathname)) return

    let interval: NodeJS.Timeout | null = null

    async function checkAndRefreshToken() {
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
      const shouldRefreshToken = accessTokenDecoded.exp - now < (accessTokenDecoded.exp - accessTokenDecoded.iat) / 3

      if (refreshTokenDecoded.exp <= now) return

      if (shouldRefreshToken) {
        try {
          const response = await authApi.refreshTokenFromBrowserToServer()
          const { accessToken } = response.payload.data

          setAccessTokenToLocalStorage(accessToken)
        } catch (error) {
          if (interval) clearInterval(interval)
        }
      }
    }

    // Phải gọi 1 lần đầu tiên vì interval sẽ chỉ chạy sau thời gian TIMEOUT
    checkAndRefreshToken()

    // Timeout interval phải nhỏ hơn thời gian hết hạn của access token
    // Ví dụ access token hết hạn sau 30s thì 10s chúng ta sẽ check refresh token 1 lần
    const refreshTokenCheckInterval = ms(envConfig.REFRESH_TOKEN_CHECK_INTERVAL)
    interval = setInterval(checkAndRefreshToken, refreshTokenCheckInterval)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [pathname])

  return null
}
