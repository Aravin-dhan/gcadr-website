'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

interface CarouselImage {
  id: string
  title: string
  description: string
  image: string
  link_url?: string
  is_active: boolean
  order: number
}

interface ImageCarouselProps {
  compact?: boolean
}

export function ImageCarousel({ compact = false }: ImageCarouselProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [images, setImages] = useState<CarouselImage[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ||
          (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')
            ? 'https://gcadr-website.onrender.com'
            : 'http://localhost:8000')

        const response = await fetch(`${API_BASE_URL}/api/carousel/`)
        if (response.ok) {
          const data = await response.json()
          const imagesArray = Array.isArray(data) ? data : (data.results || [])
          setImages(imagesArray.map((img: any) => ({
            ...img,
            image: img.image_url || img.image
          })))
        } else {
          // Fallback images
          setImages([
            {
              id: '1',
              title: 'GCADR Research Excellence',
              description: 'Leading research in alternative dispute resolution and legal innovation.',
              image: '/carousel/research.jpg',
              link_url: '/publications',
              is_active: true,
              order: 1
            },
            {
              id: '2',
              title: 'Annual Arbitration Week',
              description: 'Join us for our flagship event featuring renowned experts from around the world.',
              image: '/carousel/arbitration-week.jpg',
              link_url: '/events/arbitration-week',
              is_active: true,
              order: 2
            },
            {
              id: '3',
              title: 'GNLU Campus',
              description: 'State-of-the-art facilities supporting world-class legal education.',
              image: '/carousel/campus.jpg',
              link_url: '/about',
              is_active: true,
              order: 3
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching carousel images:', error)
        // Fallback images on error
        setImages([
          {
            id: '1',
            title: 'GCADR Research Excellence',
            description: 'Leading research in alternative dispute resolution and legal innovation.',
            image: '/carousel/research.jpg',
            link_url: '/publications',
            is_active: true,
            order: 1
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 5000) // Auto-advance every 5 seconds

      return () => clearInterval(interval)
    }
  }, [images.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (loading) {
    return (
      <div className={compact ? "" : "py-16 bg-gray-100"}>
        <div className={compact ? "" : "container-max section-padding"}>
          <div className={`${compact ? "aspect-[4/3]" : "aspect-[16/9] lg:aspect-[21/9]"} bg-gray-200 rounded-2xl animate-pulse`}></div>
        </div>
      </div>
    )
  }

  if (images.length === 0) {
    return null
  }

  const currentImage = images[currentIndex]

  return (
    <div ref={ref} className={compact ? "" : "py-16 bg-gradient-to-br from-gray-50 to-white"}>
      <div className={compact ? "" : "container-max section-padding"}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={`relative ${compact ? "aspect-[4/3]" : "aspect-[16/9] lg:aspect-[21/9]"} rounded-2xl overflow-hidden shadow-2xl group`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={currentImage.image}
                alt={currentImage.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to a gradient background if image fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  }
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Content */}
              {!compact && (
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-3xl"
                  >
                    <h3 className="heading-3 mb-4">{currentImage.title}</h3>
                    <p className="body-large mb-6 opacity-90">{currentImage.description}</p>

                    {currentImage.link_url && (
                      <a
                        href={currentImage.link_url}
                        className="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-all duration-300 font-medium"
                      >
                        Learn More
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    )}
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white scale-110'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
