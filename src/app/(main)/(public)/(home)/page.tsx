import HeroSection from './hero-section'
import CategoriesSection from './categories-section'
import PromotionSection from './featured-section'

export default function Homepage() {
  return (
    <>
      <HeroSection />

      <div className="container pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <CategoriesSection />
      </div>
      <PromotionSection />
    </>
  )
}
