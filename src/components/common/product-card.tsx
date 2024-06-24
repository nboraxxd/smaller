import Link from 'next/link'
import Image from 'next/image'
import { StarIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductType } from '@/types/product.type'
import { FieldUnion } from '@/types'
import { productErrorImages, productListQueryFields } from '@/constants'
import { formatCurrency } from '@/utils'

type FieldType = FieldUnion<typeof productListQueryFields>

interface Props {
  product: Pick<ProductType, FieldType>
  category?: string
}

export default function ProductCard({ product, category }: Props) {
  let image = product.images[0].medium_url

  if (productErrorImages.includes(image) && product.configurable_products && product.configurable_products.length > 0) {
    image =
      product.configurable_products[1]?.images[0]?.medium_url || product.configurable_products[0]?.images[0]?.medium_url
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="relative justify-center p-0">
        {/* Image */}
        <Link href={product.slug} className="aspect-h-1 aspect-w-1">
          <Image
            src={image}
            alt={product.name}
            width={220}
            height={220}
            className="size-full rounded-t-xl bg-white object-contain"
          />
        </Link>
      </CardHeader>

      <CardContent className="flex grow flex-col gap-3 p-3 md:gap-4 md:p-4">
        {/* Name */}
        <CardTitle>
          <Link href={product.slug} className="line-clamp-2">
            {product.name}
          </Link>
        </CardTitle>

        {/* Category */}
        {category ? <CardDescription className="line-clamp-1">{category}</CardDescription> : null}

        <div className="mt-auto flex items-center justify-between gap-1">
          {/* Price */}
          <div className="line-clamp-1">
            {formatCurrency(product.real_price)}
            <sup>₫</sup>
          </div>
          {/* Rating */}
          {product.rating_average > 0 && product.review_count > 0 ? (
            <div className="hidden items-center gap-1 md:flex">
              <StarIcon className="size-4 fill-yellow-500 text-yellow-500" />
              {product.rating_average.toFixed(1)}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
