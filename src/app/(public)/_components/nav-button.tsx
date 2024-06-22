'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ModeToggle, DropdownAvatar } from '@/components/common'
import { useAuthStore } from '@/lib/stores/auth-store'

export default function NavButton() {
  const [shouldRender, setShouldRender] = useState(false)

  const isAuth = useAuthStore((state) => state.isAuth)

  useEffect(() => {
    setShouldRender(true)
  }, [])

  if (!shouldRender) return <Substitude />

  return (
    <>
      <Button variant="ghost" size="icon" className="max-md:hidden">
        <SearchIcon className="size-5" />
        <span className="sr-only">Tìm kiếm</span>
      </Button>
      {isAuth ? (
        <>
          <Button asChild variant="ghost" size="icon" className="max-sm:hidden">
            <Link href="/">
              <HeartIcon className="size-5" />
              <span className="sr-only">Yêu thích</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link href="/">
              <ShoppingCartIcon className="size-5" />
              <span className="sr-only">Giỏ hàng</span>
            </Link>
          </Button>
          <DropdownAvatar />
        </>
      ) : (
        <>
          <ModeToggle />
          <Button asChild variant="secondary" className="max-sm:w-9 max-sm:p-0">
            <Link href="/login">
              <UserIcon className="size-5 sm:hidden" />
              <span className="max-sm:hidden">Đăng nhập</span>
            </Link>
          </Button>
        </>
      )}
    </>
  )
}

function Substitude() {
  return (
    <>
      <Button variant="ghost" size="icon" className="max-md:hidden">
        <SearchIcon className="size-5" />
        <span className="sr-only">Tìm kiếm</span>
      </Button>
      <Button variant="secondary" className="w-9 p-0">
        <UserIcon className="size-5" />
      </Button>
    </>
  )
}
