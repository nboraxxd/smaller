import HeroSection from './hero-section'
import CategoriesSection from './categories-section'
import PromotionSection from './promotion-section'
import BestSellerSection from './best-seller-section'

export default function Homepage() {
  return (
    <main>
      <HeroSection />
      <div className="container pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <CategoriesSection />

        <BestSellerSection />
      </div>
      <PromotionSection />
    </main>
  )
}
