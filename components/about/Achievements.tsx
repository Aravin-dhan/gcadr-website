'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Trophy, Star, Medal, Target, Users } from 'lucide-react'

const achievements = [
  {
    icon: Award,
    title: 'Excellence in Legal Education',
    description: 'Recognized by the Bar Council of India for outstanding contributions to legal education and ADR training.',
    year: '2023',
    category: 'Education',
  },
  {
    icon: Trophy,
    title: 'Best Research Publication',
    description: 'GALR Journal awarded as the Best Law Review in Alternative Dispute Resolution by the Indian Law Institute.',
    year: '2022',
    category: 'Research',
  },
  {
    icon: Star,
    title: 'International Recognition',
    description: 'Featured among top 10 ADR centers in Asia by the International Arbitration Institute.',
    year: '2021',
    category: 'International',
  },
  {
    icon: Medal,
    title: 'Innovation in ADR',
    description: 'Pioneered online mediation platforms, receiving the Digital Innovation Award from the Ministry of Law.',
    year: '2020',
    category: 'Innovation',
  },
  {
    icon: Target,
    title: 'Community Impact',
    description: 'Successfully resolved over 1000 disputes through our community mediation programs.',
    year: '2019',
    category: 'Community',
  },
  {
    icon: Users,
    title: 'Alumni Excellence',
    description: 'Over 90% of our graduates are actively practicing ADR professionals in leading law firms and institutions.',
    year: 'Ongoing',
    category: 'Alumni',
  },
]

const statistics = [
  { number: '15+', label: 'Years of Excellence', description: 'Continuous growth and innovation' },
  { number: '500+', label: 'Students Trained', description: 'Across various ADR programs' },
  { number: '100+', label: 'Research Publications', description: 'In national and international journals' },
  { number: '25+', label: 'Awards & Recognition', description: 'From prestigious institutions' },
  { number: '50+', label: 'Events Organized', description: 'Conferences, workshops, and seminars' },
  { number: '95%', label: 'Success Rate', description: 'In dispute resolution cases' },
]

export function Achievements() {
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
            Our Achievements
          </div>
          <h2 className="heading-2 mb-4">Recognition & Impact</h2>
          <p className="body-large max-w-3xl mx-auto">
            Our commitment to excellence has been recognized through numerous awards, 
            achievements, and the lasting impact we've made in the field of Alternative Dispute Resolution.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1">
                {stat.number}
              </div>
              <div className="text-sm font-semibold text-secondary-900 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-secondary-600">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                className="card p-6 group hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded-full">
                        {achievement.category}
                      </span>
                      <span className="text-sm font-medium text-secondary-500">
                        {achievement.year}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      {achievement.title}
                    </h3>
                    
                    <p className="text-secondary-600 text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="heading-3 mb-4">Be Part of Our Success Story</h3>
            <p className="body-large mb-8 max-w-2xl mx-auto opacity-90">
              Join us in our mission to transform dispute resolution and create lasting impact 
              in the legal community. Together, we can achieve even greater heights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/work-with-us"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary bg-white text-primary-600 hover:bg-gray-100"
              >
                Join Our Mission
              </motion.a>
              <motion.a
                href="/publications"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-ghost border-white text-white hover:bg-white/10"
              >
                View Our Work
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
