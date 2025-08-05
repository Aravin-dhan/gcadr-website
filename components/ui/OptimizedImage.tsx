'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholder?: string
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  priority = false,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observerRef.current?.disconnect()
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before the image comes into view
        threshold: 0.1
      }
    )

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [priority, isInView])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Generate placeholder if not provided
  const defaultPlaceholder = `data:image/svg+xml;base64,${btoa(`
    <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">
        Loading...
      </text>
    </svg>
  `)}`

  const errorPlaceholder = `data:image/svg+xml;base64,${btoa(`
    <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fef2f2"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#ef4444" font-family="Arial, sans-serif" font-size="14">
        Failed to load
      </text>
    </svg>
  `)}`

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <motion.img
          src={placeholder || defaultPlaceholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 1 }}
          animate={{ opacity: isInView ? 1 : 0.5 }}
        />
      )}

      {/* Error state */}
      {hasError && (
        <img
          src={errorPlaceholder}
          alt="Failed to load image"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}

      {/* Loading overlay */}
      {isInView && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-dark-surface">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 border-2 border-gray-300 border-t-primary-600 rounded-full"
          />
        </div>
      )}
    </div>
  )
}

// Avatar component with fallback
export function Avatar({
  src,
  name,
  size = 'md',
  className = ''
}: {
  src?: string
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const [hasError, setHasError] = useState(false)

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl'
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (!src || hasError) {
    return (
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 rounded-full flex items-center justify-center text-white font-semibold ${className}`}>
        {getInitials(name)}
      </div>
    )
  }

  return (
    <OptimizedImage
      src={src}
      alt={name}
      className={`${sizeClasses[size]} rounded-full ${className}`}
      onError={() => setHasError(true)}
      priority={false}
    />
  )
}

// Gallery image with zoom effect
export function GalleryImage({
  src,
  alt,
  caption,
  onClick
}: {
  src: string
  alt: string
  caption?: string
  onClick?: () => void
}) {
  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg aspect-square">
        <OptimizedImage
          src={src}
          alt={alt}
          className="w-full h-full group-hover:scale-110 transition-transform duration-300"
        />
        {caption && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-white text-sm font-medium">{caption}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
