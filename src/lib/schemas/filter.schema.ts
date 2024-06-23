import { z } from 'zod'

import { PRICE_FILTER_MESSAGES } from '@/constants/messages'

export const FilterSchema = z
  .object({
    rating: z.enum(['1', '2', '3', '4', '5']).optional(),
    minPrice: z
      .string()
      .optional()
      .refine((val) => Number(val) >= 0, {
        message: PRICE_FILTER_MESSAGES.PRICE_MUST_BE_POSITIVE_NUMBER,
      }),
    maxPrice: z
      .string()
      .optional()
      .refine((val) => Number(val) >= 0, {
        message: PRICE_FILTER_MESSAGES.PRICE_MUST_BE_POSITIVE_NUMBER,
      }),
  })
  .strict()
  .superRefine((val, ctx) => {
    if (!val.rating && !val.minPrice && !val.maxPrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one filter must be selected',
      })
    }
    if (val.minPrice && val.maxPrice && Number(val.minPrice) > Number(val.maxPrice)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: PRICE_FILTER_MESSAGES.MAX_PRICE_GT_MIN_PRICE,
        path: ['maxPrice'],
      })
    }
  })

export type FilterSchemaType = z.infer<typeof FilterSchema>
