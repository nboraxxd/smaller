import { SearchParamsProps } from '@/types'
import ProductsTemplate from '../../products-template'

interface Props extends SearchParamsProps {
  params: {
    slug: string
    categoryId: string
  }
}

export default function CategoryPage({ searchParams, params: { categoryId } }: Props) {
  return <ProductsTemplate searchParams={searchParams} categoryId={categoryId} />
}
