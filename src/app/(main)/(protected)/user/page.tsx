import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import userApi from '@/api-requests/user.api'
import { Button } from '@/components/ui/button'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ChangePasswordForm, UpdateProfileForm } from '@/components/forms'

export default async function UserPage() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) redirect('/login')

  let user

  try {
    const response = await userApi.getUserFromServerToBackend(accessToken)

    user = response.payload.data
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
  }

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
          <Link href="#" className="font-semibold text-primary">
            Quản lý tài khoản
          </Link>
          <Link href="#">Sổ địa chỉ</Link>
          <Link href="#">Thông tin thanh toán</Link>
          <Link href="#">Đơn hàng</Link>
          <Link href="#">Sản phẩm yêu thích</Link>
        </nav>
        <div className="grid gap-6">
          <UpdateProfileForm />
          <ChangePasswordForm />
        </div>
      </div>
    </main>
  )
}
