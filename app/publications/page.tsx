import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Publications - GCADR',
  description: 'Explore GCADR publications including GALR Blog and GALR Journal. Access our latest research and insights on Alternative Dispute Resolution.',
  keywords: ['GCADR Publications', 'GALR Blog', 'GALR Journal', 'ADR Research', 'Legal Publications'],
}

export default function PublicationsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-secondary-600 via-secondary-700 to-secondary-800 dark:from-secondary-800 dark:via-secondary-900 dark:to-dark-bg text-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Publications</h1>
            <p className="text-xl text-secondary-100 leading-relaxed">
              Explore our research, insights, and commentary on Alternative Dispute Resolution through our publications.
            </p>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-max section-padding">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* GALR Blog */}
            <div className="card dark:bg-dark-card dark:border-dark-border p-8 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h2 className="heading-3 mb-4 dark:text-dark-text">GALR Blog</h2>
                <p className="text-gray-600 dark:text-dark-muted mb-6">
                  Read insightful articles, case studies, and expert opinions on Alternative Dispute Resolution from our community.
                </p>
                <Link href="/publications/blog" className="btn-primary">
                  Read Blog
                </Link>
              </div>
            </div>

            {/* GALR Journal */}
            <div className="card dark:bg-dark-card dark:border-dark-border p-8 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="heading-3 mb-4 dark:text-dark-text">GALR Journal</h2>
                <p className="text-gray-600 dark:text-dark-muted mb-6">
                  Access peer-reviewed academic articles and research papers on Alternative Dispute Resolution.
                </p>
                <Link href="/publications/journal" className="btn-primary">
                  View Journal
                </Link>
              </div>
            </div>
          </div>

          {/* Submission Guidelines */}
          <div className="max-w-2xl mx-auto mt-12">
            <div className="card dark:bg-dark-card dark:border-dark-border p-8 text-center bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
              <h3 className="heading-3 mb-4 dark:text-dark-text">Contribute to Our Publications</h3>
              <p className="text-gray-600 dark:text-dark-muted mb-6">
                We welcome contributions from students, faculty, and practitioners in the field of Alternative Dispute Resolution.
              </p>
              <Link href="/submissions" className="btn-secondary">
                View Submission Guidelines
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
