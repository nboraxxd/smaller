import { useMutation } from '@tanstack/react-query'

import authApi from '@/api-requests/auth.api'
import { QUERY_KEY } from '@/constants/query-key'

export function useLoginToServerMutation() {
  return useMutation({
    mutationFn: authApi.loginFromBrowserToServer,
    mutationKey: [QUERY_KEY.LOGIN],
  })
}
