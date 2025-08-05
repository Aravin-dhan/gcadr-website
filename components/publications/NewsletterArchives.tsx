'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, Calendar, FileText, Star } from 'lucide-react'

interface NewsletterArchive {
  id: string
  title: string
  description: string
  issue_number: string
  pdf_file: string
  published_date: string
  is_featured: boolean
  order: number
}

export function NewsletterArchives() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [archives, setArchives] = useState<NewsletterArchive[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/newsletter-archives/')
        if (response.ok) {
          const data = await response.json()
          const archivesArray = Array.isArray(data) ? data : (data.results || [])
          setArchives(archivesArray)
        } else {
          // Fallback data
          setArchives([
            {
              id: '1',
              title: 'GCADR Newsletter',
              description: 'Updates on recent ADR developments, upcoming events, and research highlights.',
              issue_number: 'Issue 3, 2024',
              pdf_file: '/newsletters/gcadr-newsletter-issue-3-2024.pdf',
              published_date: '2024-12-01',
              is_featured: true,
              order: 1
            },
            {
              id: '2',
              title: 'GCADR Newsletter',
              description: 'Special edition covering the Annual Arbitration Week and new research initiatives.',
              issue_number: 'Issue 2, 2024',
              pdf_file: '/newsletters/gcadr-newsletter-issue-2-2024.pdf',
              published_date: '2024-08-01',
              is_featured: false,
              order: 2
            },
            {
              id: '3',
              title: 'GCADR Newsletter',
              description: 'Inaugural issue featuring the launch of new programs and partnerships.',
              issue_number: 'Issue 1, 2024',
              pdf_file: '/newsletters/gcadr-newsletter-issue-1-2024.pdf',
              published_date: '2024-04-01',
              is_featured: false,
              order: 3
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching newsletter archives:', error)
        // Fallback data on error
        setArchives([
          {
            id: '1',
            title: 'GCADR Newsletter',
            description: 'Updates on recent ADR developments, upcoming events, and research highlights.',
            issue_number: 'Issue 3, 2024',
            pdf_file: '/newsletters/gcadr-newsletter-issue-3-2024.pdf',
            published_date: '2024-12-01',
            is_featured: true,
            order: 1
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchArchives()
  }, [])

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
              <p className="mt-4 text-gray-600">Loading newsletter archives...</p>
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
              <FileText className="w-4 h-4 mr-2" />
              Newsletter Archives
            </div>
            <h1 className="heading-1 mb-6">
              GCADR Newsletter Archives
            </h1>
            <p className="body-large max-w-3xl mx-auto">
              Access past issues of our newsletter featuring updates on ADR research, upcoming events, 
              publications, and important developments in the field of alternative dispute resolution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Archives List */}
      <section ref={ref} className="py-16 bg-white">
        <div className="container-max section-padding">
          {archives.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {archives.map((archive, index) => (
                <motion.div
                  key={archive.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`card p-6 hover:shadow-lg transition-all duration-300 ${
                    archive.is_featured ? 'ring-2 ring-primary-200 bg-primary-50' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-secondary-900">
                          {archive.title}
                        </h3>
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                          {archive.issue_number}
                        </span>
                        {archive.is_featured && (
                          <div className="flex items-center px-2 py-1 bg-golden-500 text-white rounded-full text-xs font-medium">
                            <Star className="w-3 h-3 mr-1" />
                            Latest
                          </div>
                        )}
                      </div>
                      
                      <p className="text-secondary-600 mb-4">
                        {archive.description}
                      </p>
                      
                      <div className="flex items-center text-sm text-secondary-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        Published: {formatDate(archive.published_date)}
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      <a
                        href={archive.pdf_file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No newsletters available</h3>
              <p className="text-gray-600">
                Check back later for new newsletter issues.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
