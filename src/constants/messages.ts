export const VALIDATION_MESSAGES = {
  ERROR: 'VALIDATE:1',
} as const

export const AUTH_MESSAGES = {
  NAME_IS_REQUIRED: 'Tên không được để trống',
  EMAIL_INVALID: 'Email không hợp lệ',
  PASSWORD_INVALID: 'Mật khẩu phải từ 6 đến 32 ký tự',
  PASSWORD_NOT_MATCH: 'Mật khẩu không khớp',
} as const

export const PRICE_FILTER_MESSAGES = {
  PRICE_MUST_BE_POSITIVE_NUMBER: 'Giá phải là số dương',
  MAX_PRICE_GT_MIN_PRICE: 'Giá tối đa phải lớn hơn giá tối thiểu',
} as const
