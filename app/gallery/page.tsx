import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery - GCADR',
  description: 'Photo gallery showcasing GCADR events, workshops, conferences, and activities.',
  keywords: ['GCADR Gallery', 'Event Photos', 'Workshop Images', 'Conference Pictures'],
}

export default function GalleryPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-dark-bg text-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-1 mb-6 text-yellow-400">Gallery</h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-max section-padding">
          <div className="max-w-6xl mx-auto">

            {/* Gallery Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Sample Gallery Items */}
              <div className="card dark:bg-dark-card dark:border-dark-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-primary-600 dark:text-primary-400">Workshop Photos</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-2">ADR Workshops</h3>
                  <p className="text-gray-600 dark:text-dark-muted text-sm">
                    Photos from our hands-on ADR training workshops and seminars.
                  </p>
                </div>
              </div>

              <div className="card dark:bg-dark-card dark:border-dark-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-accent-100 to-secondary-100 dark:from-accent-900/30 dark:to-secondary-900/30 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-accent-600 dark:text-accent-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-sm text-accent-600 dark:text-accent-400">Conference Photos</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-2">Conferences</h3>
                  <p className="text-gray-600 dark:text-dark-muted text-sm">
                    Memorable moments from our conferences and panel discussions.
                  </p>
                </div>
              </div>

              <div className="card dark:bg-dark-card dark:border-dark-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-secondary-100 to-primary-100 dark:from-secondary-900/30 dark:to-primary-900/30 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-secondary-600 dark:text-secondary-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">Team Activities</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-2">Team Activities</h3>
                  <p className="text-gray-600 dark:text-dark-muted text-sm">
                    Behind-the-scenes moments and team building activities.
                  </p>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-12 text-center">
              <div className="card dark:bg-dark-card dark:border-dark-border p-6 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                <p className="text-gray-600 dark:text-dark-muted">
                  Gallery collections are managed through our content management system and will be updated regularly with new events and activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
