'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, BookOpen, Handshake } from 'lucide-react'

export function WorkWithUsHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
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
                Opportunities
              </div>
              
              <h1 className="heading-1 text-golden-500 text-5xl lg:text-6xl font-extrabold">
                Work With Us
              </h1>
              
              <p className="text-xl text-primary-100 leading-relaxed max-w-3xl mx-auto">
                GCADR offers Research Assistantships on a rolling basis to applicants to engage in different research projects of the Centre, effective research-led policy making and consequently creating legal awareness as well as in-depth academic work in the field of ADR.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Users className="w-8 h-8 mx-auto mb-4 text-accent-300" />
                <h3 className="text-lg font-semibold mb-2">Internships</h3>
                <p className="text-sm text-primary-200">
                  Gain hands-on experience in ADR research and practice
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <BookOpen className="w-8 h-8 mx-auto mb-4 text-accent-300" />
                <h3 className="text-lg font-semibold mb-2">Research Assistantships</h3>
                <p className="text-sm text-primary-200">
                  Contribute to cutting-edge research in dispute resolution
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Handshake className="w-8 h-8 mx-auto mb-4 text-accent-300" />
                <h3 className="text-lg font-semibold mb-2">Collaborations</h3>
                <p className="text-sm text-primary-200">
                  Partner with us on innovative ADR projects
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
