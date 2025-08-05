'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ImageCarousel } from './ImageCarousel'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 lg:py-32 overflow-hidden">
        <div className="container-max section-padding relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/gnlu-logo.jpg"
                    alt="GNLU Logo"
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                    <span>Gujarat National Law University</span>
                  </div>
                </div>
                <h1 className="heading-1">
                  <span className="block">Centre for</span>
                  <span className="block text-primary-600">Alternative Dispute</span>
                  <span className="block">Resolution</span>
                </h1>
                <p className="body-large max-w-xl text-secondary-600 dark:text-slate-400">
                  Advancing ADR education, research, and practice through innovative programs,
                  scholarly publications, and community engagement since 2010.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about" className="btn-primary group">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/work-with-us" className="btn-secondary">
                  Work With Us
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container-max section-padding relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
              >
                <span>Gujarat National Law University</span>
              </motion.div>
              
              <h1 className="heading-1">
                <span className="block">Centre for</span>
                <span className="block text-primary-600">Alternative Dispute</span>
                <span className="block">Resolution</span>
              </h1>
              
              <p className="body-large max-w-xl">
                Advancing ADR education, research, and practice through innovative programs, 
                scholarly publications, and community engagement since 2010.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/about" className="btn-primary group">
                Learn More About Us
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/work-with-us" className="btn-secondary">
                Work With Us
              </Link>
            </motion.div>

            {/* Quick Stats */}

          </motion.div>

          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <ImageCarousel compact={true} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}