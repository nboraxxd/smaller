import http from '@/utils/http'
import envConfig from '@/constants/config'
import { AuthResponse, LoginReqBody } from '@/types/auth.type'

const AUTH_PREFIX = '/authentication/v2'

const authApi = {
  loginFromBrowserToServer: (body: LoginReqBody) =>
    http.post<AuthResponse>(`/api/auth/login`, body, { baseUrl: envConfig.NEXT_URL }),

  loginFromServerToBackend: (body: LoginReqBody) => http.post<AuthResponse>(`${AUTH_PREFIX}/login`, body),
}

export default authApi
