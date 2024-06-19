import { z } from 'zod'
import { AUTH_MESSAGES } from '@/constants/messages'

const name = z.string().min(1, AUTH_MESSAGES.NAME_IS_REQUIRED)
const username = z.string().email(AUTH_MESSAGES.EMAIL_INVALID)
const password = z.string().regex(/^.{6,32}$/, AUTH_MESSAGES.PASSWORD_INVALID)

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

export const LoginSchema = z.object({ username, password }).strict()

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
export type LoginSchemaType = z.infer<typeof LoginSchema>
