'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Linkedin, ExternalLink } from 'lucide-react'
import { apiService } from '@/lib/api'

interface TeamMember {
  id: string
  name: string
  position: string
  year?: string
  linkedin_url?: string
  image?: string
  bio?: string
  order: number
}

export function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
  {
    id: '1',
    name: 'Garvita Bhatt',
    position: 'Convenor',
    year: '2020 – 2025',
    linkedin_url: 'https://linkedin.com/in/garvita-bhatt',
    image: '/team/garvita-bhatt.jpg',
    order: 1
  },
  {
    id: '2',
    name: 'Tahir Syed',
    position: 'Co-convenor',
    year: '2021 – 2026',
    linkedin_url: 'https://linkedin.com/in/tahir-syed',
    image: '/team/tahir-syed.jpg',
    order: 2
  },
  {
    id: '3',
    name: 'Shreya Kumar',
    position: 'Secretary',
    year: '2020 - 2025',
    linkedin_url: 'https://linkedin.com/in/shreya-kumar',
    image: '/team/shreya-kumar.jpg',
    order: 3
  },
  {
    id: '4',
    name: 'Anshuman Jhala',
    position: 'Co-secretary',
    year: '2021 - 2026',
    linkedin_url: 'https://linkedin.com/in/anshuman-jhala',
    image: '/team/anshuman-jhala.jpg',
    order: 4
  },
  {
    id: '5',
    name: 'Yuman Islam',
    position: 'Treasurer',
    year: '2020 – 2025',
    linkedin_url: 'https://linkedin.com/in/yuman-islam',
    image: '/team/yuman-islam.jpg',
    order: 5
  },
  {
    id: '6',
    name: 'Kanhai Parikh',
    position: 'Co-Treasurer',
    year: '2021 – 2026',
    linkedin_url: 'https://linkedin.com/in/kanhai-parikh',
    image: '/team/kanhai-parikh.jpg',
    order: 6
  },
  {
    id: '7',
    name: 'Jyotirmoy Alayman',
    position: 'Social Media Head',
    year: '2022 – 2027',
    linkedin_url: 'https://linkedin.com/in/jyotirmoy-alayman',
    image: '/team/jyotirmoy-alayman.jpg',
    order: 7
  },
  {
    id: '8',
    name: 'Chaitya Doshi',
    position: 'IT and Blog Head',
    year: '2020 – 2025',
    linkedin_url: 'https://linkedin.com/in/chaitya-doshi',
    image: '/team/chaitya-doshi.jpg',
    order: 8
  },
  {
    id: '9',
    name: 'Sanjana Kothari',
    position: 'Research and Outreach Head',
    year: '2022-27',
    linkedin_url: 'https://linkedin.com/in/sanjana-kothari',
    image: '/team/sanjana-kothari.jpg',
    order: 9
  },
  {
    id: '10',
    name: 'Aahini Gandhi',
    position: 'Research and Outreach Head',
    year: '2022-27',
    linkedin_url: 'https://linkedin.com/in/aahini-gandhi',
    image: '/team/aahini-gandhi.jpg',
    order: 10
  },
  {
    id: '11',
    name: 'Ayush Aryan',
    position: 'Student Mentor',
    year: '2020 – 2025',
    linkedin_url: 'https://linkedin.com/in/ayush-aryan',
    image: '/team/ayush-aryan.jpg',
    order: 11
  },
  {
    id: '12',
    name: 'Aarsh Soni',
    position: 'Mediation Cell Head',
    year: '2020 – 2025',
    linkedin_url: 'https://linkedin.com/in/aarsh-soni',
    image: '/team/aarsh-soni.jpg',
    order: 12
  }
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true)
        const response = await apiService.getTeamMembers()
        if (response.results && Array.isArray(response.results)) {
          setTeamMembers(response.results.sort((a: TeamMember, b: TeamMember) => a.order - b.order))
        }
      } catch (err) {
        console.error('Error fetching team members:', err)
        setError('Failed to load team members')
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

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
            Our Team
          </div>
          <h2 className="heading-2 mb-4">GCADR Student Team</h2>
          <p className="body-large max-w-3xl mx-auto">
            Our dedicated student team works tirelessly to advance the mission of GCADR through various initiatives, research, and outreach programs.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id || `${member.name}-${member.position}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="card dark:bg-dark-card dark:border-dark-border group hover:shadow-lg transition-all duration-300 p-6 cursor-pointer"
              onClick={() => window.open(member.linkedin_url || '#', '_blank')}
            >
              {/* Profile Picture */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 group-hover:scale-105 transition-transform duration-300">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold" style={{ display: member.image ? 'none' : 'flex' }}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-1 group-hover:text-primary-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2 text-sm">
                  {member.position}
                </p>
                {member.year && (
                  <p className="text-xs text-secondary-500 dark:text-slate-400 mb-3">
                    {member.year}
                  </p>
                )}

                {/* LinkedIn Icon */}
                <div className="flex justify-center">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                    <Linkedin className="w-4 h-4 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
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
          <div className="card p-8 bg-gradient-to-r from-primary-50 to-accent-50">
            <h3 className="heading-3 mb-4">Follow Us</h3>
            <p className="body-base mb-6 max-w-2xl mx-auto">
              Stay connected with GCADR and follow our latest updates, events, and activities on social media.
            </p>
            <a
              href="https://www.instagram.com/gcadr_gnlu/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              Follow on Instagram
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
