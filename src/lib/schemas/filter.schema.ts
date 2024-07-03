import { z } from 'zod'

import { PRICE_FILTER_MESSAGES } from '@/constants/messages'

export const FilterSchema = z
  .object({
    filterRating: z.enum(['1', '2', '3', '4', '5']).optional(),
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
    if (val.minPrice && val.maxPrice && Number(val.minPrice) > Number(val.maxPrice)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: PRICE_FILTER_MESSAGES.PRICE_RANGE_INVALID,
        path: ['maxPrice'],
      })
    }
  })

export type FilterSchemaType = z.infer<typeof FilterSchema>
