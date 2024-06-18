export type User = {
  _id: string
  username: string
  name: string
  avatar: string | null
  fb: string | null
  birthday: string | null
  gender: string | null
  phone: string | null
}

export type RegisterReqBody = {
  name: string
  username: string
  password: string
}

export type RegisterResponse = {
  success: boolean
  message: string
}

export type ResendEmailResponse = {
  message: string
}

export type UserResponse = {
  data: User
}
