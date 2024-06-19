import { toast } from 'sonner'
import { UseFormSetError } from 'react-hook-form'

import { BadRequestError } from '@/utils/http'

export const handleBrowserErrorApi = ({ error, setError }: { error: any; setError?: UseFormSetError<any> }) => {
  if (error instanceof BadRequestError) {
    const formErrors = error.payload.detail
    if (formErrors) {
      const keys = Object.keys(formErrors)
      if (setError) {
        Object.entries(formErrors).forEach(([key, value]) => {
          setError(key, { type: 'server', message: value })
        })
      } else if (keys.length === 1) {
        toast.error(`${keys[0]} - ${formErrors[keys[0]]}`)
      } else {
        toast.error(error.payload.message)
      }
    }
  } else if (error instanceof DOMException) {
    console.log('AbortError:', error.message)
  } else {
    toast.error(error.payload?.message || error.toString())
  }
}
