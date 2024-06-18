import type { Metadata } from 'next'
import { Montserrat as FontSans } from 'next/font/google'

import { cn } from '@/utils'
import './globals.css'

const fontSans = FontSans({ subsets: ['vietnamese'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: {
    template: '%s | Smaller',
    default: 'Smaller - Mua sắm trực tuyến dễ dàng hơn',
  },
  description:
    'Tiện lợi mua sắm hàng triệu mặt hàng, dịch vụ. Vô vàn ưu đãi freeship, mã giảm giá. Hoàn tiền 111% nếu giả. Đổi trả miễn phí trong 30 ngày. Đặt mua ngay!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>{children}</body>
    </html>
  )
}
