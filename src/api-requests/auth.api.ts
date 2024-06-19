import http from '@/lib/http'
import envConfig from '@/constants/config'
import { AuthResponse, LoginReqBody } from '@/types/auth.type'

const PREFIX = '/authentication/v2'

const authApi = {
  loginFromBrowserToServer: (body: LoginReqBody) =>
    http.post<AuthResponse>(`/auth/login`, body, { baseUrl: envConfig.NEXT_PUBLIC_API_ENDPOINT }),

  loginFromServerToBackend: (body: LoginReqBody) => http.post<AuthResponse>(`${PREFIX}/login`, body),
}

export default authApi
