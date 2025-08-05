'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, Download, ExternalLink } from 'lucide-react'

export function JournalContent() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-dark-surface">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          
          {/* About the Journal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="card dark:bg-dark-card dark:border-dark-border p-8 mb-12"
          >
            <h2 className="heading-2 mb-6 dark:text-dark-text">About GALR Journal</h2>
            <div className="space-y-4 text-gray-600 dark:text-dark-muted">
              <p>
                The Gujarat ADR Law Review (GALR) Journal is a premier academic publication dedicated to advancing 
                scholarship in Alternative Dispute Resolution. Our peer-reviewed journal publishes high-quality 
                research articles, case studies, and commentary from leading academics and practitioners.
              </p>
              <p>
                GALR Journal serves as a platform for scholarly discourse on contemporary issues in arbitration, 
                mediation, conciliation, and other forms of alternative dispute resolution, with a particular focus 
                on developments in Indian and international ADR law and practice.
              </p>
            </div>
          </motion.div>

          {/* Journal Archive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="card dark:bg-dark-card dark:border-dark-border p-8 mb-12"
          >
            <h2 className="heading-2 mb-6 dark:text-dark-text">Journal Archive</h2>
            <p className="text-gray-600 dark:text-dark-muted mb-8">
              Access past issues of the Gujarat ADR Law Review Journal. All volumes are available for download in PDF format.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Volume 1, Issue 1 */}
              <div className="border border-gray-200 dark:border-dark-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <BookOpen className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-text">Volume 1, Issue 1</h3>
                    <p className="text-sm text-gray-500 dark:text-dark-muted">January 2024</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-dark-muted text-sm mb-4">
                  Inaugural issue featuring foundational articles on ADR in India.
                </p>
                <a
                  href="/journals/galr-v1-i1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </a>
              </div>

              {/* Volume 1, Issue 2 */}
              <div className="border border-gray-200 dark:border-dark-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <BookOpen className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-text">Volume 1, Issue 2</h3>
                    <p className="text-sm text-gray-500 dark:text-dark-muted">June 2024</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-dark-muted text-sm mb-4">
                  Special issue on international arbitration and cross-border disputes.
                </p>
                <a
                  href="/journals/galr-v1-i2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </a>
              </div>

              {/* Volume 2, Issue 1 */}
              <div className="border border-gray-200 dark:border-dark-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <BookOpen className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-text">Volume 2, Issue 1</h3>
                    <p className="text-sm text-gray-500 dark:text-dark-muted">January 2025</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-dark-muted text-sm mb-4">
                  Latest research on mediation practices and emerging ADR trends.
                </p>
                <a
                  href="/journals/galr-v2-i1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </a>
              </div>
            </div>


          </motion.div>

          {/* Submission Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card dark:bg-dark-card dark:border-dark-border p-8 mb-12"
          >
            <h2 className="heading-3 mb-6 dark:text-dark-text">Submission Guidelines</h2>
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-dark-text font-medium">
                Kindly note that all submissions made to the GCADR Journal must mandatorily comply with the following guidelines:
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-gray-700 dark:text-dark-text">
                    The maximum number of authors for each submission shall be 2.
                  </p>
                </div>

                <div className="flex items-start">
                  <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-gray-700 dark:text-dark-text">
                    All submissions must be accompanied by a 250-word abstract and 5-8 keywords.
                  </p>
                </div>

                <div className="flex items-start">
                  <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-gray-700 dark:text-dark-text">
                    Footnotes are to be in accordance with the BlueBook (20th edition).
                  </p>
                </div>

                <div className="flex items-start">
                  <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="text-gray-700 dark:text-dark-text">
                    <p className="mb-2">The submissions must be in compliance with the following formatting requirements:</p>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg ml-4">
                      <p className="text-gray-800 dark:text-gray-200"><strong>Body of the Submission:</strong> Times New Roman, Font Size 12, 1.5 Line Spacing, Justified Alignment and 1-inch margins on each side.</p>
                      <p className="text-gray-800 dark:text-gray-200"><strong>Footnotes:</strong> Times New Roman, Font Size 10 and Single Line Spacing.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-gray-700 dark:text-dark-text">
                    Authors must ensure that the submissions are original works. All submissions will be thoroughly scrutinised for plagiarism and the finding of any plagiarised content will lead to the submission being directly rejected. Further, the decision of the Editorial Board shall be final in this regard.
                  </p>
                </div>

                <div className="flex items-start">
                  <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-gray-700 dark:text-dark-text">
                    The submissions must not contain any information which may lead to the identification of the author/authors. Information such as the name of the author/authors, contact details, designation and institutional affiliation must be provided separately in the cover email for the submission.
                  </p>
                </div>

                <div className="flex items-start">
                  <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-gray-700 dark:text-dark-text">
                    Any information leading to the identification of the author/authors, if found, shall result in the submission being rejected. Further, the decision of the Editorial Board shall be final in this regard.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Editorial Board */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="card dark:bg-dark-card dark:border-dark-border p-8"
          >
            <h2 className="heading-3 mb-6 dark:text-dark-text">Editorial Board</h2>
            <div className="space-y-4 text-gray-600 dark:text-dark-muted">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-dark-text">Editor-in-Chief</h4>
                <p>Prof. (Dr.) Vikas Gandhi, Faculty Convenor, GCADR</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-dark-text">Student Editorial Team</h4>
                <p>Led by the GCADR student team with expertise in ADR research and publication</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-dark-text">Advisory Board</h4>
                <p>Distinguished academics and practitioners in the field of Alternative Dispute Resolution</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
