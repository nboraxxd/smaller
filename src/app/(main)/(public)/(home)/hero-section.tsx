import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero.avif"
          alt="Hình ảnh của người phụ nữ cầm túi giấy trắng và đen"
          className="size-full object-cover object-center"
          width={1920}
          height={1280}
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gray-900 opacity-50" />
      <div className="flex">
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">Xu hướng mới</h1>
          <p className="mt-4 text-balance text-xl text-white">
            Cập nhật xu hướng mới nhất từ các nhà thiết kế hàng đầu thế giới.
          </p>
          <Button
            asChild
            className="mt-8 h-10 bg-white
          px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            <Link href="/products" className="">
              Xem sản phẩm mới
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
