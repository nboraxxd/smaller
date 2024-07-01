'use client'

import Link from 'next/link'

// authRequired = undefined: always show
// authRequired = false: only show when user is not authenticated
// authRequired = true: only show when user is authenticated
const items = [
  {
    title: 'Sản phẩm',
    href: '/products',
  },
  {
    title: 'Laptop',
    href: '/laptop',
  },
  {
    title: 'Điện thoại',
    href: '/phone',
  },
  {
    title: 'Tài khoản',
    href: '/user/profile',
  },
]

export default function NavLink({ className }: { className?: string }) {
  return items.map((item) => (
    <Link href={item.href} key={item.href} className={className}>
      {item.title}
    </Link>
  ))
}
