import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

import authApi from '@/api-requests/auth.api'
import { TokenPayload } from '@/types'
import { LoginReqBody } from '@/types/auth.type'
import { HttpError } from '@/utils/http'
import { HTTP_STATUS_CODE } from '@/constants/http-status-code'

export async function POST(req: Request) {
  const body = (await req.json()) as LoginReqBody

  const cookieStore = cookies()

  try {
    const { payload } = await authApi.loginFromServerToBackend(body)

    const { accessToken, refreshToken } = payload.data

    const accessTokenDecoded = jwt.decode(accessToken) as TokenPayload
    const refreshTokenDecoded = jwt.decode(refreshToken) as TokenPayload

    cookieStore.set('accessToken', accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: accessTokenDecoded.exp * 1000,
    })

    cookieStore.set('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: refreshTokenDecoded.exp * 1000,
    })

    return Response.json(payload)
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, { status: error.status })
    } else {
      return Response.json({ message: 'Internal Server Error' }, { status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR })
    }
  }
}
