import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Annual Arbitration Week - GCADR',
  description: 'Join us for the Annual Arbitration Week - a comprehensive program featuring workshops, seminars, and competitions in arbitration and ADR.',
  keywords: ['Arbitration Week', 'ADR Events', 'Legal Workshops', 'Arbitration Competition', 'GCADR Events'],
}

export default function ArbitrationWeekPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-gray-900 text-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-1 mb-6 text-primary-300">Annual Arbitration Week</h1>
            <p className="text-xl text-primary-200 leading-relaxed mb-8">
              A comprehensive week-long program featuring workshops, seminars, competitions, and networking opportunities in the field of arbitration and alternative dispute resolution.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
              <p className="text-2xl font-bold text-primary-300">Coming Soon</p>
              <p className="text-primary-200">Details will be announced shortly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            
            {/* About the Event */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About Arbitration Week</h2>
              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-200">
                <p className="mb-4">
                  The Annual Arbitration Week is GCADR's flagship event, bringing together legal professionals, 
                  academics, students, and practitioners from across the country to explore the latest developments 
                  in arbitration and alternative dispute resolution.
                </p>
                <p className="mb-4">
                  This comprehensive program features a diverse range of activities designed to enhance knowledge, 
                  skills, and networking opportunities in the ADR field.
                </p>
              </div>
            </div>

            {/* Program Highlights */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12 mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Program Highlights</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Expert Workshops</h4>
                    <p className="text-gray-700 dark:text-gray-200">Hands-on sessions led by renowned arbitration practitioners</p>
                  </div>
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Academic Seminars</h4>
                    <p className="text-gray-700 dark:text-gray-200">In-depth discussions on current arbitration trends and challenges</p>
                  </div>
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Moot Court Competition</h4>
                    <p className="text-gray-700 dark:text-gray-200">Inter-university arbitration competition for students</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Panel Discussions</h4>
                    <p className="text-gray-700 dark:text-gray-200">Interactive sessions with industry leaders and experts</p>
                  </div>
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Networking Events</h4>
                    <p className="text-gray-700 dark:text-gray-200">Opportunities to connect with professionals and peers</p>
                  </div>
                  <div className="border-l-4 border-accent-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Certificate Programs</h4>
                    <p className="text-gray-700 dark:text-gray-200">Professional development certificates for participants</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Who Should Attend */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12 mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Who Should Attend</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👨‍💼</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Legal Practitioners</h4>
                  <p className="text-gray-700 dark:text-gray-200 text-sm">Lawyers, arbitrators, and mediators</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Academics & Students</h4>
                  <p className="text-gray-700 dark:text-gray-200 text-sm">Law faculty and students interested in ADR</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Corporate Professionals</h4>
                  <p className="text-gray-700 dark:text-gray-200 text-sm">In-house counsel and business executives</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Stay Updated</h3>
              <div className="text-center">
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  For updates on dates, registration, and program details, please contact us or follow our announcements.
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700 dark:text-gray-200">
                    <strong>Email:</strong> gcadr@gnlu.ac.in
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">
                    <strong>Phone:</strong> +91-79-23276611
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
