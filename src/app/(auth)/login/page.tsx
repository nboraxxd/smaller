import Link from 'next/link'

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
        <LoginForm />

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
