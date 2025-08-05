'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FileText, Send, Award } from 'lucide-react'
import Link from 'next/link'

export function JournalSubmissionCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-accent-600 via-accent-700 to-accent-800 dark:from-accent-800 dark:via-accent-900 dark:to-dark-bg text-white">
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
                <FileText className="w-4 h-4 mr-2" />
                Submit to GALR Journal
              </div>
              
              <h2 className="heading-2">
                Contribute to Academic Excellence
              </h2>
              
              <p className="text-xl text-accent-100 leading-relaxed max-w-3xl mx-auto">
                Share your research and insights with the global ADR community. We welcome high-quality 
                academic articles from scholars, practitioners, and students.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <FileText className="w-8 h-8 mx-auto mb-4 text-primary-300" />
                <h3 className="text-lg font-semibold mb-2">Research Articles</h3>
                <p className="text-sm text-accent-200 mb-4">
                  Original research on ADR theory, practice, and policy
                </p>
                <ul className="text-xs text-accent-300 space-y-1">
                  <li>• 3000-8000 words</li>
                  <li>• BlueBook citations</li>
                  <li>• Abstract required</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Award className="w-8 h-8 mx-auto mb-4 text-primary-300" />
                <h3 className="text-lg font-semibold mb-2">Case Studies</h3>
                <p className="text-sm text-accent-200 mb-4">
                  In-depth analysis of significant ADR cases and decisions
                </p>
                <ul className="text-xs text-accent-300 space-y-1">
                  <li>• Detailed analysis</li>
                  <li>• Legal implications</li>
                  <li>• Practical insights</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Send className="w-8 h-8 mx-auto mb-4 text-primary-300" />
                <h3 className="text-lg font-semibold mb-2">Commentary</h3>
                <p className="text-sm text-accent-200 mb-4">
                  Expert commentary on current developments in ADR
                </p>
                <ul className="text-xs text-accent-300 space-y-1">
                  <li>• Current relevance</li>
                  <li>• Expert analysis</li>
                  <li>• Policy implications</li>
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
                className="btn-secondary inline-flex items-center space-x-2 bg-white text-accent-600 hover:bg-accent-50"
              >
                <span>View Submission Guidelines</span>
                <Send className="w-4 h-4" />
              </Link>
              
              <p className="text-sm text-accent-200 mt-4">
                All submissions undergo rigorous peer review. 
                <Link href="/submissions" className="underline hover:text-white transition-colors ml-1">
                  Learn more about our review process
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
