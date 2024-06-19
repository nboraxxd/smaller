import Link from 'next/link'
import { Menu } from 'lucide-react'

import { NavItems } from '@/app/(public)/_components'
import { SmallerIcon } from '@/components/icons'
import { ModeToggle, DropdownAvatar } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function Homepage({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-header-height items-center gap-4 border-b bg-background px-4 md:px-6">
        {/* Nav on desktop */}
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link href="/">
            <SmallerIcon className="size-8" />
            <span className="sr-only">Smaller</span>
          </Link>
          <NavItems className="shrink-0 text-muted-foreground transition-colors hover:text-foreground" />
        </nav>

        {/* Nav on mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/">
                <SmallerIcon className="size-7" />
                <span className="sr-only">Smaller</span>
              </Link>

              <NavItems className="text-muted-foreground transition-colors hover:text-foreground" />
            </nav>
          </SheetContent>
        </Sheet>

        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />
          <DropdownAvatar />
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 px-4 md:gap-8 md:px-8">{children}</main>
    </div>
  )
}
