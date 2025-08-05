'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Handshake, Globe, Building, Mail } from 'lucide-react'

export function CollaborationSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container-max section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-4">
            Partnerships
          </div>
          <h2 className="heading-2 mb-4">Collaborate With Us</h2>
          <p className="body-large max-w-3xl mx-auto">
            We at GCADR collaborate with a wide range of institutions and independent researchers on various projects. We welcome partnerships that advance the field of Alternative Dispute Resolution.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Academic Institutions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card p-8 text-center"
          >
            <Building className="w-12 h-12 text-primary-600 mx-auto mb-6" />
            <h3 className="heading-3 mb-4">Academic Institutions</h3>
            <p className="text-secondary-600 mb-6">
              Partner with us on joint research projects, academic exchanges, and collaborative programs that advance ADR education and research.
            </p>
            <ul className="text-sm text-secondary-600 space-y-2">
              <li>• Joint research initiatives</li>
              <li>• Faculty exchange programs</li>
              <li>• Collaborative conferences</li>
              <li>• Shared publications</li>
            </ul>
          </motion.div>

          {/* Research Organizations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card p-8 text-center"
          >
            <Globe className="w-12 h-12 text-accent-600 mx-auto mb-6" />
            <h3 className="heading-3 mb-4">Research Organizations</h3>
            <p className="text-secondary-600 mb-6">
              Collaborate with think tanks, policy institutes, and research organizations to develop evidence-based ADR policies and practices.
            </p>
            <ul className="text-sm text-secondary-600 space-y-2">
              <li>• Policy research projects</li>
              <li>• Data sharing initiatives</li>
              <li>• Comparative studies</li>
              <li>• Best practice development</li>
            </ul>
          </motion.div>

          {/* Independent Researchers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="card p-8 text-center"
          >
            <Handshake className="w-12 h-12 text-secondary-600 mx-auto mb-6" />
            <h3 className="heading-3 mb-4">Independent Researchers</h3>
            <p className="text-secondary-600 mb-6">
              Work with individual researchers and practitioners who bring unique perspectives and expertise to ADR research and practice.
            </p>
            <ul className="text-sm text-secondary-600 space-y-2">
              <li>• Individual research projects</li>
              <li>• Visiting researcher programs</li>
              <li>• Collaborative publications</li>
              <li>• Expert consultations</li>
            </ul>
          </motion.div>
        </div>

        {/* Collaboration Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 lg:p-12 mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="heading-3 mb-4">Areas of Collaboration</h3>
            <p className="body-large max-w-2xl mx-auto">
              We are open to collaborating on various aspects of ADR research, education, and practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="text-lg font-semibold text-secondary-900 mb-2">Research Projects</h4>
              <p className="text-sm text-secondary-600">
                Joint research on ADR mechanisms, effectiveness, and innovation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-2xl">🎓</span>
              </div>
              <h4 className="text-lg font-semibold text-secondary-900 mb-2">Educational Programs</h4>
              <p className="text-sm text-secondary-600">
                Collaborative courses, workshops, and training programs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-2xl">📄</span>
              </div>
              <h4 className="text-lg font-semibold text-secondary-900 mb-2">Publications</h4>
              <p className="text-sm text-secondary-600">
                Co-authored papers, books, and policy documents
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-2xl">🌐</span>
              </div>
              <h4 className="text-lg font-semibold text-secondary-900 mb-2">Events</h4>
              <p className="text-sm text-secondary-600">
                Joint conferences, seminars, and workshops
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact for Collaboration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <div className="card p-8 bg-gradient-to-r from-secondary-50 to-primary-50">
            <Mail className="w-12 h-12 text-primary-600 mx-auto mb-6" />
            <h3 className="heading-3 mb-4">Start a Collaboration</h3>
            <p className="body-base mb-6 max-w-2xl mx-auto">
              Interested in collaborating with GCADR? We'd love to hear about your ideas and explore how we can work together to advance the field of Alternative Dispute Resolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:gcadr@gnlu.ac.in?subject=Collaboration Proposal"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Propose Collaboration</span>
              </a>
              <a
                href="/contact"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
