import Image from 'next/image'
import { redirect } from 'next/navigation'

import { extractProductId } from '@/utils'
import productApi from '@/api-requests/product.api'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

export default async function ProductDetailPage({ params: { slug } }: { params: { slug: string } }) {
  const productId = extractProductId(slug)

  if (!productId) redirect('/products')

  const productResponse = await productApi.getProductDetailFromServerToBackend(productId)
  console.log('🔥 ~ ProductDetailPage ~ product:', productResponse.payload.data.images)

  return (
    <main className="container pt-8 sm:px-6 md:pt-12 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-start gap-6 md:grid-cols-2 lg:gap-12">
        <div className="grid items-start gap-4 md:gap-10">
          <div className="grid gap-4">
            <Carousel className="w-full">
              <CarouselContent>
                {productResponse.payload.data.images.map((images, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Image
                        src={images.medium_url}
                        width={300}
                        height={300}
                        alt="Product image"
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="hidden flex-1 items-start gap-4 overflow-hidden md:flex">
              {productResponse.payload.data.images.map((image, index) => (
                <button
                  key={index}
                  className="overflow-hidden rounded-lg border transition-colors hover:border-primary"
                >
                  <Image
                    src={image.thumbnail_url}
                    alt="Preview thumbnail"
                    width={100}
                    height={120}
                    className="aspect-[5/6] object-cover"
                  />
                  <span className="sr-only">View Image {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <h1>{productResponse.payload.data.name}</h1>
      </div>
    </main>
  )
}
