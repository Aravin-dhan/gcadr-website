import { Metadata } from 'next'
import { LeadershipHero } from '@/components/about/LeadershipHero'
import { LeadershipGrid } from '@/components/about/LeadershipGrid'

export const metadata: Metadata = {
  title: 'Leadership - GCADR',
  description: 'Meet the distinguished leadership team of the GNLU Centre for Alternative Dispute Resolution.',
  keywords: ['GCADR Leadership', 'Prof. Vikas Gandhi', 'ADR Faculty', 'GNLU Faculty'],
}

export default function LeadershipPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <LeadershipHero />
      <LeadershipGrid />
    </div>
  )
}
