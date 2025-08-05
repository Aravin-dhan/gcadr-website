'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Bell, Calendar, Clock, AlertCircle, Info } from 'lucide-react'

interface Announcement {
  id: string
  title: string
  content: string
  announcement_type: 'news' | 'event' | 'deadline' | 'general'
  is_featured: boolean
  published_date: string
  expiry_date?: string
}

const typeIcons = {
  news: Info,
  event: Calendar,
  deadline: AlertCircle,
  general: Bell
}

const typeColors = {
  news: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700',
  event: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700',
  deadline: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700',
  general: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
}

export function AnnouncementsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ||
          (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')
            ? 'https://gcadr-website.onrender.com'
            : 'http://localhost:8000')

        const response = await fetch(`${API_BASE_URL}/api/announcements/?limit=6`)
        if (response.ok) {
          const data = await response.json()
          // Ensure data is an array
          const announcementsArray = Array.isArray(data) ? data : (data.results || [])
          setAnnouncements(announcementsArray)
        } else {
          // Fallback data if API is not available
          setAnnouncements([
            {
              id: '1',
              title: 'Annual Arbitration Week 2025',
              content: 'Join us for our flagship event featuring renowned experts in alternative dispute resolution.',
              announcement_type: 'event',
              is_featured: true,
              published_date: '2025-01-15T10:00:00Z'
            },
            {
              id: '2',
              title: 'GALR Journal Submission Deadline',
              content: 'Submit your research papers for Volume 2, Issue 2 by March 31, 2025.',
              announcement_type: 'deadline',
              is_featured: false,
              published_date: '2025-01-10T09:00:00Z'
            },
            {
              id: '3',
              title: 'New Certificate Course in Mediation',
              content: 'Registration now open for our comprehensive mediation training program.',
              announcement_type: 'news',
              is_featured: true,
              published_date: '2025-01-08T14:00:00Z'
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching announcements:', error)
        // Fallback data
        setAnnouncements([
          {
            id: '1',
            title: 'Annual Arbitration Week 2025',
            content: 'Join us for our flagship event featuring renowned experts in alternative dispute resolution.',
            announcement_type: 'event',
            is_featured: true,
            published_date: '2025-01-15T10:00:00Z'
          },
          {
            id: '2',
            title: 'GALR Journal Submission Deadline',
            content: 'Submit your research papers for Volume 2, Issue 2 by March 31, 2025.',
            announcement_type: 'deadline',
            is_featured: false,
            published_date: '2025-01-10T09:00:00Z'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container-max section-padding">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-slate-400">Loading announcements...</p>
          </div>
        </div>
      </section>
    )
  }

  // Ensure announcements is always an array
  const safeAnnouncements = Array.isArray(announcements) ? announcements : []

  if (safeAnnouncements.length === 0) {
    return null
  }

  return (
    <section ref={ref} className="py-16 bg-gray-50 dark:bg-slate-800">
      <div className="container-max section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
            <Bell className="w-4 h-4 mr-2" />
            Latest Updates
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 dark:text-slate-100 mb-4">
            News & Announcements
          </h2>
          <p className="text-lg text-secondary-600 dark:text-slate-400 max-w-3xl mx-auto">
            Stay updated with the latest news, events, and important announcements from GCADR.
          </p>
        </motion.div>

        {/* Announcements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeAnnouncements.map((announcement, index) => {
            const IconComponent = typeIcons[announcement.announcement_type]
            const colorClass = typeColors[announcement.announcement_type]
            
            return (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`card p-6 hover:shadow-lg transition-all duration-300 ${
                  announcement.is_featured
                    ? 'ring-2 ring-primary-200 dark:ring-primary-700 bg-primary-50 dark:bg-primary-900/20'
                    : 'bg-white dark:bg-slate-800'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
                    <IconComponent className="w-3 h-3 mr-1" />
                    {announcement.announcement_type.charAt(0).toUpperCase() + announcement.announcement_type.slice(1)}
                  </div>
                  {announcement.is_featured && (
                    <div className="bg-golden-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-slate-100 mb-3 line-clamp-2">
                  {announcement.title}
                </h3>
                <p className="text-secondary-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                  {announcement.content}
                </p>

                {/* Footer */}
                <div className="flex items-center text-xs text-secondary-500 dark:text-slate-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatDate(announcement.published_date)}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="/announcements"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
          >
            View All Announcements
          </a>
        </motion.div>
      </div>
    </section>
  )
}
