import { HTTP_STATUS_CODE } from '@/constants/http-status-code'
import { HttpError } from '@/utils/http'
import authApi from '@/api-requests/auth.api'

export async function GET() {
  try {
    const { payload } = await authApi.getCategoryFromServerToBackend()

    return Response.json(payload)
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, { status: error.status })
    } else {
      return Response.json({ message: 'Internal Server Error' }, { status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR })
    }
  }
}
