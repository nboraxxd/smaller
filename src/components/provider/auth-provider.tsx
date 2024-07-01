'use client'

import { toast } from 'sonner'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/lib/stores/auth-store'
import { getAccessTokenFromLocalStorage, localStorageEventTarget } from '@/utils/local-storage'

interface Props {
  children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
  const router = useRouter()

  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  useEffect(() => {
    setIsAuth(!!getAccessTokenFromLocalStorage())

    const handleRemoveAuth = () => {
      setIsAuth(false)
      router.push('/login')
      router.refresh()
      toast.warning('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại. (force)')
    }

    localStorageEventTarget.addEventListener('removeLocalStorage', handleRemoveAuth)
    return () => {
      localStorageEventTarget.removeEventListener('removeLocalStorage', handleRemoveAuth)
    }
  }, [router, setIsAuth])

  return children
}
