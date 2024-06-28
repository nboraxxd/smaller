import Link from 'next/link'
import keyBy from 'lodash/keyBy'
import { FilterIcon } from 'lucide-react'

import productApi from '@/api-requests/product.api'
import { SearchParamsProps } from '@/types'
import { ProductListFieldType, ProductSortOptionsValue, ProductType, ProductsSearchParams } from '@/types/product.type'
import { PRODUCTS_SORT } from '@/constants/list'
import { productSortOptions, productListQueryFields } from '@/constants'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AutoPagination, ProductCard } from '@/components/common'
import FilterSection from './filter-section'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

export default async function ProdudctsPage({ searchParams }: SearchParamsProps) {
  const { name, page, minPrice, maxPrice, filterRating } = searchParams

  const categoriesResponse = await productApi.getCategoriesFromServerToBackend()
  const categoryById = keyBy(categoriesResponse.payload.data, 'id')

  const filteredProductSearchParams: ProductsSearchParams = omitBy(
    {
      sort:
        typeof searchParams.sort === 'string' &&
        Object.values(productSortOptions).includes(searchParams.sort as ProductSortOptionsValue)
          ? (searchParams.sort as ProductSortOptionsValue)
          : undefined,
      name,
      page: Number(page) ? page : undefined,
      minPrice,
      maxPrice,
      filterRating,
    },
    isUndefined
  )

  const productsResponse = await productApi.getProductsFromServerToBackend<Pick<ProductType, ProductListFieldType>>({
    fields: productListQueryFields,
    limit: '60',
    ...filteredProductSearchParams,
  })

  return (
    <main className="container pt-8 sm:px-6 md:pt-12 lg:px-8">
      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
        {/* Filter in desktop */}
        <div className="scrollbar-hide sticky top-[calc(var(--header-height)+3rem)] hidden h-[calc(100vh-var(--header-height))] overflow-y-auto pb-[calc(var(--header-height)+3rem)] lg:block">
          <div>
            <h3 className="text-2xl font-medium">Categories</h3>
            <ul className="mt-4 space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-foreground">
              <li>
                <Link href="/product">Tất cả sản phẩm</Link>
              </li>
              {categoriesResponse.payload.data.map((category) => (
                <li key={category.id}>
                  <Link href={category.slug}>{category.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <FilterSection />
        </div>
        <div>
          <div className="flex flex-col items-center gap-5 border-b border-gray-200 pb-6 md:flex-row">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">New Arrivals</h1>

            <div className="ml-auto flex items-center gap-6">
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
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 xl:grid-cols-5">
            {productsResponse.payload.data.map((product) => {
              const category = categoryById[product.categories]
              return <ProductCard key={product.id} product={product} category={category?.title} />
            })}
          </div>
          {productsResponse.payload.paginate.count > 0 ? (
            <div className="mt-10">
              <AutoPagination
                currentPage={productsResponse.payload.paginate.currentPage}
                pageSize={productsResponse.payload.paginate.totalPage}
                pathname="/products"
              />
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}
