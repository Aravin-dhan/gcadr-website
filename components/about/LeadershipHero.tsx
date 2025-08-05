'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, Award, BookOpen } from 'lucide-react'

export function LeadershipHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-dark-bg text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
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
                Leadership
              </div>
              
              <h1 className="heading-1 text-golden-500 text-5xl lg:text-6xl font-extrabold">
                Our Leadership
              </h1>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
