'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, Target, Heart } from 'lucide-react'

export function TeamHero() {
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
                <Users className="w-4 h-4 mr-2" />
                Our Team
              </div>
              
              <h1 className="heading-1">
                GCADR Student Team
              </h1>
              
              <p className="text-xl text-accent-100 leading-relaxed max-w-3xl mx-auto">
                Our dedicated student team works tirelessly to advance the mission of GCADR through various initiatives, 
                research projects, and outreach programs, embodying the spirit of Alternative Dispute Resolution.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Target className="w-8 h-8 mx-auto mb-4 text-primary-300" />
                <h3 className="text-lg font-semibold mb-2">Dedication</h3>
                <p className="text-sm text-accent-200">
                  Committed to advancing ADR education and research
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Heart className="w-8 h-8 mx-auto mb-4 text-primary-300" />
                <h3 className="text-lg font-semibold mb-2">Passion</h3>
                <p className="text-sm text-accent-200">
                  Passionate about creating positive change through ADR
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Users className="w-8 h-8 mx-auto mb-4 text-primary-300" />
                <h3 className="text-lg font-semibold mb-2">Collaboration</h3>
                <p className="text-sm text-accent-200">
                  Working together to achieve common goals
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
