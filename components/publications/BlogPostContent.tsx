'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, User, Tag, ArrowLeft, Share2, BookOpen } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  author_display_name: string
  author_bio?: string
  category_name: string
  created_at: string
  keywords: string[]
  content: string
}

interface Props {
  post: BlogPost
}

export function BlogPostContent({ post }: Props) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:to-primary-900 text-white relative overflow-hidden py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container-max section-padding relative">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/publications/blog"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span className="inline-flex items-center px-3 py-1 bg-white/20 text-white rounded-full backdrop-blur-sm">
                  {post.category_name}
                </span>
                <div className="flex items-center text-white/80">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(post.created_at)}
                </div>
                <div className="flex items-center text-white/80">
                  <User className="w-4 h-4 mr-2" />
                  {post.author_display_name}
                </div>
              </div>

              <h1 className="heading-1 text-white leading-tight">{post.title}</h1>

              {post.author_bio && (
                <p className="text-white/90 italic body-large">
                  {post.author_bio}
                </p>
              )}

              <p className="body-hero text-white/90">
                {post.excerpt}
              </p>
              
              {/* Keywords */}
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-primary-600 dark:bg-primary-700 text-white dark:text-gray-100 text-xs rounded-full font-medium"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={ref} className="py-16 bg-gradient-to-br from-gray-50 to-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-200">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-200">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-700 dark:text-gray-200">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary-500 pl-4 py-2 my-6 bg-primary-50 dark:bg-primary-900/30 italic text-gray-700 dark:text-gray-200">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border border-gray-200 dark:border-gray-600">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-left font-semibold text-gray-900 dark:text-white">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200">
                      {children}
                    </td>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      {children}
                    </strong>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
                      {children}
                    </code>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </motion.article>

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Share2 className="w-5 h-5 text-gray-600 dark:text-dark-muted" />
                  <span className="text-gray-600 dark:text-dark-muted">Share this article</span>
                </div>
                <Link
                  href="/publications/blog"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>More Articles</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
