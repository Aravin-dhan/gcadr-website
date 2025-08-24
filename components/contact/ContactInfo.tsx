'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, MapPin, Clock, ExternalLink } from 'lucide-react'

export function ContactInfo() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto lg:mx-0"
        >
          <div className="mb-8">
            <h2 className="heading-2 mb-4">Contact Information</h2>
            <p className="body-base text-secondary-600">
              Here's how you can reach us and find us.
            </p>
          </div>

          <div className="space-y-8">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Email Address</h3>
                  <p className="text-secondary-600 mb-2">
                    For all inquiries, applications, and general information:
                  </p>
                  <a
                    href="mailto:gcadr@gnlu.ac.in"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    gcadr@gnlu.ac.in
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Location</h3>
                  <p className="text-secondary-600 mb-2">
                    Gujarat National Law University
                  </p>
                  <p className="text-secondary-600 mb-2">
                    Attalika Avenue, Knowledge Corridor<br />
                    Koba, Gandhinagar - 382426<br />
                    Gujarat, India
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="card p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Office Hours</h3>
                  <div className="text-secondary-600 space-y-1">
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Follow Us</h3>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/gcadr_gnlu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">IG</span>
                  </div>
                  <span>@gcadr_gnlu</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="/work-with-us"
                  className="block text-primary-600 hover:text-primary-700 transition-colors"
                >
                  → Apply for Internship
                </a>
                <a
                  href="/submissions"
                  className="block text-primary-600 hover:text-primary-700 transition-colors"
                >
                  → Submit to GALR Blog
                </a>
                <a
                  href="/events"
                  className="block text-primary-600 hover:text-primary-700 transition-colors"
                >
                  → Upcoming Events
                </a>
                <a
                  href="/about"
                  className="block text-primary-600 hover:text-primary-700 transition-colors"
                >
                  → About GCADR
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
