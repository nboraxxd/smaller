export type TokenPayload = {
  _id: string
  username: string
  iat: number
  exp: number
}

export type MessageResponse = {
  message: string
}
