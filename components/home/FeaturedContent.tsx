'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Calendar, BookOpen, Users } from 'lucide-react'
import { formatDate } from '@/lib/utils'

// Mock data - replace with actual CMS data
const featuredPosts = [
  {
    id: '1',
    title: 'The Future of Alternative Dispute Resolution in India',
    excerpt: 'Exploring emerging trends and technologies shaping the ADR landscape in the Indian legal system.',
    publishedAt: '2024-01-15',
    author: 'Prof. Dr. Vikas Gandhi',
    category: 'Research',
    readTime: 8,
  },
  {
    id: '2',
    title: 'Mediation in Commercial Disputes: Best Practices',
    excerpt: 'A comprehensive guide to effective mediation strategies for resolving commercial conflicts.',
    publishedAt: '2024-01-10',
    author: 'Dr. Priya Sharma',
    category: 'Practice',
    readTime: 6,
  },
  {
    id: '3',
    title: 'International Arbitration: Recent Developments',
    excerpt: 'Analysis of recent changes in international arbitration rules and their implications.',
    publishedAt: '2024-01-05',
    author: 'Prof. Rajesh Kumar',
    category: 'Analysis',
    readTime: 10,
  },
]

const upcomingEvents = [
  {
    id: '1',
    title: 'Annual Arbitration Week 2024',
    description: 'A week-long celebration of arbitration with workshops, seminars, and networking events.',
    date: '2024-03-24',
    location: 'GNLU Campus',
    type: 'Conference',
  },
  {
    id: '2',
    title: 'Mediation Skills Workshop',
    description: 'Hands-on training for developing effective mediation techniques and communication skills.',
    date: '2024-02-15',
    location: 'Online',
    type: 'Workshop',
  },
  {
    id: '3',
    title: 'ADR Research Symposium',
    description: 'Presenting latest research findings and innovations in alternative dispute resolution.',
    date: '2024-02-28',
    location: 'GNLU Campus',
    type: 'Symposium',
  },
]

export function FeaturedContent() {
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
            Latest Updates
          </div>
          <h2 className="heading-2 mb-4">Featured Content & Upcoming Events</h2>
          <p className="body-large max-w-3xl mx-auto">
            Stay updated with our latest research, publications, and upcoming events in the field of Alternative Dispute Resolution.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Featured Posts */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="heading-3 flex items-center">
                <BookOpen className="w-8 h-8 text-primary-600 mr-3" />
                Latest Publications
              </h3>
              <Link href="/publications/blog" className="btn-ghost btn-sm group">
                View All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-6">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="card p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-secondary-500">{post.readTime} min read</span>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-secondary-900 mb-2 hover:text-primary-600 transition-colors">
                    <Link href={`/publications/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h4>
                  
                  <p className="text-secondary-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-secondary-500">
                    <span>By {post.author}</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="heading-3 flex items-center">
                <Calendar className="w-8 h-8 text-accent-600 mr-3" />
                Upcoming Events
              </h3>
              <Link href="/events" className="btn-ghost btn-sm group">
                View All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="card p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">
                      {event.type}
                    </span>
                    <div className="text-right">
                      <div className="text-sm font-medium text-secondary-900">
                        {formatDate(event.date, 'MMM d')}
                      </div>
                      <div className="text-xs text-secondary-500">
                        {formatDate(event.date, 'yyyy')}
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-secondary-900 mb-2 hover:text-accent-600 transition-colors">
                    <Link href={`/events/${event.id}`}>
                      {event.title}
                    </Link>
                  </h4>
                  
                  <p className="text-secondary-600 mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-secondary-500">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{event.location}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
