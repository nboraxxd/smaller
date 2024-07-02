'use client'

import jwt from 'jsonwebtoken'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { TokenPayload } from '@/types'
import { useAuthStore } from '@/lib/stores/auth-store'
import { getAccessTokenFromLocalStorage, localStorageEventTarget } from '@/utils/local-storage'

interface Props {
  children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
  const router = useRouter()

  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  useEffect(() => {
    function checkIsAuth() {
      const now = Math.floor(new Date().getTime() / 1000)

      const accessToken = getAccessTokenFromLocalStorage()
      const accessTokenDecoded = accessToken ? (jwt.decode(accessToken) as TokenPayload) : null

      return accessTokenDecoded ? accessTokenDecoded.exp > now : false
    }

    function handleRemoveAuth() {
      setIsAuth(false)
      router.push('/login')
      router.refresh()
      toast.warning('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại. (force)')
    }

    setIsAuth(checkIsAuth())

    localStorageEventTarget.addEventListener('removeLocalStorage', handleRemoveAuth)
    return () => {
      localStorageEventTarget.removeEventListener('removeLocalStorage', handleRemoveAuth)
    }
  }, [router, setIsAuth])

  return children
}
