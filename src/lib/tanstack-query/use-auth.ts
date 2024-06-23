import { useMutation } from '@tanstack/react-query'

import authApi from '@/api-requests/auth.api'

export function useLoginToServerMutation() {
  return useMutation({
    mutationFn: authApi.loginFromBrowserToServer,
  })
}

export function useLogoutToServerMutation() {
  return useMutation({
    mutationFn: authApi.logoutFromBrowserToServer,
  })
}
