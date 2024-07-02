'use client'

import ms from 'ms'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import envConfig from '@/constants/config'
import { checkAndRefreshToken } from '@/utils'
import { useAuthStore } from '@/lib/stores/auth-store'

// không check refresh token cho các path này
const UNAUTHENTICATED_PATHS = ['/login', '/register', '/logout', '/refresh-token']

export default function RefreshToken() {
  const pathname = usePathname()
  const router = useRouter()

  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  useEffect(() => {
    if (UNAUTHENTICATED_PATHS.includes(pathname)) return

    let interval: NodeJS.Timeout | null = null

    function onError() {
      if (interval) {
        clearInterval(interval)
      }

      setIsAuth(false)
    }

    // Phải gọi 1 lần đầu tiên vì interval sẽ chỉ chạy sau thời gian TIMEOUT
    checkAndRefreshToken({
      onSuccess: () => {
        console.log('🚀 first checkAndRefreshToken')
        setIsAuth(true)
      },
      onError,
    })

    // `refreshTokenCheckInterval` phải nhỏ hơn 1/3 thời gian hết hạn của access token
    // Ví dụ access token hết hạn sau 30s thì ít nhất 10s chúng ta sẽ check refresh token 1 lần
    const refreshTokenCheckInterval = ms(envConfig.REFRESH_TOKEN_CHECK_INTERVAL)
    interval = setInterval(
      () =>
        checkAndRefreshToken({
          onSuccess: () => {
            console.log('🚀 other checkAndRefreshToken')
          },
          onError,
        }),
      refreshTokenCheckInterval
    )

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [pathname, router, setIsAuth])

  return null
}
