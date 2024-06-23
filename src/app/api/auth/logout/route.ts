import { cookies } from 'next/headers'

export function POST() {
  const cookieStore = cookies()

  const accessToken = cookieStore.get('accessToken')
  const refreshToken = cookieStore.get('refreshToken')

  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')

  if (!accessToken || !refreshToken) {
    return Response.json({
      message: 'Không nhận được access token hoặc refresh token nhưng vẫn thực hiện đăng xuất thành công',
    })
  }

  return Response.json({ message: 'Đăng xuất thành công' })
}
