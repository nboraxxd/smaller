'use client'

import { toast } from 'sonner'
import { Suspense, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { UseMutateAsyncFunction } from '@tanstack/react-query'

import { handleBrowserErrorApi } from '@/utils/error'
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from '@/utils/local-storage'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useLogoutToServerMutation } from '@/lib/tanstack-query/use-auth'

function LogoutPageWithoutSuspense() {
  const logoutRef = useRef<UseMutateAsyncFunction | null>(null)

  const router = useRouter()

  const searchParams = useSearchParams()
  const accessTokenFromUrl = searchParams.get('accessToken')
  const refreshTokenFromUrl = searchParams.get('refreshToken')

  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  const { mutateAsync } = useLogoutToServerMutation()

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    if (
      !logoutRef.current &&
      ((refreshTokenFromUrl && refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) ||
        (accessTokenFromUrl && accessTokenFromUrl === getAccessTokenFromLocalStorage()))
    ) {
      ;(async () => {
        logoutRef.current = mutateAsync

        try {
          const response = await mutateAsync()

          setIsAuth(false)
          toast.info(response.payload.message)

          router.push('/')
          router.refresh()

          timeout = setTimeout(() => {
            logoutRef.current = null
          }, 1000)
        } catch (error) {
          handleBrowserErrorApi({ error })
        }
      })()
    } else {
      router.push('/')
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [accessTokenFromUrl, mutateAsync, refreshTokenFromUrl, router, setIsAuth])

  return null
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutPageWithoutSuspense />
    </Suspense>
  )
}
