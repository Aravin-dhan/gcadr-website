'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Award, Users, BookOpen, Globe, TrendingUp } from 'lucide-react'

const milestones = [
  {
    year: '2010',
    title: 'GCADR Established',
    description: 'The GNLU Centre for Alternative Dispute Resolution was founded with a vision to advance ADR education and research in India.',
    icon: Award,
    color: 'primary',
  },
  {
    year: '2012',
    title: 'First Certificate Course',
    description: 'Launched our first comprehensive certificate course in mediation, setting the foundation for specialized ADR training.',
    icon: BookOpen,
    color: 'accent',
  },
  {
    year: '2015',
    title: 'International Partnerships',
    description: 'Established partnerships with leading international ADR institutions, bringing global best practices to India.',
    icon: Globe,
    color: 'secondary',
  },
  {
    year: '2017',
    title: 'GALR Journal Launch',
    description: 'Launched the Gujarat Arbitration and Law Review (GALR), our flagship academic publication.',
    icon: BookOpen,
    color: 'primary',
  },
  {
    year: '2019',
    title: '500+ Students Milestone',
    description: 'Reached the milestone of training over 500 students and professionals in various ADR techniques.',
    icon: Users,
    color: 'accent',
  },
  {
    year: '2022',
    title: 'Research Excellence',
    description: 'Recognized for outstanding contributions to ADR research with multiple national and international awards.',
    icon: TrendingUp,
    color: 'secondary',
  },
]

export function History() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-secondary-50">
      <div className="container-max section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            Our Journey
          </div>
          <h2 className="heading-2 mb-4">A Legacy of Excellence</h2>
          <p className="body-large max-w-3xl mx-auto">
            From our humble beginnings in 2010 to becoming a leading center for ADR education and research, 
            our journey has been marked by continuous growth and achievement.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary-200 h-full hidden lg:block"></div>

          <div className="space-y-12 lg:space-y-16">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col lg:gap-16 gap-8`}
                >
                  {/* Content */}
                  <div className={`lg:w-1/2 ${isEven ? 'lg:text-right' : 'lg:text-left'} text-center`}>
                    <div className="card p-6 lg:p-8">
                      <div className="flex items-center justify-center lg:justify-start mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${
                          milestone.color === 'primary' ? 'bg-primary-100' :
                          milestone.color === 'accent' ? 'bg-accent-100' : 'bg-secondary-100'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            milestone.color === 'primary' ? 'text-primary-600' :
                            milestone.color === 'accent' ? 'text-accent-600' : 'text-secondary-600'
                          }`} />
                        </div>
                        <div className={`text-2xl font-bold ${
                          milestone.color === 'primary' ? 'text-primary-600' :
                          milestone.color === 'accent' ? 'text-accent-600' : 'text-secondary-600'
                        }`}>
                          {milestone.year}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                        {milestone.title}
                      </h3>
                      
                      <p className="text-secondary-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-primary-600 rounded-full z-10"></div>

                  {/* Spacer for mobile */}
                  <div className="lg:w-1/2 hidden lg:block"></div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="heading-3 mb-4">Join Our Continuing Journey</h3>
            <p className="body-large mb-8 max-w-2xl mx-auto opacity-90">
              Be part of our mission to transform dispute resolution in India and beyond. 
              Explore opportunities to collaborate, learn, and contribute to our growing legacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/work-with-us"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary bg-white text-primary-600 hover:bg-gray-100"
              >
                Work With Us
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-ghost border-white text-white hover:bg-white/10"
              >
                Get in Touch
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
