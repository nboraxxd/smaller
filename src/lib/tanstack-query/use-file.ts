import fileApi from '@/api-requests/file.api'
import { useMutation } from '@tanstack/react-query'

export function useUploadImageMutation() {
  return useMutation({ mutationFn: fileApi.uploadImageFromBrowserToBackend })
}
