'use client'

import Link from 'next/link'

// authRequired = undefined: always show
// authRequired = false: only show when user is not authenticated
// authRequired = true: only show when user is authenticated
const menuItems = [
  {
    title: 'Sản phẩm',
    href: '/product',
  },
  {
    title: 'Tài khoản',
    href: '/user',
    authRequired: true,
  },
  {
    title: 'Đăng nhập',
    href: '/login',
    authRequired: false,
  },
]

export default function NavItems({ className }: { className?: string }) {
  return menuItems.map((item) => (
    <Link href={item.href} key={item.href} className={className}>
      {item.title}
    </Link>
  ))
}
