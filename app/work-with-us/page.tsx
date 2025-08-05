import { Metadata } from 'next'
import { WorkWithUsHero } from '@/components/work-with-us/WorkWithUsHero'
import Link from 'next/link'
import { ArrowRight, Users, BookOpen, Handshake } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Work With Us - GCADR',
  description: 'Explore opportunities to work with GCADR through internships, research assistantships, and collaborations.',
  keywords: ['GCADR Internship', 'Research Assistantship', 'ADR Opportunities', 'GNLU Collaboration'],
}

export default function WorkWithUsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <WorkWithUsHero />

      {/* Opportunities Overview */}
      <section className="py-16 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Opportunities at GCADR
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              Join our mission to advance alternative dispute resolution through various pathways
              designed for students, researchers, and institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Internships Card */}
            <div className="bg-primary-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-4">Internships</h3>
              <p className="text-secondary-600 mb-6">
                Gain hands-on experience in alternative dispute resolution, legal research,
                and practical ADR applications.
              </p>
              <Link
                href="/work-with-us/internships"
                className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Research Assistantship Card */}
            <div className="bg-accent-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent-600 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-4">Research Assistantship</h3>
              <p className="text-secondary-600 mb-6">
                Contribute to cutting-edge research in ADR, assist with publications,
                and advance your academic career.
              </p>
              <Link
                href="/work-with-us/research"
                className="inline-flex items-center text-accent-600 font-semibold hover:text-accent-700 transition-colors"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Collaborations Card */}
            <div className="bg-secondary-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-secondary-600 rounded-lg flex items-center justify-center mb-6">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-4">Collaborations</h3>
              <p className="text-secondary-600 mb-6">
                Partner with GCADR for research collaborations, joint programs,
                and institutional partnerships.
              </p>
              <Link
                href="/work-with-us/collaborations"
                className="inline-flex items-center text-secondary-600 font-semibold hover:text-secondary-700 transition-colors"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
