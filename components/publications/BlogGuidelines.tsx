'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function BlogGuidelines() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          
          {/* Single Unified Guidelines Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">GALR Blog Submission Guidelines</h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-200 space-y-6">
              
              <div>
                <p className="text-lg leading-relaxed mb-4">
                  The GNLU Centre for Alternate Dispute Resolution accepts submissions for the GALR Blog from academicians, 
                  legal practitioners, research scholars and students. We welcome guest submissions on any topic under the Blog's theme.
                </p>
                <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                  The theme of the Blog is Alternate Dispute Resolution (ADR) Mechanisms.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Points to Note</h3>
                <ul className="space-y-2">
                  <li>• Co-authorship for the manuscripts is permissible. However, the number of co-authors must not exceed two.</li>
                  <li>• The manuscripts should be an original work of the authors. If found plagiarised, we will not be able to publish it.</li>
                  <li>• We accept articles only in English.</li>
                  <li>• Analytical posts are preferred over descriptive ones. Posts will be considered for publication based on various factors including relevance, quality, structure, logic and writing-style.</li>
                  <li>• Cross-posting is allowed only with the permission of the Editors. Moreover, this is subject to the condition that the cross-posting prominently carries wording to the effect that the material was "first published on the [•] Blog".</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contribution Guidelines</h3>
                <p className="mb-4">We invite submissions in the following categories:</p>
                <ul className="space-y-2">
                  <li><strong>Articles and Essays:</strong> Comments on recent legal advancements in alternative dispute resolution both within India and on a global scale.</li>
                  <li><strong>Article Reviews/Reactions:</strong> Reactions to articles previously published on the GALR Blog.</li>
                  <li><strong>Case Notes:</strong> Analysing recent Supreme Court and High Court judgements. Submissions relating to developments in other jurisdictions are also acceptable provided they have some relation to developments in India.</li>
                  <li><strong>Book Reviews:</strong> Reviews of books related to alternative dispute resolution.</li>
                </ul>
                <p className="text-sm italic mt-4">
                  The list specified above is not exhaustive and we welcome additional suggestions provided they align with the theme of the blog.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Submission Requirements</h3>
                <p className="font-medium mb-4">
                  All submissions for the blog must be between <span className="text-primary-600 dark:text-primary-400 font-bold">1500-2000 words</span> inclusive of footnotes, if any.
                </p>
                <ul className="space-y-2">
                  <li>• All the sources must be provided by way of <strong>hyperlinks, and not footnotes</strong>.</li>
                  <li>• If the author wishes to use footnotes, they must follow the OSCOLA format.</li>
                  <li>• The author must provide a brief bio (not exceeding 50 words) along with the submission.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Formatting Requirements</h3>
                <ul className="space-y-2">
                  <li>• <strong>Font:</strong> Times New Roman</li>
                  <li>• <strong>Font Size:</strong> 12</li>
                  <li>• <strong>Line Spacing:</strong> 1.5</li>
                  <li>• <strong>Alignment:</strong> Justified</li>
                  <li>• <strong>Margins:</strong> 1 inch on all sides</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">General Guidelines</h3>
                <ul className="space-y-2">
                  <li>• The title of the submission should not exceed 15 words.</li>
                  <li>• The author must provide a brief bio (not exceeding 50 words) along with the submission.</li>
                  <li>• The author must provide 3-5 keywords for the submission.</li>
                  <li>• All submissions must be original and unpublished.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Submission Process</h3>
                <p className="mb-4">
                  All submissions should be sent to <strong>gcadr@gnlu.ac.in</strong> with the subject line "GALR Blog Submission".
                </p>
                <ul className="space-y-2">
                  <li>• Submissions should be in Microsoft Word format (.doc or .docx).</li>
                  <li>• Include your full name, institutional affiliation, and contact details.</li>
                  <li>• Submissions will be acknowledged within 48 hours of receipt.</li>
                  <li>• The editorial team reserves the right to edit submissions for clarity and length.</li>
                </ul>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
