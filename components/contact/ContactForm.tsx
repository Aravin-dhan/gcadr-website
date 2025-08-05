'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, AlertCircle, Upload, X } from 'lucide-react'

export function ContactForm() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [attachedFile, setAttachedFile] = useState<File | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      setAttachedFile(file)
    }
  }

  const removeFile = () => {
    setAttachedFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('subject', formData.subject)
      formDataToSend.append('message', formData.message)

      if (attachedFile) {
        formDataToSend.append('attachment', attachedFile)
      }

      const response = await fetch('http://localhost:8000/api/contact/submit/', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
        setAttachedFile(null)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-slate-900">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto lg:mx-0"
        >
          <div className="mb-8">
            <h2 className="heading-2 mb-4">Send us a Message</h2>
            <p className="body-base text-secondary-600 dark:text-slate-400">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center space-x-2 text-green-800 dark:text-green-300">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Message sent successfully!</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                We'll get back to you within 24-48 hours.
              </p>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center space-x-2 text-red-800 dark:text-red-300">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Error sending message</span>
              </div>
              <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                Please try again or contact us directly at gcadr@gnlu.ac.in
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-secondary-900 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary-900 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us how we can help you..."
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-secondary-900 mb-2">
                Attachment (Optional)
              </label>
              <div className="space-y-3">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-secondary-300 border-dashed rounded-lg cursor-pointer bg-secondary-50 hover:bg-secondary-100 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-secondary-500" />
                      <p className="mb-2 text-sm text-secondary-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-secondary-500">PDF, DOC, DOCX, JPG, PNG (MAX. 10MB)</p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {attachedFile && (
                  <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg border border-primary-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                        <Upload className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-900">{attachedFile.name}</p>
                        <p className="text-xs text-secondary-500">
                          {(attachedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1 text-secondary-500 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
