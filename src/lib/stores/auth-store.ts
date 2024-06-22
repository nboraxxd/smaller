import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type AuthStore = {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      isAuth: false,
      setIsAuth: (isAuth) => set({ isAuth }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'authStore',
    }
  )
)
