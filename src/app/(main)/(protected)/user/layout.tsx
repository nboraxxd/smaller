import Link from 'next/link'

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="container min-h-[calc(100vh-var(--header-height))] bg-muted/40 py-8 sm:px-6 md:pt-12 lg:px-8">
      <h1 className="sr-only">Tài khoản</h1>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr]">
        <nav className="flex gap-x-6 gap-y-4 overflow-x-auto pb-4 text-sm text-muted-foreground md:flex-col md:pb-0">
          <Link href="#" className="shrink-0 font-semibold text-primary">
            Quản lý tài khoản
          </Link>
          <Link href="#" className="shrink-0">
            Sổ địa chỉ
          </Link>
          <Link href="#" className="shrink-0">
            Thông tin thanh toán
          </Link>
          <Link href="#" className="shrink-0">
            Đơn hàng
          </Link>
          <Link href="#" className="shrink-0">
            Sản phẩm yêu thích
          </Link>
        </nav>
        <div className="grid gap-6">{children}</div>
      </div>
    </main>
  )
}
