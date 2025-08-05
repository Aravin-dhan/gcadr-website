'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PenTool, FileText, Send } from 'lucide-react'
import Link from 'next/link'

export function BlogSubmissionCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-dark-bg text-white">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                <PenTool className="w-4 h-4 mr-2" />
                Contribute
              </div>
              
              <h2 className="heading-2">
                Share Your Insights
              </h2>
              
              <p className="text-xl text-primary-100 leading-relaxed max-w-3xl mx-auto">
                Have expertise in Alternative Dispute Resolution? We welcome contributions from students, 
                practitioners, and academics. Share your knowledge with our community.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <FileText className="w-8 h-8 mx-auto mb-4 text-accent-300" />
                <h3 className="text-lg font-semibold mb-2">Blog Articles</h3>
                <p className="text-sm text-primary-200 mb-4">
                  Share insights, analysis, and commentary on ADR topics
                </p>
                <ul className="text-xs text-primary-300 space-y-1">
                  <li>• 800-1500 words</li>
                  <li>• Original content</li>
                  <li>• Proper citations</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <PenTool className="w-8 h-8 mx-auto mb-4 text-accent-300" />
                <h3 className="text-lg font-semibold mb-2">Case Studies</h3>
                <p className="text-sm text-primary-200 mb-4">
                  Document real-world applications and practical examples
                </p>
                <ul className="text-xs text-primary-300 space-y-1">
                  <li>• Detailed analysis</li>
                  <li>• Lessons learned</li>
                  <li>• Anonymized data</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Send className="w-8 h-8 mx-auto mb-4 text-accent-300" />
                <h3 className="text-lg font-semibold mb-2">Opinion Pieces</h3>
                <p className="text-sm text-primary-200 mb-4">
                  Express your views on current developments in ADR
                </p>
                <ul className="text-xs text-primary-300 space-y-1">
                  <li>• Well-reasoned arguments</li>
                  <li>• Current relevance</li>
                  <li>• Professional tone</li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12"
            >
              <Link
                href="/submissions"
                className="btn-secondary inline-flex items-center space-x-2 bg-white text-primary-600 hover:bg-primary-50"
              >
                <span>Submit Your Article</span>
                <Send className="w-4 h-4" />
              </Link>
              
              <p className="text-sm text-primary-200 mt-4">
                All submissions are reviewed by our editorial team. 
                <Link href="/submissions" className="underline hover:text-white transition-colors ml-1">
                  View submission guidelines
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
