'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink } from 'lucide-react'
import { apiService } from '@/lib/api'

interface TeamMember {
  id: string
  name: string
  role: string
  role_display: string
  batch: string
  email?: string
  bio?: string
  image?: string
  active: boolean
  order: number
}

export function TeamGrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true)
      const response = await apiService.getTeamMembers()
      if (response.results && Array.isArray(response.results)) {
        setTeamMembers(response.results.sort((a: TeamMember, b: TeamMember) => a.order - b.order))
      } else {
        // Fallback data
        setTeamMembers([
          { id: '1', name: 'Garvita Bhatt', role: 'convenor', role_display: 'Convenor', batch: '2020 – 2025', active: true, order: 1 },
          { id: '2', name: 'Tahir Syed', role: 'co_convenor', role_display: 'Co-convenor', batch: '2021 – 2026', active: true, order: 2 },
          { id: '3', name: 'Shreya Kumar', role: 'secretary', role_display: 'Secretary', batch: '2020 - 2025', active: true, order: 3 },
          { id: '4', name: 'Anshuman Jhala', role: 'co_secretary', role_display: 'Co-secretary', batch: '2021 - 2026', active: true, order: 4 },
          { id: '5', name: 'Yuman Islam', role: 'treasurer', role_display: 'Treasurer', batch: '2020 – 2025', active: true, order: 5 },
          { id: '6', name: 'Kanhai Parikh', role: 'co_treasurer', role_display: 'Co-Treasurer', batch: '2021 – 2026', active: true, order: 6 },
          { id: '7', name: 'Jyotirmoy Alayman', role: 'social_media_head', role_display: 'Social Media Head', batch: '2022 – 2027', active: true, order: 7 },
          { id: '8', name: 'Chaitya Doshi', role: 'it_blog_head', role_display: 'IT and Blog Head', batch: '2020 – 2025', active: true, order: 8 },
          { id: '9', name: 'Sanjana Kothari', role: 'research_outreach_head', role_display: 'Research and Outreach Head', batch: '2022-27', active: true, order: 9 },
          { id: '10', name: 'Aahini Gandhi', role: 'research_outreach_head', role_display: 'Research and Outreach Head', batch: '2022-27', active: true, order: 10 },
          { id: '11', name: 'Ayush Aryan', role: 'student_mentor', role_display: 'Student Mentor', batch: '2020 – 2025', active: true, order: 11 },
          { id: '12', name: 'Aarsh Soni', role: 'mediation_cell_head', role_display: 'Mediation Cell Head', batch: '2020 – 2025', active: true, order: 12 }
        ])
      }
    } catch (err) {
      console.error('Error fetching team members:', err)
      // Fallback data on error
      setTeamMembers([
        { id: '1', name: 'Garvita Bhatt', role: 'convenor', role_display: 'Convenor', batch: '2020 – 2025', active: true, order: 1 },
        { id: '2', name: 'Tahir Syed', role: 'co_convenor', role_display: 'Co-convenor', batch: '2021 – 2026', active: true, order: 2 },
        { id: '3', name: 'Shreya Kumar', role: 'secretary', role_display: 'Secretary', batch: '2020 - 2025', active: true, order: 3 },
        { id: '4', name: 'Anshuman Jhala', role: 'co_secretary', role_display: 'Co-secretary', batch: '2021 - 2026', active: true, order: 4 },
        { id: '5', name: 'Yuman Islam', role: 'treasurer', role_display: 'Treasurer', batch: '2020 – 2025', active: true, order: 5 },
        { id: '6', name: 'Kanhai Parikh', role: 'co_treasurer', role_display: 'Co-Treasurer', batch: '2021 – 2026', active: true, order: 6 },
        { id: '7', name: 'Jyotirmoy Alayman', role: 'social_media_head', role_display: 'Social Media Head', batch: '2022 – 2027', active: true, order: 7 },
        { id: '8', name: 'Chaitya Doshi', role: 'it_blog_head', role_display: 'IT and Blog Head', batch: '2020 – 2025', active: true, order: 8 },
        { id: '9', name: 'Sanjana Kothari', role: 'research_outreach_head', role_display: 'Research and Outreach Head', batch: '2022-27', active: true, order: 9 },
        { id: '10', name: 'Aahini Gandhi', role: 'research_outreach_head', role_display: 'Research and Outreach Head', batch: '2022-27', active: true, order: 10 },
        { id: '11', name: 'Ayush Aryan', role: 'student_mentor', role_display: 'Student Mentor', batch: '2020 – 2025', active: true, order: 11 },
        { id: '12', name: 'Aarsh Soni', role: 'mediation_cell_head', role_display: 'Mediation Cell Head', batch: '2020 – 2025', active: true, order: 12 }
      ])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTeamMembers()
  }, [fetchTeamMembers])

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('')
  }

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-max section-padding">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-dark-muted">Loading team information...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-dark-bg">
      <div className="container-max section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium mb-4">
            Student Leadership
          </div>
          <h2 className="heading-2 mb-4 dark:text-dark-text">Meet Our Student Team</h2>
          <p className="body-large max-w-3xl mx-auto dark:text-dark-muted">
            Our dedicated student team works tirelessly to advance the mission of GCADR through various initiatives,
            research, and outreach programs.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="card dark:bg-dark-card dark:border-dark-border group hover:shadow-lg transition-all duration-300 p-6"
            >
              {/* Avatar */}
              <div className="flex items-center justify-center mb-4">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {getInitials(member.name)}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-dark-text mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-2 text-sm">
                  {member.role_display}
                </p>
                <p className="text-xs text-secondary-500 dark:text-dark-muted">
                  {member.batch}
                </p>
                {member.bio && (
                  <p className="text-sm text-secondary-600 dark:text-dark-muted mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Media Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="card dark:bg-dark-card dark:border-dark-border p-8 bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20">
            <h3 className="heading-3 mb-4 dark:text-dark-text">Follow Our Journey</h3>
            <p className="body-base mb-6 max-w-2xl mx-auto dark:text-dark-muted">
              Stay connected with GCADR and follow our latest updates, events, and activities on social media.
            </p>
            <a
              href="https://www.instagram.com/gcadr_gnlu/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Follow on Instagram</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
