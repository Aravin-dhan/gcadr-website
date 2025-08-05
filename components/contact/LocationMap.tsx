'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, ExternalLink } from 'lucide-react'

export function LocationMap() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </div>
          <h2 className="heading-2 mb-4">Find Us</h2>
          <p className="body-large max-w-3xl mx-auto">
            Gujarat National Law University is located in Gandhinagar, the capital city of Gujarat, India.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Google Maps Embed */}
          <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5234567890123!2d72.6877!3d23.0225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sGujarat%20National%20Law%20University%2C%20Attalika%20Avenue%2C%20Knowledge%20Corridor%2C%20Koba%2C%20Gandhinagar%20-%20382426%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Gujarat National Law University Location"
            ></iframe>
            
            {/* Overlay with university info */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-sm">
              <h3 className="font-semibold text-secondary-900 mb-2">Gujarat National Law University</h3>
              <p className="text-sm text-secondary-600 mb-3">
                Attalika Avenue, Knowledge Corridor<br />
                Koba, Gandhinagar - 382426<br />
                Gujarat, India
              </p>
              <a
                href="https://maps.google.com/?q=Gujarat+National+Law+University,+Gandhinagar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  )
}
