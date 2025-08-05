'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, User, ArrowRight, Search } from 'lucide-react'
import Link from 'next/link'
import { api, handleApiError } from '@/lib/api'
import { CardSkeleton, ErrorState, EmptyState } from '@/components/ui/LoadingStates'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  author_display_name: string
  category_name?: string
  featured_image?: string
  created_at: string
  tags: Array<{ name: string; slug: string }>
}

export function BlogGrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])

  const fetchBlogPosts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.blogs.list()
      const posts = data.results || data
      setBlogPosts(posts)
      setFilteredPosts(posts)
    } catch (err) {
      const errorMessage = handleApiError(err)
      setError(errorMessage)
      // Fallback data for development
      if (process.env.NODE_ENV === 'development') {
        const fallbackPosts = [
          {
            id: '1',
            title: 'The Future of Alternative Dispute Resolution in India',
            slug: 'future-adr-india',
            excerpt: 'Exploring the evolving landscape of ADR mechanisms and their growing importance in the Indian legal system.',
            author_display_name: 'GCADR Team',
            category_name: 'Analysis',
            created_at: '2024-01-15T10:00:00Z',
            tags: [{ name: 'ADR', slug: 'adr' }, { name: 'India', slug: 'india' }]
          },
          {
            id: '2',
            title: 'Mediation vs Arbitration: Understanding the Differences',
            slug: 'mediation-vs-arbitration',
            excerpt: 'A comprehensive comparison of mediation and arbitration processes, helping you choose the right ADR method.',
            author_display_name: 'GCADR Team',
            category_name: 'Education',
            created_at: '2024-01-10T10:00:00Z',
            tags: [{ name: 'Mediation', slug: 'mediation' }, { name: 'Arbitration', slug: 'arbitration' }]
          },
          {
            id: '3',
            title: 'Recent Developments in International Commercial Arbitration',
            slug: 'international-commercial-arbitration',
            excerpt: 'An overview of recent trends and developments in international commercial arbitration practices.',
            author_display_name: 'GCADR Team',
            category_name: 'International',
            created_at: '2024-01-05T10:00:00Z',
            tags: [{ name: 'International', slug: 'international' }, { name: 'Commercial', slug: 'commercial' }]
          }
        ]
        setBlogPosts(fallbackPosts)
        setFilteredPosts(fallbackPosts)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = blogPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredPosts(filtered)
    } else {
      setFilteredPosts(blogPosts)
    }
  }, [searchTerm, blogPosts])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-dark-surface">
        <div className="container-max section-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardSkeleton count={6} />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-dark-surface">
        <div className="container-max section-padding">
          <ErrorState
            message={error}
            onRetry={fetchBlogPosts}
          />
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-dark-surface">
      <div className="container-max section-padding">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text"
            />
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Link href={`/publications/blog/${post.slug}`} prefetch={true}>
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card dark:bg-dark-card dark:border-dark-border group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer bg-white hover:bg-gradient-to-br hover:from-white hover:to-primary-50"
                >
                {/* Featured Image */}
                {post.featured_image ? (
                  <div className="aspect-video bg-gray-200 dark:bg-dark-surface rounded-t-lg overflow-hidden">
                    <OptimizedImage
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                      <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                        {post.category_name || 'Article'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center text-sm text-gray-500 dark:text-dark-muted mb-3 space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author_display_name}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.created_at)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-dark-text mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-secondary-600 dark:text-dark-muted mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag.slug}
                          className="px-2 py-1 bg-primary-600 dark:bg-primary-700 text-white dark:text-gray-100 text-xs rounded-full font-medium"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More Indicator */}
                  <div className="inline-flex items-center text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 font-medium text-sm group-hover:translate-x-1 transition-all duration-200">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </motion.article>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No posts found"
            description={searchTerm ? `No blog posts match "${searchTerm}"` : 'No blog posts available at the moment.'}
            icon={<Search className="w-8 h-8 text-gray-400 dark:text-dark-muted" />}
          />
        )}
      </div>
    </section>
  )
}
