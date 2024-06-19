import { redirect } from 'next/navigation'

import envConfig from '@/constants/config'
import { HTTP_STATUS_CODE } from '@/constants/http-status-code'
import { AuthResponse } from '@/types/auth.type'
import { isBrowser, addFirstSlashToUrl } from '@/utils'
import {
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from '@/utils/local-storage'

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string
  headers?: HeadersInit & { Authorization?: string }
}

type CustomOptionsExcluedBody = Omit<CustomOptions, 'body'>

type BadRequestErrorPayload = {
  message: string
  error?: string
  detail?: {
    [key: string]: string
  }[]
}

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }

  constructor({ status, payload, message = 'Http Error' }: { status: number; payload: any; message?: string }) {
    super(message)
    this.status = status
    this.payload = payload
  }
}

export class BadRequestError extends HttpError {
  status: typeof HTTP_STATUS_CODE.BAD_REQUEST = HTTP_STATUS_CODE.BAD_REQUEST
  payload: BadRequestErrorPayload

  constructor(payload: BadRequestErrorPayload) {
    super({ status: HTTP_STATUS_CODE.BAD_REQUEST, payload, message: 'Bad Request Error' })
    this.payload = payload
  }
}

let clientLogoutRequest: Promise<any> | null = null

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions) => {
  const body = options?.body instanceof FormData ? options.body : JSON.stringify(options?.body)

  const baseHeaders: HeadersInit = options?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }

  const baseUrl = options?.baseUrl || envConfig.NEXT_PUBLIC_API_ENDPOINT

  const fullUrl = `${baseUrl}${addFirstSlashToUrl(url)}`

  if (isBrowser) {
    const accessToken = getAccessTokenFromLocalStorage()
    if (accessToken) {
      baseHeaders.Authorization = `Bearer ${accessToken}`
    }
  }

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    method,
    body,
  })

  const payload: Response = await res.json()

  const data = {
    status: res.status,
    payload,
  }

  // Intercept errors
  if (!res.ok) {
    if (res.status === HTTP_STATUS_CODE.BAD_REQUEST) {
      throw new BadRequestError(data.payload as BadRequestErrorPayload)
    } else if (res.status === HTTP_STATUS_CODE.FORBIDDEN) {
      if (isBrowser && !clientLogoutRequest) {
        clientLogoutRequest = fetch('/api/auth/logout', {
          method: 'POST',
          body: null, // Logout sẽ luôn thành công
          headers: { ...baseHeaders },
        })

        try {
          await clientLogoutRequest
        } catch (error) {
          console.log('😰 clientLogoutRequest', error)
        } finally {
          removeTokensFromLocalStorage()
          clientLogoutRequest = null
          // Redirect về trang login có thể dẫn đến loop vô hạn
          // Nếu không không được xử lý đúng cách
          // Vì nếu rơi vào trường hợp tại trang Login, chúng ta có gọi các API cần access token
          // Mà access token đã bị xóa thì nó lại nhảy vào đây, và cứ thế nó sẽ bị lặp
          window.location.href = '/login'
        }
      }

      if (!isBrowser) {
        // Đây là trường hợp khi mà access token của chúng ta còn hạn
        // Và chúng ta gọi API ở Next.js server (route handler hoặc server component) đến server backend
        const accessToken = options?.headers?.Authorization?.split('Bearer ')[1]

        redirect(`/logout?accessToken=${accessToken}`)
      }
      throw new HttpError(data)
    } else {
      throw new HttpError(data)
    }
  }

  // Client gọi đến route handle, từ đó route handle sẽ gọi đến backend để login
  if (isBrowser && addFirstSlashToUrl(url) === '/api/auth/login') {
    const { accessToken, refreshToken } = (payload as AuthResponse).data

    setAccessTokenToLocalStorage(accessToken)
    setRefreshTokenToLocalStorage(refreshToken)
  }

  // Client gọi đến route handle, từ đó route handle sẽ gọi đến backend để logout
  if (isBrowser && addFirstSlashToUrl(url) === '/auth/logout') {
    removeTokensFromLocalStorage()
  }

  return data
}

const http = {
  get<Response>(url: string, options?: CustomOptionsExcluedBody) {
    return request<Response>('GET', url, options)
  },
  post<Response>(url: string, body: any, options?: CustomOptionsExcluedBody) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(url: string, body: any, options?: CustomOptionsExcluedBody) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(url: string, options?: CustomOptionsExcluedBody) {
    return request<Response>('DELETE', url, options)
  },
}

export default http
