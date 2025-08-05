import { Metadata } from 'next'
import { CollaborationSection } from '@/components/work-with-us/CollaborationSection'

export const metadata: Metadata = {
  title: 'Collaborations - GCADR',
  description: 'Partner with GCADR for research collaborations, joint programs, and institutional partnerships.',
  keywords: ['GCADR Collaboration', 'Research Partnership', 'Institutional Partnership', 'ADR Collaboration'],
}

export default function CollaborationsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <div className="bg-primary-700 text-white py-16">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Collaborations & Partnerships
            </h1>
            <p className="text-xl text-accent-200">
              Partner with GCADR to advance alternative dispute resolution through 
              research, education, and institutional collaboration.
            </p>
          </div>
        </div>
      </div>
      <CollaborationSection />
    </div>
  )
}
