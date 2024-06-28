import { z } from 'zod'
import { password, username } from '@/lib/schemas/user.shema'

export const LoginSchema = z.object({ username, password }).strict()

export type LoginSchemaType = z.infer<typeof LoginSchema>
