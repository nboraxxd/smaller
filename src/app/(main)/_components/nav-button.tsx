'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ModeToggle, DropdownAvatar, Search } from '@/components/common'
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
      <div className="hidden md:block">
        <Search />
      </div>
      {isAuth ? (
        <>
          <Button asChild variant="ghost" size="icon" className="hidden md:inline-flex">
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
          <Button asChild variant="secondary" className="min-w-9 p-0 md:px-4 md:py-2">
            <Link href="/login">
              <UserIcon className="size-5 md:hidden" />
              <span className="hidden md:inline">Đăng nhập</span>
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
      <Button variant="ghost" size="icon" className="md:hidden">
        <ShoppingCartIcon className="size-5" />
        <span className="sr-only">Giỏ hàng</span>
      </Button>

      <Button variant="ghost" size="icon" className="hidden md:inline-flex">
        <SearchIcon className="size-5" />
        <span className="sr-only">Tìm kiếm</span>
      </Button>

      <Button variant="secondary" className="w-9 p-0 md:hidden">
        <UserIcon className="size-5" />
        <span className="sr-only">Tài khoản</span>
      </Button>
    </>
  )
}
