import { z } from 'zod'
import { AUTH_MESSAGES } from '@/constants/messages'

const name = z.string().min(1, AUTH_MESSAGES.NAME_IS_REQUIRED)
export const username = z.string().email(AUTH_MESSAGES.EMAIL_INVALID)
export const password = z.string().regex(/^.{6,32}$/, AUTH_MESSAGES.PASSWORD_INVALID)

export const RegisterSchema = z
  .object({
    name,
    username,
    password,
    confirmPassword: password,
  })
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: AUTH_MESSAGES.PASSWORD_NOT_MATCH,
        path: ['confirmPassword'],
      })
    }
  })

export const UpdateMeSchema = z.object({
  name,
  avatar: z.string().url().nullable(),
  fb: z
    .string()
    .regex(
      /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/,
      'Link facebook không hợp lệ'
    )
    .nullable(),
  birthday: z.string().datetime().nullable(),
  gender: z.enum(['male', 'female', 'other']).nullable(),
  phone: z
    .string()
    .regex(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng')
    .nullable(),
})

export const ChangePasswordSchema = z
  .object({
    oldPassword: password,
    password,
    confirmPassword: password,
  })
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: AUTH_MESSAGES.PASSWORD_NOT_MATCH,
        path: ['confirmPassword'],
      })
    }
  })

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
export type UpdateMeSchemaType = z.infer<typeof UpdateMeSchema>
export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>
