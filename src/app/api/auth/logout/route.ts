import { cookies } from 'next/headers'

export function POST() {
  const cookieStore = cookies()

  const accessToken = cookieStore.get('accessToken')
  const refreshToken = cookieStore.get('refreshToken')

  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')

  if (!accessToken || !refreshToken) {
    return Response.json({
      message: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại. (missing token)',
    })
  }

  return Response.json({ message: 'Đăng xuất thành công' })
}
