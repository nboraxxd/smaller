'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { checkAndRefreshToken } from '@/utils'
import { getRefreshTokenFromLocalStorage } from '@/utils/local-storage'
import { useAuthStore } from '@/lib/stores/auth-store'

function RefreshTokenPageWithoutSuspense() {
  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  const router = useRouter()

  const searchParams = useSearchParams()
  const nextPath = searchParams.get('next')
  const refreshTokenFromUrl = searchParams.get('refreshToken')

  useEffect(() => {
    if (refreshTokenFromUrl && refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) {
      checkAndRefreshToken({
        onSuccess: () => {
          console.log('🚀 super first checkAndRefreshToken')
          setIsAuth(true)

          router.push(nextPath ? `${nextPath}` : `/`)
        },
      })
    } else {
      router.push('/')
    }
  }, [nextPath, refreshTokenFromUrl, router, setIsAuth])

  return null
}

export default function RefreshTokenPage() {
  return (
    <Suspense>
      <RefreshTokenPageWithoutSuspense />
    </Suspense>
  )
}
