'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChangePasswordSchema, ChangePasswordSchemaType } from '@/lib/schemas/user.shema'
import { useChangePasswordMutation } from '@/lib/tanstack-query/use-user'
import { toast } from 'sonner'
import { handleBrowserErrorApi } from '@/utils/error'
import { ForbiddenError } from '@/utils/http'

export default function ChangePasswordForm() {
  const changePasswordMutation = useChangePasswordMutation()

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  async function onSubmit(values: ChangePasswordSchemaType) {
    const { currentPassword, newPassword } = values

    try {
      const response = await changePasswordMutation.mutateAsync({
        currentPassword,
        newPassword,
      })

      toast.success(response.payload.message)
    } catch (error) {
      if (error instanceof ForbiddenError) {
        form.setError(error.payload.message.includes('Password cũ không đúng') ? 'currentPassword' : 'newPassword', {
          type: 'server',
          message: error.payload.message,
        })
      } else {
        handleBrowserErrorApi({ error, setError: form.setError })
      }
    }
  }

  return (
    <Form {...form}>
      <form noValidate className="grid auto-rows-max items-start gap-4 md:gap-8" onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
          <CardHeader>
            <CardTitle>Đổi mật khẩu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {/* Email */}
              <div className="hidden">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" disabled readOnly defaultValue="demo@demo.com" />
                </FormControl>
              </div>

              {/* Current password */}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="oldPassword">Mật khẩu cũ</Label>
                      <Input
                        id="oldPassword"
                        type="password"
                        autoComplete="current-password"
                        className="w-full"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* New password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="password">Mật khẩu mới</Label>
                      <Input id="password" type="password" autoComplete="new-password" className="w-full" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Confirm new password */}
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="confirmPassword">Nhập lại mật khẩu mới</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        className="w-full"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div className=" flex items-center gap-2 md:ml-auto">
                <Button size="sm" type="submit" className="gap-1">
                  Đổi mật khẩu
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
