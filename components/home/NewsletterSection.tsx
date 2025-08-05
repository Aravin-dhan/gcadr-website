'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Send, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

type NewsletterForm = z.infer<typeof newsletterSchema>

export function NewsletterSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterForm) => {
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/newsletter/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
        reset()
      } else {
        throw new Error('Failed to subscribe to newsletter')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      alert('There was an error subscribing to the newsletter. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 dark:from-primary-800 dark:to-accent-800">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-300" />
            <h2 className="heading-2 mb-4">Thank You for Subscribing!</h2>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              You'll receive our latest updates on ADR research, events, and publications directly in your inbox.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-secondary bg-white text-primary-600 hover:bg-gray-100"
            >
              Subscribe Another Email
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 dark:from-primary-800 dark:to-accent-800">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="flex items-center mb-6">
              <Mail className="w-12 h-12 text-white/80 mr-4" />
              <div>
                <div className="text-sm font-medium text-white/80 uppercase tracking-wide">
                  Stay Updated
                </div>
                <h2 className="heading-2 text-accent-300">Join Our Newsletter</h2>
              </div>
            </div>

            <p className="body-large mb-8 text-accent-100 opacity-90">
              Get the latest updates on ADR research, upcoming events, publications,
              and opportunities directly in your inbox. Join our community of legal
              professionals and researchers.
            </p>


          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-slate-600"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="form-error">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="form-error">{errors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Subscribe to Newsletter
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>

              <p className="text-sm text-secondary-600 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
