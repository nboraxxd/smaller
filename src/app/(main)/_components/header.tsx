import Link from 'next/link'
import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Search } from '@/components/common'
import { SmallerIcon } from '@/components/icons'
import { NavButton, NavLink } from '@/app/(main)/_components'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-header-height border-b bg-background">
      <div className="container flex h-full items-center justify-between gap-4 sm:px-6 lg:px-8">
        <Link href="/" className="order-2 md:order-1">
          <SmallerIcon className="size-8" />
          <span className="sr-only">Smaller</span>
        </Link>
        {/* Nav on desktop */}
        <nav className="hidden md:order-2 md:ml-10 md:flex md:flex-row md:items-center md:gap-6 md:text-sm md:font-medium lg:ml-32">
          <NavLink className="shrink-0 text-muted-foreground transition-colors hover:text-foreground" />
        </nav>
        {/* Nav on mobile */}
        <div className="flex gap-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="size-5" />
                <span className="sr-only">Menu điều hướng</span>
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
          <Search />
        </div>
        <div className="order-3 flex items-center gap-4 md:ml-auto">
          <NavButton />
        </div>
      </div>
    </header>
  )
}
