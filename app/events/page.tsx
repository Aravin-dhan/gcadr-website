import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events & Activities - GCADR',
  description: 'Discover upcoming events, workshops, conferences, and activities organized by the GNLU Centre for Alternative Dispute Resolution.',
  keywords: ['GCADR Events', 'ADR Workshops', 'Legal Conferences', 'Arbitration Events', 'Mediation Training'],
}

export default function EventsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-dark-bg text-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-1 mb-6 text-accent-300">Events & Activities</h1>
            <p className="text-xl text-accent-200 leading-relaxed">
              Join us for workshops, conferences, seminars, and competitions that advance the field of Alternative Dispute Resolution.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-2 mb-8 text-center text-accent-300">Upcoming Events</h2>
            <div className="card dark:bg-dark-card dark:border-dark-border p-8 text-center">
              <p className="text-gray-600 dark:text-dark-muted mb-4">
                We regularly organize various events and activities to promote ADR education and practice.
              </p>
              <p className="text-gray-600 dark:text-dark-muted">
                Stay tuned for announcements about our upcoming workshops, conferences, and competitions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
