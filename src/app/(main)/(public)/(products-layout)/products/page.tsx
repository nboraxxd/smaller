import { SearchParamsProps } from '@/types'
import ProductsTemplate from '../products-template'

export default function ProductsPage({ searchParams }: SearchParamsProps) {
  return <ProductsTemplate searchParams={searchParams} />
}
