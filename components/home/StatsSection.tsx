'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Users, BookOpen, Calendar, Globe, TrendingUp } from 'lucide-react'

const stats = [
  {
    icon: Award,
    value: '15+',
    label: 'Years of Excellence',
    description: 'Leading ADR education since 2010',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
  {
    icon: Users,
    value: '500+',
    label: 'Students Trained',
    description: 'Professionals equipped with ADR skills',
    color: 'text-accent-600',
    bgColor: 'bg-accent-100',
  },
  {
    icon: BookOpen,
    value: '100+',
    label: 'Publications',
    description: 'Research papers and articles published',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-100',
  },
  {
    icon: Calendar,
    value: '50+',
    label: 'Events Organized',
    description: 'Conferences, workshops, and seminars',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
  {
    icon: Globe,
    value: '25+',
    label: 'International Collaborations',
    description: 'Partnerships with global institutions',
    color: 'text-accent-600',
    bgColor: 'bg-accent-100',
  },
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Success Rate',
    description: 'Successful dispute resolutions facilitated',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-100',
  },
]

export function StatsSection() {
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
            Our Impact
          </div>
          <h2 className="heading-2 mb-4">Making a Difference in ADR</h2>
          <p className="body-large max-w-3xl mx-auto">
            Our commitment to excellence in Alternative Dispute Resolution education and research 
            has created lasting impact across the legal community.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className={`w-20 h-20 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-10 h-10 ${stat.color}`} />
                  </div>
                  
                  {/* Floating animation */}
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                    className={`absolute -top-2 -right-2 w-6 h-6 ${stat.color.replace('text-', 'bg-')} rounded-full opacity-20`}
                  />
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-4xl font-bold text-secondary-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xl font-semibold text-secondary-700 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-secondary-600 leading-relaxed">
                    {stat.description}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 lg:p-12">
            <h3 className="heading-3 mb-4">Join Our Growing Community</h3>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Be part of India's leading ADR education and research center. 
              Explore opportunities for collaboration, learning, and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/work-with-us"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Work With Us
              </motion.a>
              <motion.a
                href="/about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                Learn More
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
