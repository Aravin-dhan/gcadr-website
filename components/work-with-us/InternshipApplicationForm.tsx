'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Send, AlertCircle } from 'lucide-react'

export function InternshipApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    course: '',
    year: '',
    proposedStartDate: '',
    proposedEndDate: '',
    interestLetter: '',
    cv: null as File | null,
    writingSample: null as File | null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, [fieldName]: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value)
        }
      })

      const response = await fetch('http://localhost:8000/api/internship/apply/', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          university: '',
          course: '',
          year: '',
          proposedStartDate: '',
          proposedEndDate: '',
          interestLetter: '',
          cv: null,
          writingSample: null,
        })
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
    <div className="card p-8">
      <div className="text-center mb-8">
        <h3 className="heading-3 mb-4">Apply for Internship</h3>
        <p className="body-base text-secondary-600">
          Fill out the form below to apply for an internship with GCADR
        </p>
      </div>

      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center space-x-2 text-green-800">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Application submitted successfully!</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            We will review your application and get back to you within 2 weeks.
          </p>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center space-x-2 text-red-800">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Error submitting application</span>
          </div>
          <p className="text-sm text-red-700 mt-1">
            Please try again or contact us directly at gcadr@gnlu.ac.in
          </p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
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

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-secondary-900 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="university" className="block text-sm font-medium text-secondary-900 mb-2">
              University/Institution *
            </label>
            <input
              type="text"
              id="university"
              name="university"
              required
              value={formData.university}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-secondary-900 mb-2">
              Course *
            </label>
            <select
              id="course"
              name="course"
              required
              value={formData.course}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select Course</option>
              <option value="3-year-llb">3 Year LLB</option>
              <option value="5-year-llb">5 Year LLB</option>
              <option value="llm">LLM</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-secondary-900 mb-2">
              Current Year *
            </label>
            <select
              id="year"
              name="year"
              required
              value={formData.year}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
              <option value="5th">5th Year</option>
            </select>
          </div>
        </div>

        {/* Proposed Dates */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="proposedStartDate" className="block text-sm font-medium text-secondary-900 mb-2">
              Proposed Start Date *
            </label>
            <input
              type="date"
              id="proposedStartDate"
              name="proposedStartDate"
              required
              value={formData.proposedStartDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="proposedEndDate" className="block text-sm font-medium text-secondary-900 mb-2">
              Proposed End Date *
            </label>
            <input
              type="date"
              id="proposedEndDate"
              name="proposedEndDate"
              required
              value={formData.proposedEndDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Interest Letter */}
        <div>
          <label htmlFor="interestLetter" className="block text-sm font-medium text-secondary-900 mb-2">
            Expression of Interest (300 words) *
          </label>
          <textarea
            id="interestLetter"
            name="interestLetter"
            required
            rows={6}
            value={formData.interestLetter}
            onChange={handleInputChange}
            placeholder="Describe your interest in working with GCADR..."
            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* File Uploads */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="cv" className="block text-sm font-medium text-secondary-900 mb-2">
              Curriculum Vitae (PDF) *
            </label>
            <div className="relative">
              <input
                type="file"
                id="cv"
                name="cv"
                accept=".pdf"
                required
                onChange={(e) => handleFileChange(e, 'cv')}
                className="hidden"
              />
              <label
                htmlFor="cv"
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg cursor-pointer hover:bg-secondary-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Upload className="w-5 h-5 text-secondary-500" />
                <span className="text-secondary-700">
                  {formData.cv ? formData.cv.name : 'Upload CV'}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="writingSample" className="block text-sm font-medium text-secondary-900 mb-2">
              Writing Sample (PDF) *
            </label>
            <div className="relative">
              <input
                type="file"
                id="writingSample"
                name="writingSample"
                accept=".pdf"
                required
                onChange={(e) => handleFileChange(e, 'writingSample')}
                className="hidden"
              />
              <label
                htmlFor="writingSample"
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg cursor-pointer hover:bg-secondary-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Upload className="w-5 h-5 text-secondary-500" />
                <span className="text-secondary-700">
                  {formData.writingSample ? formData.writingSample.name : 'Upload Writing Sample'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Application</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
