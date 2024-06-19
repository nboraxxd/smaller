import Link from 'next/link'

import { SmallerIcon } from '@/components/icons'
import { RegisterForm } from '@/components/forms'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Link href="/" className="mx-auto">
        <SmallerIcon className="size-12" />
      </Link>

      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary sm:mx-auto sm:w-full sm:max-w-sm">
        Đăng ký tài khoản
      </h1>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <RegisterForm />

        <p className="mt-10 text-center text-sm text-primary">
          Bạn đã có tài khoản?{' '}
          <Link href="/login" className="font-semibold leading-6 text-primary hover:text-primary/90">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}
