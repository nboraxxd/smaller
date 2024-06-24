export const SortOptions = {
  PRICE_DESC: 'real_price.desc',
  PRICE_ASC: 'real_price.asc',
  DISCOUNT_DESC: 'discount_rate.desc',
  RATING_DESC: 'rating_average.desc',
  TOP_SELL: 'top_sell',
  NEWEST: 'newest',
} as const

export const productListQueryFields =
  'name,real_price,categories,slug,id,images,rating_average,review_count,discount_rate,configurable_products'

export const productErrorImages = [
  'https://salt.tikicdn.com/assets/img/image.svg',
  'https://salt.tikicdn.com/cache/w300/media/catalog/producthttp://img11.joybuy.com/N0/s900x900_g10/M00/00/09/rBEQWFD-WsUIAAAAAADys29bRvUAAADlQC4eC8AAPLL793.jpg',
]
