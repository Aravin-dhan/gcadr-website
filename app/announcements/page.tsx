import { Metadata } from 'next'
import { AnnouncementsPage } from '@/components/announcements/AnnouncementsPage'

export const metadata: Metadata = {
  title: 'Announcements | GCADR',
  description: 'Stay updated with the latest news, events, deadlines, and announcements from the Gujarat National Law University Centre for Alternative Dispute Resolution.',
  keywords: ['GCADR announcements', 'ADR news', 'legal events', 'arbitration updates', 'mediation news'],
}

export default function Announcements() {
  return <AnnouncementsPage />
}
