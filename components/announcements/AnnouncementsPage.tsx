'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Bell, Calendar, Clock, AlertCircle, Info, Filter, Search } from 'lucide-react'

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
  news: 'bg-blue-100 text-blue-700 border-blue-200',
  event: 'bg-green-100 text-green-700 border-green-200',
  deadline: 'bg-red-100 text-red-700 border-red-200',
  general: 'bg-gray-100 text-gray-700 border-gray-200'
}

const typeLabels = {
  news: 'News',
  event: 'Event',
  deadline: 'Deadline',
  general: 'General'
}

export function AnnouncementsPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/announcements/')
        if (response.ok) {
          const data = await response.json()
          const announcementsArray = Array.isArray(data) ? data : (data.results || [])
          setAnnouncements(announcementsArray)
          setFilteredAnnouncements(announcementsArray)
        } else {
          // Fallback data
          const fallbackData = [
            {
              id: '1',
              title: 'Annual Arbitration Week 2025',
              content: 'Join us for our flagship event featuring renowned experts in alternative dispute resolution from March 24-28, 2025. This comprehensive program will cover the latest developments in arbitration, mediation, and other ADR mechanisms.',
              announcement_type: 'event' as const,
              is_featured: true,
              published_date: '2025-01-15T10:00:00Z'
            },
            {
              id: '2',
              title: 'GALR Journal Submission Deadline Extended',
              content: 'The submission deadline for Volume 2, Issue 2 of the Gujarat ADR Law Review has been extended to April 15, 2025. We encourage researchers and practitioners to submit their high-quality papers.',
              announcement_type: 'deadline' as const,
              is_featured: true,
              published_date: '2025-01-10T09:00:00Z'
            },
            {
              id: '3',
              title: 'New Certificate Course in Commercial Mediation',
              content: 'GCADR is pleased to announce the launch of a new certificate course in commercial mediation. Registration is now open for the February 2025 batch. Limited seats available.',
              announcement_type: 'news' as const,
              is_featured: false,
              published_date: '2025-01-08T14:00:00Z'
            }
          ]
          setAnnouncements(fallbackData)
          setFilteredAnnouncements(fallbackData)
        }
      } catch (error) {
        console.error('Error fetching announcements:', error)
        // Fallback data on error
        const fallbackData = [
          {
            id: '1',
            title: 'Annual Arbitration Week 2025',
            content: 'Join us for our flagship event featuring renowned experts in alternative dispute resolution.',
            announcement_type: 'event' as const,
            is_featured: true,
            published_date: '2025-01-15T10:00:00Z'
          }
        ]
        setAnnouncements(fallbackData)
        setFilteredAnnouncements(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  useEffect(() => {
    let filtered = announcements

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(announcement => announcement.announcement_type === selectedType)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredAnnouncements(filtered)
  }, [announcements, selectedType, searchTerm])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="pt-16 lg:pt-20">
        <div className="py-20 bg-gray-50">
          <div className="container-max section-padding">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading announcements...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 lg:py-32">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Bell className="w-4 h-4 mr-2" />
              Latest Updates
            </div>
            <h1 className="heading-1 mb-6">
              News & Announcements
            </h1>
            <p className="body-large max-w-3xl mx-auto">
              Stay informed about the latest developments, events, deadlines, and opportunities from GCADR. 
              Get updates on research initiatives, training programs, publications, and important announcements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-white border-b">
        <div className="container-max section-padding">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="news">News</option>
                <option value="event">Events</option>
                <option value="deadline">Deadlines</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Grid */}
      <section ref={ref} className="py-16 bg-gray-50">
        <div className="container-max section-padding">
          {filteredAnnouncements.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAnnouncements.map((announcement, index) => {
                const IconComponent = typeIcons[announcement.announcement_type]
                const colorClass = typeColors[announcement.announcement_type]
                
                return (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`card p-6 hover:shadow-lg transition-all duration-300 ${
                      announcement.is_featured ? 'ring-2 ring-primary-200 bg-primary-50' : 'bg-white'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
                        <IconComponent className="w-3 h-3 mr-1" />
                        {typeLabels[announcement.announcement_type]}
                      </div>
                      {announcement.is_featured && (
                        <div className="bg-golden-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-secondary-900 mb-3 line-clamp-2">
                      {announcement.title}
                    </h3>
                    <p className="text-secondary-600 text-sm mb-4 line-clamp-4">
                      {announcement.content}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center text-xs text-secondary-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(announcement.published_date)}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No announcements found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedType !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Check back later for new announcements.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
