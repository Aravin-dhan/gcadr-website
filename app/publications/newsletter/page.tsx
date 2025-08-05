import { Metadata } from 'next'
import { NewsletterArchives } from '@/components/publications/NewsletterArchives'

export const metadata: Metadata = {
  title: 'Newsletter Archives | GCADR',
  description: 'Access past issues of the GCADR Newsletter featuring updates on ADR research, events, and developments.',
  keywords: ['GCADR Newsletter', 'ADR Newsletter', 'Newsletter Archives', 'Legal Newsletter'],
}

export default function NewsletterPage() {
  return <NewsletterArchives />
}
