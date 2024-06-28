import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import userApi from '@/api-requests/user.api'
import { QUERY_KEY } from '@/constants/query-key'

export function useRegisterMutation() {
  return useMutation({
    mutationFn: userApi.registerFromBrowserToBackend,
  })
}

export function useResendEmailMutation() {
  return useMutation({
    mutationFn: userApi.resendEmailFromBrowserToBackend,
  })
}

export function useUserQuery(enabled: boolean = true) {
  return useQuery({
    queryFn: userApi.getUserFromBrowserToBackend,
    queryKey: [QUERY_KEY.USER],
    enabled,
  })
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.updateUserFromBrowserToBackend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER] })
    },
  })
}
