import { Metadata } from 'next'
import { AboutHero } from '@/components/about/AboutHero'
import { MissionVision } from '@/components/about/MissionVision'


export const metadata: Metadata = {
  title: 'About Us - GCADR',
  description: 'Learn about the GNLU Centre for Alternative Dispute Resolution, our mission, vision, history, and the dedicated team advancing ADR education and research.',
  keywords: ['About GCADR', 'ADR Centre', 'GNLU', 'Alternative Dispute Resolution', 'Team', 'Mission', 'Vision'],
}

export default function AboutPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <AboutHero />
      <MissionVision />
    </div>
  )
}
