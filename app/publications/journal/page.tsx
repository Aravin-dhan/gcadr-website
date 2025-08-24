import { Metadata } from 'next'
import { JournalHero } from '@/components/publications/JournalHero'
import JournalContent from '@/components/publications/JournalContent'
import { JournalSubmissionCTA } from '@/components/publications/JournalSubmissionCTA'

export const metadata: Metadata = {
  title: 'GALR Journal - GCADR',
  description: 'The Gujarat ADR Law Review Journal - A premier academic publication on Alternative Dispute Resolution.',
  keywords: ['GALR Journal', 'ADR Journal', 'Legal Journal', 'Alternative Dispute Resolution', 'Academic Publication'],
}

export default function JournalPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <JournalHero />
      <JournalContent />
      <JournalSubmissionCTA />
    </div>
  )
}
