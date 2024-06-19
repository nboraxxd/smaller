import http from '@/utils/http'
import { RegisterReqBody, RegisterResponse, ResendEmailResponse } from '@/types/user.type'

const USER_PREFIX = '/users'

const userApi = {
  registerFromBrowserToBackend: (body: RegisterReqBody) => http.post<RegisterResponse>(`${USER_PREFIX}/register`, body),

  resendEmailFromBrowserToBackend: (username: string) =>
    http.post<ResendEmailResponse>(`${USER_PREFIX}/resend-email`, { username }),
}

export default userApi
