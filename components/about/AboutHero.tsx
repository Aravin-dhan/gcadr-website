'use client'

import { motion } from 'framer-motion'
import { Award, Users, BookOpen, Globe } from 'lucide-react'

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container-max section-padding relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
              >
                About GCADR
              </motion.div>
              
              <h1 className="heading-1">
                <span className="block">Pioneering Excellence in</span>
                <span className="block text-primary-600">Alternative Dispute</span>
                <span className="block">Resolution</span>
              </h1>
              
              <div className="space-y-4 text-secondary-600 leading-relaxed">
                <p className="body-large">
                  ADR is a growing and promising field for young lawyers, offering opportunities to work in diverse legal environments while contributing to the efficient resolution of disputes. The University is always dedicated towards upholding legal education with justice, equality, and liberty, encouraging critical thinking for confronting societal problems and enhancing the public good.
                </p>
                <p className="body-base">
                  The GNLU Centre for Alternative Dispute Resolution (GCADR) was established in 2010. Under the leadership of Prof. (Dr.) Vikas Gandhi, the Centre has successfully created and sustainably developed a vibrant culture of ADR within the University and beyond, conducting scores of training programs and certificate courses for students, professionals, and government departments.
                </p>
              </div>
            </div>

            {/* Key Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <div className="px-6 py-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="text-lg font-bold text-primary-600">2010</div>
                <div className="text-sm text-secondary-600 dark:text-slate-400">Established</div>
              </div>
              <div className="px-6 py-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="text-lg font-bold text-accent-600">Prof. Dr. Vikas Gandhi</div>
                <div className="text-sm text-secondary-600 dark:text-slate-400">Faculty Convenor</div>
              </div>
            </motion.div>
          </motion.div>

          {/* GNLU Campus Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-600 overflow-hidden">
              <img
                src="/gnlu-campus.jpg"
                alt="Gujarat National Law University Campus"
                className="w-full h-96 object-cover"
                onError={(e) => {
                  // Fallback to core values if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />

              {/* Fallback Core Values (hidden by default) */}
              <div className="p-8 space-y-6" style={{ display: 'none' }}>
                <h3 className="text-xl font-semibold text-secondary-900 mb-6">Our Core Values</h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Award className="w-8 h-8 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-secondary-900">Excellence</div>
                      <div className="text-sm text-secondary-600">
                        Commitment to the highest standards in education and research
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Users className="w-8 h-8 text-accent-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-secondary-900">Collaboration</div>
                      <div className="text-sm text-secondary-600">
                        Building partnerships for greater impact and reach
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <BookOpen className="w-8 h-8 text-secondary-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-secondary-900">Innovation</div>
                      <div className="text-sm text-secondary-600">
                        Pioneering new approaches to dispute resolution
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Globe className="w-8 h-8 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-secondary-900">Global Perspective</div>
                      <div className="text-sm text-secondary-600">
                        Integrating international best practices and standards
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-primary-500 rounded-full opacity-20"
            />
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-500 rounded-full opacity-20"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
