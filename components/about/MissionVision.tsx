'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Eye, Heart, Lightbulb } from 'lucide-react'

export function MissionVision() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-slate-900">
      <div className="container-max section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
            Our Aims
          </div>
          <h2 className="heading-2 mb-4">GCADR Aims</h2>
          <p className="body-large max-w-4xl mx-auto">
            GNLU Centre for Alternative Dispute Resolution, GCADR is the epitome of innovation, research, and excellence in ADR by Gujarat National Law University.
          </p>
        </motion.div>

        {/* GCADR Aims Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="prose prose-lg max-w-none text-secondary-600 dark:text-slate-400 leading-relaxed text-justify">
            <p className="text-justify">
              Under the leadership of Prof. Dr. Vikas Gandhi, GCADR has emerged as a premier education hub for ADR training, providing specialized training and promoting a culture of dispute resolution through conferences, workshops, and competitions. It bridges theory and practice, providing students and professionals with hands-on experience and exposure to global best practices.
            </p>
            <p className="text-justify">
              With a strong emphasis on research and inclusivity, GCADR extends its reach to diverse stakeholders, contributing to academic discourse and shaping ADR policies. Through global collaborations and its commitment to capacity-building, the Centre aligns with national priorities, reduces the burden on the judiciary, and promotes efficient dispute resolution, making it a vital asset to both GNLU and India's ADR ecosystem.
            </p>
          </div>
        </motion.div>


      </div>
    </section>
  )
}
