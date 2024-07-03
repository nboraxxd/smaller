'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FilterSchema, FilterSchemaType } from '@/lib/schemas/filter.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function FilterSection() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const newSearchParams = new URLSearchParams(searchParams)

  const filterRatingFromUrl = searchParams.get('filterRating')
  const minPriceFromUrl = searchParams.get('minPrice')
  const maxPriceFromUrl = searchParams.get('maxPrice')

  const form = useForm<FilterSchemaType>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      filterRating:
        filterRatingFromUrl && (+filterRatingFromUrl >= 0 || +filterRatingFromUrl <= 5)
          ? (filterRatingFromUrl as Required<FilterSchemaType['filterRating']>)
          : undefined,
      minPrice:
        minPriceFromUrl && +minPriceFromUrl >= 0 && +minPriceFromUrl <= +(maxPriceFromUrl ?? Infinity)
          ? minPriceFromUrl
          : '',
      maxPrice:
        maxPriceFromUrl && +maxPriceFromUrl >= 0 && +maxPriceFromUrl >= +(minPriceFromUrl ?? -Infinity)
          ? maxPriceFromUrl
          : '',
    },
  })

  function onValid(values: FilterSchemaType) {
    if (!values.minPrice && !values.maxPrice && !values.filterRating) return

    newSearchParams.delete('page')
    values.minPrice && newSearchParams.set('minPrice', values.minPrice)
    values.maxPrice && newSearchParams.set('maxPrice', values.maxPrice)
    values.filterRating && newSearchParams.set('filterRating', values.filterRating)

    router.push(`${pathname}?${newSearchParams}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValid, (err) => console.log(err))} className="space-y-6 pt-6">
        <Label htmlFor="minPrice">Khoảng giá</Label>
        <div>
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="minPrice"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <Input id="minPrice" type="text" placeholder="10.000" {...field} />
                  </div>
                </FormItem>
              )}
            />
            <span>-</span>
            <FormField
              control={form.control}
              name="maxPrice"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <Input id="maxPrice" type="text" placeholder="99.000" {...field} />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <FormMessage className="mt-2 text-center">
            {form.formState.errors.minPrice?.message || form.formState.errors.maxPrice?.message}
          </FormMessage>
        </div>

        {/* rating */}
        <FormField
          control={form.control}
          name="filterRating"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Đánh giá</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-1">
                  {Array.from({ length: 5 }).map((_, index, arr) => (
                    <FormItem key={arr.length - index} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={(arr.length - index).toString()} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {arr.length - index} {arr.length - index === 5 ? 'sao' : 'sao trở lên'}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
