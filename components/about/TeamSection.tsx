'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Linkedin, ExternalLink } from 'lucide-react'

interface TeamMember {
  name: string
  role: string
  batch: string
  initials: string
  linkedin: string
  image?: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Garvita Bhatt',
    role: 'Convenor',
    batch: '2020 – 2025',
    initials: 'GB',
    linkedin: 'https://linkedin.com/in/garvita-bhatt',
    image: '/team/garvita-bhatt.jpg'
  },
  {
    name: 'Tahir Syed',
    role: 'Co-convenor',
    batch: '2021 – 2026',
    initials: 'TS',
    linkedin: 'https://linkedin.com/in/tahir-syed',
    image: '/team/tahir-syed.jpg'
  },
  {
    name: 'Shreya Kumar',
    role: 'Secretary',
    batch: '2020 - 2025',
    initials: 'SK',
    linkedin: 'https://linkedin.com/in/shreya-kumar',
    image: '/team/shreya-kumar.jpg'
  },
  {
    name: 'Anshuman Jhala',
    role: 'Co-secretary',
    batch: '2021 - 2026',
    initials: 'AJ',
    linkedin: 'https://linkedin.com/in/anshuman-jhala',
    image: '/team/anshuman-jhala.jpg'
  },
  {
    name: 'Yuman Islam',
    role: 'Treasurer',
    batch: '2020 – 2025',
    initials: 'YI',
    linkedin: 'https://linkedin.com/in/yuman-islam',
    image: '/team/yuman-islam.jpg'
  },
  {
    name: 'Kanhai Parikh',
    role: 'Co-Treasurer',
    batch: '2021 – 2026',
    initials: 'KP',
    linkedin: 'https://linkedin.com/in/kanhai-parikh',
    image: '/team/kanhai-parikh.jpg'
  },
  {
    name: 'Jyotirmoy Alayman',
    role: 'Social Media Head',
    batch: '2022 – 2027',
    initials: 'JA',
    linkedin: 'https://linkedin.com/in/jyotirmoy-alayman',
    image: '/team/jyotirmoy-alayman.jpg'
  },
  {
    name: 'Chaitya Doshi',
    role: 'IT and Blog Head',
    batch: '2020 – 2025',
    initials: 'CD',
    linkedin: 'https://linkedin.com/in/chaitya-doshi',
    image: '/team/chaitya-doshi.jpg'
  },
  {
    name: 'Sanjana Kothari',
    role: 'Research and Outreach Head',
    batch: '2022-27',
    initials: 'SK',
    linkedin: 'https://linkedin.com/in/sanjana-kothari',
    image: '/team/sanjana-kothari.jpg'
  },
  {
    name: 'Aahini Gandhi',
    role: 'Research and Outreach Head',
    batch: '2022-27',
    initials: 'AG',
    linkedin: 'https://linkedin.com/in/aahini-gandhi',
    image: '/team/aahini-gandhi.jpg'
  },
  {
    name: 'Ayush Aryan',
    role: 'Student Mentor',
    batch: '2020 – 2025',
    initials: 'AA',
    linkedin: 'https://linkedin.com/in/ayush-aryan',
    image: '/team/ayush-aryan.jpg'
  },
  {
    name: 'Aarsh Soni',
    role: 'Mediation Cell Head',
    batch: '2020 – 2025',
    initials: 'AS',
    linkedin: 'https://linkedin.com/in/aarsh-soni',
    image: '/team/aarsh-soni.jpg'
  }
]

export function TeamSection() {
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
              key={`${member.name}-${member.role}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="card group hover:shadow-lg transition-all duration-300 p-6 cursor-pointer"
              onClick={() => window.open(member.linkedin, '_blank')}
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
                    {member.initials}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2 text-sm">
                  {member.role}
                </p>
                <p className="text-xs text-secondary-500 mb-3">
                  {member.batch}
                </p>

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
