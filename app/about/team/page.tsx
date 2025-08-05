import { Metadata } from 'next'
import { TeamHero } from '@/components/about/TeamHero'
import { TeamGrid } from '@/components/about/TeamGrid'

export const metadata: Metadata = {
  title: 'Our Team - GCADR',
  description: 'Meet the dedicated student team of the GNLU Centre for Alternative Dispute Resolution.',
  keywords: ['GCADR Team', 'Student Team', 'ADR Students', 'GNLU Students'],
}

export default function TeamPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <TeamHero />
      <TeamGrid />
    </div>
  )
}
