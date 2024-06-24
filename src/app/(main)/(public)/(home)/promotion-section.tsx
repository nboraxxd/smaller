import Image from 'next/image'

export default function PromotionSection() {
  return (
    <section className="pb-16 lg:pb-24">
      <div className="overflow-hidden pt-32 sm:pt-14">
        <div className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative pb-16 pt-48 sm:pb-24">
              <div>
                <h2 id="sale-heading" className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                  Final Stock.
                  <br />
                  Up to 50% off.
                </h2>
                <div className="mt-6 text-base">
                  <a href="#" className="font-semibold text-white">
                    Shop the sale
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>

              <div className="absolute -top-32 left-1/2 -translate-x-1/2 sm:top-6 sm:translate-x-0">
                <div className="ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8">
                  <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                    <div className="shrink-0">
                      <Image
                        className="size-64 rounded-lg object-cover md:size-72"
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg"
                        height={288}
                        width={288}
                        alt=""
                      />
                    </div>

                    <div className="mt-6 shrink-0 sm:mt-0">
                      <Image
                        className="size-64 rounded-lg object-cover md:size-72"
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg"
                        height={288}
                        width={288}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                    <div className="shrink-0">
                      <Image
                        className="size-64 rounded-lg object-cover md:size-72"
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg"
                        height={288}
                        width={288}
                        alt=""
                      />
                    </div>

                    <div className="mt-6 shrink-0 sm:mt-0">
                      <Image
                        className="size-64 rounded-lg object-cover md:size-72"
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg"
                        height={288}
                        width={288}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                    <div className="shrink-0">
                      <Image
                        className="size-64 rounded-lg object-cover md:size-72"
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg"
                        height={288}
                        width={288}
                        alt=""
                      />
                    </div>

                    <div className="mt-6 shrink-0 sm:mt-0">
                      <Image
                        className="size-64 rounded-lg object-cover md:size-72"
                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg"
                        height={288}
                        width={288}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
