'use client'

import { useEffect, Suspense } from 'react'
import { LoaderCircleIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { checkAndRefreshToken } from '@/utils'
import { useAuthStore } from '@/lib/stores/auth-store'
import { getRefreshTokenFromLocalStorage } from '@/utils/local-storage'

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

  return <RefreshTokenView />
}

export default function RefreshTokenPage() {
  return (
    <Suspense fallback={<RefreshTokenView />}>
      <RefreshTokenPageWithoutSuspense />
    </Suspense>
  )
}

function RefreshTokenView() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="flex items-center gap-x-3">
        <LoaderCircleIcon className="size-8 animate-spin" />
        <span className="font-medium text-foreground">Đang xác thực...</span>
      </p>
    </div>
  )
}
