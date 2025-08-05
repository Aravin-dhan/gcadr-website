'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clock, Users, FileText, Mail } from 'lucide-react'
import { InternshipApplicationForm } from './InternshipApplicationForm'

export function InternshipSection() {
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
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            Internships
          </div>
          <h2 className="heading-2 mb-4">GCADR Internship Programme</h2>
          <p className="body-large max-w-3xl mx-auto">
            GCADR offers internships to students interested in the area of ADR. Interns will have an opportunity to work with the Faculty Convenor, Members and other collaborators of the Centre on diverse multi-disciplinary research projects and activities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="card p-8">
              <h3 className="heading-3 mb-6">About the Programme</h3>
              <div className="space-y-4 text-secondary-600 leading-relaxed">
                <p>
                  GCADR is keen to build competence and raise the quality of discourse in research through its internship programme that will provide meaningful exposure to the complexities and nuances of the Alternative Dispute Resolution Methods and Laws.
                </p>
                <p>
                  The Internship programme is designed to further GCADR's vision to promote the use of ADR methods, catalyze effective, research-led policy making and informed public debate around issues in ADR mechanisms.
                </p>
              </div>
            </div>

            {/* Key Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card p-6">
                <Users className="w-8 h-8 text-primary-600 mb-4" />
                <h4 className="text-lg font-semibold text-secondary-900 mb-2">Eligibility</h4>
                <p className="text-sm text-secondary-600">
                  Students enrolled in recognised law programmes (3rd year for 3-year courses, 3rd-5th year for 5-year courses)
                </p>
              </div>

              <div className="card p-6">
                <Clock className="w-8 h-8 text-accent-600 mb-4" />
                <h4 className="text-lg font-semibold text-secondary-900 mb-2">Duration</h4>
                <p className="text-sm text-secondary-600">
                  Minimum 4 weeks, maximum 12 weeks. Extensions subject to quality of work.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Application Requirements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="card p-8">
              <h3 className="heading-3 mb-6">Application Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-1">Curriculum Vitae</h4>
                    <p className="text-sm text-secondary-600">Updated CV with academic and professional details</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-1">Expression of Interest</h4>
                    <p className="text-sm text-secondary-600">300-word statement on interest in working with GCADR</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-1">Writing Sample</h4>
                    <p className="text-sm text-secondary-600">Academic writing sample up to 1000 words (published or unpublished)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-secondary-900 mb-1">Proposed Dates</h4>
                    <p className="text-sm text-secondary-600">Preferred internship period with specific dates</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent-50 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-2">Application Process</h4>
                  <p className="text-sm text-secondary-600 mb-3">
                    Submit applications to <strong>gcadr@gnlu.ac.in</strong> with subject line: 
                    "Application for Internship (Period in dd/mm/yy format)"
                  </p>
                  <p className="text-xs text-secondary-500">
                    Apply at least 2 months in advance. Selected candidates will be informed 2 weeks before commencement.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <InternshipApplicationForm />
        </motion.div>
      </div>
    </section>
  )
}
