'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin } from 'lucide-react'

export function ContactHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-max section-padding relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                Get in Touch
              </div>
              
              <h1 className="heading-1 text-golden-500 text-5xl lg:text-6xl font-extrabold">
                Contact Us
              </h1>
              
              <p className="text-xl text-primary-100 leading-relaxed max-w-3xl mx-auto">
                Do not hesitate to reach out to us. We're here to answer your questions, discuss collaboration opportunities, and provide information about our programs and services.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Mail className="w-8 h-8 mx-auto mb-4 text-accent-300" />
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-sm text-primary-200">
                  gcadr@gnlu.ac.in
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <MapPin className="w-8 h-8 mx-auto mb-4 text-accent-300" />
                <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                <p className="text-sm text-primary-200">
                  Gujarat National Law University, Gandhinagar
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Phone className="w-8 h-8 mx-auto mb-4 text-accent-300" />
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-sm text-primary-200">
                  Available during office hours
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
