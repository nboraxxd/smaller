import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { TokenPayload } from '@/types'
import authApi from '@/api-requests/auth.api'
import { HTTP_STATUS_CODE } from '@/constants/http-status-code'

export async function POST() {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get('refreshToken')?.value
  const accessToken = cookieStore.get('accessToken')?.value

  if (!refreshToken) {
    return Response.json({ message: 'Refresh token not found' }, { status: HTTP_STATUS_CODE.UNAUTHORIZED })
  }

  console.log('🔥 ~ POST ~ refreshToken:', accessToken)
  try {
    const { payload } = await authApi.refreshTokenFromServerToBackend(refreshToken)

    const { accessToken: newAccessToken } = payload.data

    const accessTokenDecoded = jwt.decode(newAccessToken) as TokenPayload

    cookieStore.set('accessToken', newAccessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: accessTokenDecoded.exp * 1000,
    })

    return Response.json({ data: { accessToken: payload.data.accessToken } })
  } catch (error: any) {
    return Response.json({ message: error.message || 'Unauthorized' }, { status: HTTP_STATUS_CODE.UNAUTHORIZED })
  }
}
