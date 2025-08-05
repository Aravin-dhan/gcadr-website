import { HeroSection } from '@/components/home/HeroSection'
import { ImageCarousel } from '@/components/home/ImageCarousel'
import { AnnouncementsSection } from '@/components/home/AnnouncementsSection'
import { NewsletterSection } from '@/components/home/NewsletterSection'

export default function HomePage() {
  return (
    <div className="pt-16 lg:pt-20">
      <HeroSection />
      <ImageCarousel />
      <AnnouncementsSection />
      <NewsletterSection />
    </div>
  )
}
