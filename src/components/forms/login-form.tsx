'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { LoaderCircleIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { ForbiddenError } from '@/utils/http'
import { handleBrowserErrorApi } from '@/utils/error'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useLoginToServerMutation } from '@/lib/tanstack-query/use-auth'
import { LoginSchema, LoginSchemaType } from '@/lib/schemas/auth.schema'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useEffect } from 'react'
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeTokensFromLocalStorage,
} from '@/utils/local-storage'

export default function LoginForm() {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const next = searchParams.get('next')

  const setIsAuth = useAuthStore((state) => state.setIsAuth)

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const loginMutation = useLoginToServerMutation()

  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage()
    const refreshToken = getRefreshTokenFromLocalStorage()
    if (next && (accessToken || refreshToken)) {
      removeTokensFromLocalStorage()
    }
  }, [next])

  async function onValid(values: LoginSchemaType) {
    if (loginMutation.isPending) return

    try {
      await loginMutation.mutateAsync(values)

      setIsAuth(true)

      const from = new URLSearchParams()
      from.set('from', pathname)

      router.push(next ? `${next}/?${from}` : '/')
      router.refresh()
    } catch (error: any) {
      if (error instanceof ForbiddenError) {
        form.setError('password', { type: 'server', message: error.payload.message })
      } else {
        handleBrowserErrorApi({ error, setError: form.setError })
      }
    }
  }

  return (
    <Form {...form}>
      <form className="w-full max-w-[600px] shrink-0 space-y-2" noValidate onSubmit={form.handleSubmit(onValid)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="bruce@wayne.dc"
                    required
                    {...field}
                  />
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Link href="/forgot-password" className="text-sm font-semibold text-primary hover:text-primary/90">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    {...field}
                  />
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full gap-1.5" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
            Đăng nhập
          </Button>
        </div>
      </form>
    </Form>
  )
}
