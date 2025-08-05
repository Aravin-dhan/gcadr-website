'use client'

import { motion } from 'framer-motion'

// Skeleton loader for cards
export function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card dark:bg-dark-card dark:border-dark-border animate-pulse">
          <div className="aspect-video bg-gray-200 dark:bg-dark-surface rounded-t-lg"></div>
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-3 bg-gray-200 dark:bg-dark-surface rounded w-20"></div>
              <div className="h-3 bg-gray-200 dark:bg-dark-surface rounded w-24"></div>
            </div>
            <div className="h-6 bg-gray-200 dark:bg-dark-surface rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-dark-surface rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-dark-surface rounded w-5/6"></div>
            </div>
            <div className="flex space-x-2">
              <div className="h-6 bg-gray-200 dark:bg-dark-surface rounded-full w-16"></div>
              <div className="h-6 bg-gray-200 dark:bg-dark-surface rounded-full w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

// Team member skeleton
export function TeamMemberSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card dark:bg-dark-card dark:border-dark-border p-6 animate-pulse">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-dark-surface rounded-full"></div>
          </div>
          <div className="text-center space-y-2">
            <div className="h-5 bg-gray-200 dark:bg-dark-surface rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 dark:bg-dark-surface rounded w-1/2 mx-auto"></div>
            <div className="h-3 bg-gray-200 dark:bg-dark-surface rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      ))}
    </>
  )
}

// Spinner component
export function Spinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizeClasses[size]} border-2 border-primary-200 border-t-primary-600 rounded-full ${className}`}
    />
  )
}

// Loading overlay
export function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="bg-white dark:bg-dark-card rounded-lg p-8 flex flex-col items-center space-y-4">
        <Spinner size="lg" />
        <p className="text-gray-600 dark:text-dark-muted">{message}</p>
      </div>
    </motion.div>
  )
}

// Page loading component
export function PageLoading({ message = 'Loading page...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
      <div className="text-center space-y-4">
        <Spinner size="lg" className="mx-auto" />
        <p className="text-gray-600 dark:text-dark-muted">{message}</p>
      </div>
    </div>
  )
}

// Error state component
export function ErrorState({ 
  message = 'Something went wrong', 
  onRetry,
  showRetry = true 
}: { 
  message?: string
  onRetry?: () => void
  showRetry?: boolean 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-2">Error</h3>
      <p className="text-gray-600 dark:text-dark-muted mb-4">{message}</p>
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary"
        >
          Try Again
        </button>
      )}
    </motion.div>
  )
}

// Empty state component
export function EmptyState({ 
  title = 'No data found',
  description = 'There are no items to display at the moment.',
  icon,
  action
}: {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="w-16 h-16 bg-gray-100 dark:bg-dark-surface rounded-full flex items-center justify-center mx-auto mb-4">
        {icon || (
          <svg className="w-8 h-8 text-gray-400 dark:text-dark-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4a1 1 0 00-1-1H9a1 1 0 00-1 1v1" />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-dark-muted mb-4">{description}</p>
      {action}
    </motion.div>
  )
}

// Form loading state
export function FormLoading() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Spinner size="sm" />
      <span className="text-sm text-gray-600 dark:text-dark-muted">Submitting...</span>
    </div>
  )
}
