import Link from 'next/link'
import { Suspense } from 'react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SmallerIcon } from '@/components/icons'
import { LoginForm } from '@/components/forms'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Link href="/" className="mx-auto">
        <SmallerIcon className="size-12" />
      </Link>

      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary sm:mx-auto sm:w-full sm:max-w-sm">
        Đăng nhập
      </h1>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>

        <div className="mt-2 text-right">
          <Link href="/resend-email" className="text-sm font-semibold leading-6 text-primary hover:text-primary/90">
            Gửi lại email xác nhận
          </Link>
        </div>

        <p className="mt-10 text-center text-sm text-primary">
          Bạn chưa có tài khoản?{' '}
          <Link href="/register" className="font-semibold leading-6 text-primary hover:text-primary/90">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}

function LoginFormFallback() {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input readOnly placeholder="bruce@wayne.dc" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Mật khẩu</Label>
          <p className="text-sm font-semibold text-primary hover:text-primary/90">Quên mật khẩu?</p>
        </div>
        <Input readOnly placeholder="••••••••" />
      </div>

      <Button className="w-full" disabled>
        Đăng nhập
      </Button>
    </div>
  )
}
