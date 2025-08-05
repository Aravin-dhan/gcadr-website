'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, Target, Users, Mail } from 'lucide-react'

export function ResearchAssistantship() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container-max section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
            Research Opportunities
          </div>
          <h2 className="heading-2 mb-4">Research Assistantships</h2>
          <p className="body-large max-w-3xl mx-auto">
            GCADR offers Research Assistantships on a rolling basis to applicants to engage in different research projects of the Centre, effective research-led policy making and consequently creating legal awareness as well as in-depth academic work in the field of ADR.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Research Focus Areas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card p-8"
          >
            <BookOpen className="w-12 h-12 text-accent-600 mb-6" />
            <h3 className="heading-3 mb-4">Research Areas</h3>
            <ul className="space-y-3 text-secondary-600">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Alternative Dispute Resolution Mechanisms</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Commercial Arbitration</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Investment Treaty Arbitration</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Mediation and Conciliation</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Policy Development in ADR</span>
              </li>
            </ul>
          </motion.div>

          {/* Objectives */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card p-8"
          >
            <Target className="w-12 h-12 text-primary-600 mb-6" />
            <h3 className="heading-3 mb-4">Objectives</h3>
            <ul className="space-y-3 text-secondary-600">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Advance knowledge in ADR field</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Support research-led policy making</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Create legal awareness</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Develop academic publications</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Build research capacity</span>
              </li>
            </ul>
          </motion.div>

          {/* How to Apply */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="card p-8"
          >
            <Users className="w-12 h-12 text-secondary-600 mb-6" />
            <h3 className="heading-3 mb-4">How to Apply</h3>
            <div className="space-y-4 text-secondary-600">
              <p className="text-sm leading-relaxed">
                Research Assistantships are offered on a rolling basis throughout the year. We welcome applications from:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-secondary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Graduate students in law</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-secondary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Early career researchers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-secondary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Legal practitioners</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card p-8 bg-gradient-to-r from-accent-50 to-primary-50">
            <Mail className="w-12 h-12 text-primary-600 mx-auto mb-6" />
            <h3 className="heading-3 mb-4">Apply for Research Assistantship</h3>
            <p className="body-base mb-6 max-w-2xl mx-auto">
              Interested in joining our research team? Send us your CV and a brief cover letter explaining your research interests and how they align with our work.
            </p>
            <a
              href="mailto:gcadr@gnlu.ac.in?subject=Research Assistantship Application"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
