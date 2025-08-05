'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Award, Target, Users } from 'lucide-react'

export function AboutPreview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                About GCADR
              </div>
              
              <h2 className="heading-2">
                Pioneering ADR Education & Research Since 2010
              </h2>
              
              <div className="space-y-4 text-secondary-600 leading-relaxed">
                <p>
                  ADR is a growing and promising field for young lawyers, offering opportunities to work in diverse legal environments while contributing to the efficient resolution of disputes. The University is always dedicated towards upholding legal education with justice, equality, and liberty.
                </p>
                <p>
                  The GNLU Centre for Alternative Dispute Resolution (GCADR) was established in 2010. Under the leadership of Prof. (Dr.) Vikas Gandhi, the Centre has successfully created and sustainably developed a vibrant culture of ADR within the University and beyond, conducting scores of training programs and certificate courses for students, professionals, and government departments.
                </p>
              </div>
            </div>

            <Link href="/about" className="btn-primary group inline-flex">
              Learn More About Us
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid gap-6"
          >
            <div className="card p-6 space-y-4">
              <Award className="w-10 h-10 text-primary-600" />
              <h3 className="text-xl font-semibold text-secondary-900">Excellence in Education</h3>
              <p className="text-secondary-600">
                Providing specialized training and promoting a culture of dispute resolution 
                through innovative programs and global best practices.
              </p>
            </div>
            
            <div className="card p-6 space-y-4">
              <Target className="w-10 h-10 text-accent-600" />
              <h3 className="text-xl font-semibold text-secondary-900">Research & Innovation</h3>
              <p className="text-secondary-600">
                Contributing to academic discourse and shaping ADR policies through 
                cutting-edge research and scholarly publications.
              </p>
            </div>
            
            <div className="card p-6 space-y-4">
              <Users className="w-10 h-10 text-secondary-600" />
              <h3 className="text-xl font-semibold text-secondary-900">Community Impact</h3>
              <p className="text-secondary-600">
                Reducing the burden on the judiciary and promoting efficient dispute 
                resolution for diverse stakeholders across India.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}