import { Metadata } from 'next'
import { ContactHero } from '@/components/contact/ContactHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { LocationMap } from '@/components/contact/LocationMap'

export const metadata: Metadata = {
  title: 'Contact Us - GCADR',
  description: 'Get in touch with the GNLU Centre for Alternative Dispute Resolution. Find our contact information, location, and send us a message.',
  keywords: ['Contact GCADR', 'GNLU Location', 'ADR Centre Contact', 'Gujarat National Law University'],
}

export default function ContactPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <ContactHero />
      <div className="grid lg:grid-cols-2">
        <ContactForm />
        <ContactInfo />
      </div>
      <LocationMap />
    </div>
  )
}
