import http from '@/utils/http'
import envConfig from '@/constants/config'
import { MessageResponse } from '@/types'
import { AuthResponse, LoginReqBody } from '@/types/auth.type'

type RefreshTokenResponse = {
  data: Pick<AuthResponse['data'], 'accessToken'>
}

const AUTH_PREFIX = '/authentication/v2'

const authApi = {
  // API OF BACKEND SERVER
  loginFromServerToBackend: (body: LoginReqBody) => http.post<AuthResponse>(`${AUTH_PREFIX}/login`, body),

  refreshTokenFromServerToBackend: (refreshToken: string) =>
    http.post<AuthResponse>(`${AUTH_PREFIX}/refresh-token`, { refreshToken }),

  // API OF NEXT.JS SERVER
  loginFromBrowserToServer: (body: LoginReqBody) =>
    http.post<AuthResponse>(`/api/auth/login`, body, { baseUrl: envConfig.NEXT_URL }),

  logoutFromBrowserToServer: () => http.post<MessageResponse>(`/api/auth/logout`, {}, { baseUrl: envConfig.NEXT_URL }),

  refreshTokenFromBrowserToServer: () =>
    http.post<RefreshTokenResponse>(`/api/auth/refresh-token`, {}, { baseUrl: envConfig.NEXT_URL }),
}

export default authApi
