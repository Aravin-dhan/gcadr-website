import { Metadata } from 'next'
import { InternshipSection } from '@/components/work-with-us/InternshipSection'

export const metadata: Metadata = {
  title: 'Internships - GCADR',
  description: 'Explore internship opportunities at GCADR. Gain hands-on experience in alternative dispute resolution.',
  keywords: ['GCADR Internship', 'ADR Internship', 'Law Internship', 'GNLU Internship'],
}

export default function InternshipsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <div className="bg-primary-700 text-white py-16">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Internship Opportunities
            </h1>
            <p className="text-xl text-accent-200">
              Join GCADR and gain valuable experience in alternative dispute resolution, 
              research, and legal practice.
            </p>
          </div>
        </div>
      </div>
      <InternshipSection />
    </div>
  )
}
