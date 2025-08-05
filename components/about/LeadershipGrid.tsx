'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, ExternalLink } from 'lucide-react'

interface LeadershipMember {
  id: string
  name: string
  position: string
  bio: string
  email?: string
  image?: string
  order: number
}

export function LeadershipGrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [leadership, setLeadership] = useState<LeadershipMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/leadership/')
        if (response.ok) {
          const data = await response.json()
          // Handle both array and object with results property
          const leadershipData = Array.isArray(data) ? data : (data.results || [])
          setLeadership(leadershipData)
        } else {
          // Fallback data if API is not available
          setLeadership([
            {
              id: '1',
              name: 'Prof. (Dr.) Vikas Gandhi',
              position: 'Faculty Convenor, GCADR',
              bio: 'Prof. (Dr.) Vikas Gandhi is the Faculty Convenor of the GNLU Centre for Alternative Dispute Resolution. Under his distinguished leadership, GCADR has emerged as a premier education hub for ADR training, providing specialized training and promoting a culture of dispute resolution through conferences, workshops, and competitions. He has successfully created and sustainably developed a vibrant culture of ADR within the University and beyond.',
              email: 'vikas.gandhi@gnlu.ac.in',
              order: 1
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching leadership:', error)
        // Fallback data
        setLeadership([
          {
            id: '1',
            name: 'Prof. (Dr.) Vikas Gandhi',
            position: 'Faculty Convenor, GCADR',
            bio: 'Prof. (Dr.) Vikas Gandhi is the Faculty Convenor of the GNLU Centre for Alternative Dispute Resolution. Under his distinguished leadership, GCADR has emerged as a premier education hub for ADR training, providing specialized training and promoting a culture of dispute resolution through conferences, workshops, and competitions. He has successfully created and sustainably developed a vibrant culture of ADR within the University and beyond.',
            email: 'vikas.gandhi@gnlu.ac.in',
            order: 1
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchLeadership()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-dark-surface">
        <div className="container-max section-padding">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-dark-muted">Loading leadership information...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-dark-surface">
      <div className="container-max section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
            Faculty Leadership
          </div>
          <h2 className="heading-2 mb-4 dark:text-dark-text">Meet Our Leaders</h2>
          <p className="body-large max-w-3xl mx-auto dark:text-dark-muted">
            Our distinguished faculty leadership brings decades of experience in Alternative Dispute Resolution, 
            combining academic excellence with practical expertise to guide GCADR's mission.
          </p>
        </motion.div>

        {/* Leadership Grid */}
        <div className="grid lg:grid-cols-1 gap-12">
          {leadership.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="card dark:bg-dark-card dark:border-dark-border p-8 lg:p-12 group hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-2xl flex items-center justify-center">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="w-28 h-28 lg:w-36 lg:h-36 bg-white dark:bg-dark-surface rounded-xl flex items-center justify-center">
                        <span className="text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl lg:text-3xl font-semibold text-secondary-900 dark:text-dark-text mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-6 text-lg">
                    {member.position}
                  </p>
                  <p className="text-secondary-600 dark:text-dark-muted text-lg leading-relaxed mb-8">
                    {member.bio}
                  </p>

                  {/* Contact Information */}
                  {member.email && (
                    <div className="flex justify-center lg:justify-start">
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg transition-colors space-x-2"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Contact</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="card dark:bg-dark-card dark:border-dark-border p-8 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
            <h3 className="heading-3 mb-4 dark:text-dark-text">Academic Excellence</h3>
            <p className="body-base mb-6 max-w-2xl mx-auto dark:text-dark-muted">
              Our leadership team is committed to advancing the field of Alternative Dispute Resolution through 
              innovative research, comprehensive education, and practical application.
            </p>
            <a
              href="/about"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Learn More About GCADR</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
