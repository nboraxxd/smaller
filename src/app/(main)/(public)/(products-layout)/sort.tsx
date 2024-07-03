'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { ProductSortOptionsValue } from '@/types/product.type'
import { PRODUCTS_SORT } from '@/constants/list'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Sort() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const newSearchParams = new URLSearchParams(searchParams)

  return (
    <Select
      onValueChange={(ev: ProductSortOptionsValue) => {
        newSearchParams.delete('page')
        newSearchParams.set('sort', ev)

        router.push(`${pathname}?${newSearchParams}`)
      }}
      value={searchParams.get('sort') ?? undefined}
    >
      <SelectTrigger value={searchParams.get('sort') ?? undefined}>
        <SelectValue placeholder="Sắp xếp" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          {PRODUCTS_SORT.map((sort) => (
            <SelectItem key={sort.value} value={sort.value}>
              {sort.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
