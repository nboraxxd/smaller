import Link from 'next/link'
import { MenuIcon, SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SmallerIcon } from '@/components/icons'
import { NavButton, NavLink } from '@/app/(public)/_components'

export default function Homepage({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-header-height items-center gap-4 border-b bg-background px-4 max-md:justify-between md:px-6">
        <Link href="/" className="order-2 md:order-1">
          <SmallerIcon className="size-8" />
          <span className="sr-only">Smaller</span>
        </Link>

        {/* Nav on desktop */}
        <nav className="order-1 hidden flex-col gap-6 text-lg font-medium md:ml-10 md:flex md:flex-row md:items-center md:text-sm lg:ml-32">
          <NavLink className="shrink-0 text-muted-foreground transition-colors hover:text-foreground" />
        </nav>

        {/* Nav on mobile */}
        <div className="flex gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="size-5" />
                <span className="sr-only">Mở menu điều hướng</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/">
                  <SmallerIcon className="size-7" />
                  <span className="sr-only">Smaller</span>
                </Link>
                <NavLink className="text-muted-foreground transition-colors hover:text-foreground" />
              </nav>
            </SheetContent>
          </Sheet>
          <Button variant="ghost" size="icon" className="md:hidden">
            <SearchIcon className="size-5" />
            <span className="sr-only">Tìm kiếm</span>
          </Button>
        </div>

        <div className="order-3 flex items-center gap-4 md:ml-auto">
          <NavButton />
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 px-4 md:gap-8 md:px-8">{children}</main>
    </div>
  )
}
