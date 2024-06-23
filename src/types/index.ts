export type TokenPayload = {
  _id: string
  username: string
  iat: number
  exp: number
}

export type MessageResponse = {
  message: string
}

export type Paginate = {
  currentPage: number | null
  totalPage: number
  count: number
  perPage: number
}
