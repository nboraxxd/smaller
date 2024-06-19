'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoaderCircleIcon, MailCheckIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { BadRequestError } from '@/utils/http'
import { handleBrowserErrorApi } from '@/utils/error'
import { useRegisterMutation, useResendEmailMutation } from '@/lib/tanstack-query/use-user'
import { RegisterSchema, RegisterSchemaType } from '@/lib/schemas/auth.schema'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import CountdownButton from '@/components/common/countdown-button'

export default function RegisterForm() {
  const [isWaiting, setIsWaiting] = useState(false)

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  const registerMutation = useRegisterMutation()

  const resendEmailMutation = useResendEmailMutation()

  async function onValid(values: RegisterSchemaType) {
    if (registerMutation.isPending) return

    try {
      await registerMutation.mutateAsync(values)

      form.resetField('password')
      form.resetField('confirmPassword')
      setIsWaiting(true)
    } catch (error: any) {
      if (error instanceof BadRequestError && !error.payload.detail) {
        form.setError('username', { type: 'server', message: error.payload.message })
      } else {
        handleBrowserErrorApi({ error, setError: form.setError })
      }
    }
  }

  async function handleResendEmail() {
    if (resendEmailMutation.isPending) return

    try {
      setIsWaiting(false)

      const response = await resendEmailMutation.mutateAsync(form.getValues('username'))

      toast.success(response.payload.message)
      setIsWaiting(true)
    } catch (error) {
      handleBrowserErrorApi({ error, setError: form.setError })
    }
  }

  return (
    <>
      {registerMutation.isSuccess ? (
        <Alert className="mb-4">
          <MailCheckIcon className="size-5" />
          <AlertTitle className="mb-2">Đã gửi email kích hoạt</AlertTitle>
          <AlertDescription>{registerMutation.data.payload.message}</AlertDescription>
        </Alert>
      ) : null}
      <Form {...form}>
        <form className="w-full max-w-[600px] shrink-0 space-y-2" noValidate onSubmit={form.handleSubmit(onValid)}>
          <div className="grid gap-4">
            {!registerMutation.isSuccess ? (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Tên</Label>
                      <Input id="name" type="text" autoComplete="name" placeholder="Bruce Wayne" required {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            ) : null}
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
            {!registerMutation.isSuccess ? (
              <>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Mật khẩu</Label>
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="confirmPassword">Nhập lại mật khẩu</Label>
                        </div>
                        <Input
                          id="confirmPassword"
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
              </>
            ) : null}
            {registerMutation.isSuccess ? (
              <CountdownButton
                type="button"
                countdownTime={60}
                shouldStartCountdown={isWaiting}
                isLoading={resendEmailMutation.isPending}
                onClick={handleResendEmail}
              >
                Gửi lại email kích hoạt
              </CountdownButton>
            ) : (
              <Button type="submit" className="w-full gap-1.5" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? <LoaderCircleIcon className="size-4 animate-spin" /> : null}
                Đăng ký
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  )
}
