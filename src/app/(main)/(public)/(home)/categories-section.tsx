import Link from 'next/link'
import Image from 'next/image'
import keyBy from 'lodash/keyBy'
import { Url } from 'next/dist/shared/lib/router/router'

import { extractCategorySlug } from '@/utils'
import { CATEGORIES_IMAGE } from '@/constants/list'
import productApi from '@/api-requests/product.api'

export default async function CategoriesSection() {
  const categoriesImage = keyBy(CATEGORIES_IMAGE, 'id')

  const categoriesResponse = await productApi.getCategoriesFromServerToBackend()

  const categoriesTop = categoriesResponse.payload.data.filter((category) => category.position % 2 === 0)
  const categoriesBottom = categoriesResponse.payload.data.filter((category) => category.position % 2 !== 0)

  return (
    <section className="pt-16 lg:pt-24">
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Danh mục sản phẩm</h2>
        <Link href="/products" className="hidden text-sm font-semibold text-primary hover:text-primary/90 sm:block">
          Xem tất cả
          <span> &rarr;</span>
        </Link>
      </div>

      <div className="mt-5 flex flex-col gap-5 overflow-x-auto pb-3 xl:mt-10 xl:gap-10">
        <div className="flex gap-3 xl:gap-5">
          <Category href="/products" title="Tất cả sản phẩm" image="/images/categories/all.png" />
          {categoriesTop.map((category) => {
            const categoryImage = categoriesImage[category.id].image
            const categorySlug = extractCategorySlug(category.slug)

            return (
              <Category
                key={category.id}
                href={`/${categorySlug}/${category.id}`}
                title={category.title}
                image={categoryImage}
              />
            )
          })}
        </div>
        <div className="flex gap-3 xl:gap-5">
          {categoriesBottom.map((category) => {
            const categoryImage = categoriesImage[category.id].image
            const categorySlug = extractCategorySlug(category.slug)

            return (
              <Category
                key={category.id}
                href={`/${categorySlug}/${category.id}`}
                title={category.title}
                image={categoryImage}
              />
            )
          })}
        </div>
      </div>

      <div className="mt-6 px-4 sm:hidden">
        <Link href="/products" className="block text-sm font-semibold text-primary hover:text-primary/90">
          Xem tất cả
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </section>
  )
}

function Category({ href, title, image }: { href: Url; title: string; image: string }) {
  return (
    <Link
      href={href}
      className="flex w-[6.75rem] shrink-0 grow flex-col items-center gap-3 justify-self-center transition-opacity hover:opacity-80 md:w-28 xl:w-32"
    >
      <div className="overflow-hidden rounded-[35%] border border-border">
        <Image
          src={image}
          alt={title}
          width={96}
          height={96}
          className="size-16 object-contain md:size-20 xl:size-24"
          unoptimized
        />
      </div>
      <h3 className="text-balance text-center text-xs font-medium capitalize xl:text-sm">{title}</h3>
    </Link>
  )
}
