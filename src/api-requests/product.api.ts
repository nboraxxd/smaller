import http from '@/utils/http'
import { CategoriesResponse } from '@/types/product.type'

const PRODUCT_PREFIX = '/product'

const productApi = {
  // API OF BACKEND SERVER
  getCategoriesFromServerToBackend: () => http.get<CategoriesResponse>(`${PRODUCT_PREFIX}/categories`),

  // API OF NEXT.JS SERVER
}

export default productApi
