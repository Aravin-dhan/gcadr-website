import { Metadata } from 'next'
import { BlogHero } from '@/components/publications/BlogHero'
import { BlogGrid } from '@/components/publications/BlogGrid'
import { BlogGuidelines } from '@/components/publications/BlogGuidelines'

export const metadata: Metadata = {
  title: 'GALR Blog - GCADR',
  description: 'Read the latest articles and insights on Alternative Dispute Resolution from the GALR Blog.',
  keywords: ['GALR Blog', 'ADR Articles', 'Alternative Dispute Resolution', 'Legal Blog', 'GCADR Publications'],
}

export default function BlogPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <BlogHero />
      <BlogGrid />
      <BlogGuidelines />
    </div>
  )
}
