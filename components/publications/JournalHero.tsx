'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, Award, Users } from 'lucide-react'

export function JournalHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-br from-accent-600 via-accent-700 to-accent-800 dark:from-accent-800 dark:via-accent-900 dark:to-dark-bg text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-max section-padding relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                <BookOpen className="w-4 h-4 mr-2" />
                GALR Journal
              </div>
              
              <h1 className="heading-1 text-accent-300">
                GNLU ADR Law Review
              </h1>
              
              <p className="text-xl text-accent-100 leading-relaxed max-w-3xl mx-auto">
                A premier academic publication dedicated to advancing scholarship in Alternative Dispute Resolution. 
                GALR publishes high-quality research, analysis, and commentary from leading academics and practitioners.
              </p>
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  )
}
