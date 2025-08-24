'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, Download, ExternalLink } from 'lucide-react'
import { apiService } from '@/lib/api'

interface Journal {
  id: string
  title: string
  description: string
  published_date: string
  file_url: string
}

export default function JournalContent() {
  const [journals, setJournals] = useState<Journal[]>([])
  const [loading, setLoading] = useState(true)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        setLoading(true)
        const response = await apiService.getJournalArticles()
        if (response.results && Array.isArray(response.results)) {
          setJournals(response.results)
        } else {
          // Fallback data
          setJournals([
            {
              id: '1',
              title: 'GALR Journal Volume 1, Issue 1',
              description: 'Inaugural issue featuring foundational articles on ADR in India',
              published_date: '2023-01-01',
              file_url: '/journals/galr-vol1-issue1.pdf'
            }
          ])
        }
      } catch (err) {
        console.error('Error fetching journals:', err)
        setJournals([
          {
            id: '1',
            title: 'GALR Journal Volume 1, Issue 1',
            description: 'Inaugural issue featuring foundational articles on ADR in India',
            published_date: '2023-01-01',
            file_url: '/journals/galr-vol1-issue1.pdf'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchJournals()
  }, [])

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-dark-surface">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Academic Publication
            </div>
            <h1 className="heading-1 mb-6">Gujarat ADR Law Review</h1>
            <p className="body-large text-gray-600 dark:text-dark-muted max-w-3xl mx-auto">
              A premier academic journal dedicated to advancing scholarship and practice in Alternative Dispute Resolution.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-dark-muted">Loading journal issues...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {journals.map((journal, index) => (
                <motion.div
                  key={journal.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-600 p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-6 lg:mb-0">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-3">
                        {journal.title}
                      </h3>
                      <p className="text-gray-600 dark:text-dark-muted mb-4">
                        {journal.description}
                      </p>
                      <div className="text-sm text-gray-500 dark:text-dark-muted">
                        Published: {new Date(journal.published_date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={journal.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center justify-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </a>
                      <a
                        href={journal.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary inline-flex items-center justify-center space-x-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View Online</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
