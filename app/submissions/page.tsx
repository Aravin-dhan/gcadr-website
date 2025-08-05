import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submission Guidelines - GCADR',
  description: 'Guidelines for submitting articles to GALR Blog and GALR Journal. Learn about our submission process and requirements.',
  keywords: ['GALR Submissions', 'Article Guidelines', 'Blog Submissions', 'Journal Submissions'],
}

export default function SubmissionsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-secondary-600 via-secondary-700 to-secondary-800 dark:from-secondary-800 dark:via-secondary-900 dark:to-dark-bg text-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Submission Guidelines</h1>
            <p className="text-xl text-secondary-100 leading-relaxed">
              Guidelines for submitting articles to GALR Blog and GALR Journal.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* GALR Blog Guidelines */}
            <div className="card dark:bg-dark-card dark:border-dark-border p-8">
              <h2 className="heading-2 mb-6 dark:text-dark-text">GALR Blog Submissions</h2>
              <div className="space-y-4 text-gray-600 dark:text-dark-muted">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">Article Requirements:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Word limit: 800-1500 words</li>
                  <li>Original content related to Alternative Dispute Resolution</li>
                  <li>Proper citations and references</li>
                  <li>Author bio (50-100 words)</li>
                  <li>Professional tone and academic writing style</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mt-6">Submission Process:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Submit articles via email to gcadr@gnlu.ac.in</li>
                  <li>Include "GALR Blog Submission" in the subject line</li>
                  <li>Attach article in Word document format</li>
                  <li>Review process takes 2-3 weeks</li>
                </ul>
              </div>
            </div>

            {/* GALR Journal Guidelines */}
            <div className="card dark:bg-dark-card dark:border-dark-border p-8">
              <h2 className="heading-2 mb-6 dark:text-dark-text">GALR Journal Submissions</h2>
              <div className="space-y-4 text-gray-600 dark:text-dark-muted">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">Article Requirements:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Word limit: 3000-8000 words</li>
                  <li>Peer-reviewed academic articles</li>
                  <li>BlueBook citation format</li>
                  <li>Abstract (150-250 words)</li>
                  <li>Keywords (5-8 keywords)</li>
                  <li>Comprehensive bibliography</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mt-6">Submission Process:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Submit via email to gcadr@gnlu.ac.in</li>
                  <li>Include "GALR Journal Submission" in the subject line</li>
                  <li>Double-blind peer review process</li>
                  <li>Review process takes 6-8 weeks</li>
                  <li>Revisions may be requested</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card dark:bg-dark-card dark:border-dark-border p-8 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
              <h2 className="heading-3 mb-4 dark:text-dark-text">Questions?</h2>
              <p className="text-gray-600 dark:text-dark-muted mb-4">
                For any questions about submissions or the review process, please contact us:
              </p>
              <p className="text-primary-600 dark:text-primary-400 font-medium">
                Email: gcadr@gnlu.ac.in
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
