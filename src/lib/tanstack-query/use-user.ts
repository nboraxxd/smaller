import { useMutation } from '@tanstack/react-query'

import userApi from '@/api-requests/user.api'
import { QUERY_KEY } from '@/constants/query-key'

export function useRegisterMutation() {
  return useMutation({
    mutationFn: userApi.registerFromBrowserToBackend,
    mutationKey: [QUERY_KEY.REGISTER],
  })
}

export function useResendEmailMutation() {
  return useMutation({
    mutationFn: userApi.resendEmailFromBrowserToBackend,
    mutationKey: [QUERY_KEY.RESEND_EMAIL],
  })
}
