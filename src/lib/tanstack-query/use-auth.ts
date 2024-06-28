import { useMutation, useQueryClient } from '@tanstack/react-query'

import authApi from '@/api-requests/auth.api'
import { QUERY_KEY } from '@/constants/query-key'

export function useLoginToServerMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.loginFromBrowserToServer,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEY.USER] })
    },
  })
}

export function useLogoutToServerMutation() {
  return useMutation({
    mutationFn: authApi.logoutFromBrowserToServer,
  })
}
