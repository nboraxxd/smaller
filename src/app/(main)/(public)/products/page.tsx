import Link from 'next/link'
import { FilterIcon } from 'lucide-react'

import productApi from '@/api-requests/product.api'
import { PRODUCTS_SORT } from '@/constants/list'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import FilterSection from './filter-section'

export default async function ProdudctsPage() {
  const categoriesResponse = await productApi.getCategoriesFromServerToBackend()

  return (
    <main className="container sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-16 lg:pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">New Arrivals</h1>

        <div className="flex items-center gap-6">
          {/* Sort */}
          <Select>
            <SelectTrigger>
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

          {/* Filter */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 text-foreground/60 hover:text-foreground/75 lg:hidden"
              >
                <FilterIcon className="size-5" />
                <span className="sr-only">Lọc sản phẩm</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="overflow-y-auto pb-20">
              <SheetHeader>
                <SheetTitle>Lọc sản phẩm</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 grid gap-6 border-y border-border py-6 text-lg font-medium">
                <ul className="space-y-4 text-sm font-medium text-foreground">
                  {categoriesResponse.payload.data.map((category) => (
                    <li key={category.id}>
                      <Link href={category.slug}>{category.title}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <FilterSection />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="pt-6 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
        <div className="hidden lg:block">
          <div>
            <h3 className="sr-only">Categories</h3>
            <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-foreground">
              {categoriesResponse.payload.data.map((category) => (
                <li key={category.id}>
                  <Link href={category.slug}>{category.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <FilterSection />
        </div>
        <div>products</div>
      </div>
    </main>
  )
}
