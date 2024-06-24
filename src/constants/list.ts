import { SortOptions } from '@/constants'

export const PRODUCTS_SORT = [
  { name: 'Mới nhất', value: SortOptions.NEWEST },
  { name: 'Bán chạy', value: SortOptions.TOP_SELL },
  { name: 'Đánh giá tốt', value: SortOptions.RATING_DESC },
  { name: 'Giảm nhiều nhất', value: SortOptions.DISCOUNT_DESC },
  { name: 'Giá giảm dần', value: SortOptions.PRICE_DESC },
  { name: 'Giá tăng dần', value: SortOptions.PRICE_ASC },
] as const

export const CATEGORIES_IMAGE = [
  {
    id: 1789,
    image: '/images/categories/5ff8037c36eb321988e59fb1.png',
  },
  {
    id: 4221,
    image: '/images/categories/5ff8037c36eb321988e59fb2.png',
  },
  {
    id: 1815,
    image: '/images/categories/5ff8037c36eb321988e59fb3.png',
  },
  {
    id: 1846,
    image: '/images/categories/5ff8037c36eb321988e59fb4.png',
  },
  {
    id: 1801,
    image: '/images/categories/5ff8037c36eb321988e59fb5.png',
  },
  {
    id: 1882,
    image: '/images/categories/5ff8037c36eb321988e59fb6.png',
  },
  {
    id: 1883,
    image: '/images/categories/5ff8037c36eb321988e59fb7.png',
  },
  {
    id: 4384,
    image: '/images/categories/5ff8037c36eb321988e59fb8.png',
  },
  {
    id: 2549,
    image: '/images/categories/5ff8037c36eb321988e59fb9.png',
  },
  {
    id: 1520,
    image: '/images/categories/5ff8037c36eb321988e59fba.png',
  },
  {
    id: 1975,
    image: '/images/categories/5ff8037c36eb321988e59fbb.png',
  },
  {
    id: 8594,
    image: '/images/categories/5ff8037c36eb321988e59fbc.png',
  },
  {
    id: 17166,
    image: '/images/categories/5ff8037c36eb321988e59fbd.png',
  },
  {
    id: 8322,
    image: '/images/categories/5ff8037c36eb321988e59fbe.png',
  },
  {
    id: 11312,
    image: '/images/categories/5ff8037c36eb321988e59fbf.png',
  },
] as const
