'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  ExternalLink
} from 'lucide-react'

const footerLinks = {
  quickLinks: [
    { name: 'About Us', href: '/about' },
    { name: 'Work With Us', href: '/work-with-us' },
    { name: 'Events', href: '/events' },
    { name: 'Publications', href: '/publications' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ],
  publications: [
    { name: 'GALR Blog', href: '/publications/blog' },
    { name: 'Journal', href: '/publications/journal' },
    { name: 'Newsletter', href: '/publications/newsletter' },
  ],
  resources: [
    { name: 'ADR Guidelines', href: '/resources/guidelines' },
    { name: 'Training Materials', href: '/resources/training' },
    { name: 'Case Studies', href: '/resources/case-studies' },
    { name: 'Downloads', href: '/resources/downloads' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'YouTube', href: '#', icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-max section-padding">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* About Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src="/gcadr-logo.jpeg"
                    alt="GCADR Logo"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <div className="text-xl font-bold">GCADR</div>
                  <div className="text-sm text-secondary-300">Gujarat National Law University</div>
                </div>
              </div>
              
              <p className="text-secondary-300 mb-6 leading-relaxed">
                Advancing ADR education, research, and practice through innovative programs, 
                scholarly publications, and community engagement since 2010.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-secondary-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Publications */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Publications</h3>
              <ul className="space-y-3">
                {footerLinks.publications.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-secondary-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                  <div className="text-secondary-300">
                    <div>Gujarat National Law University</div>
                    <div>Attalika Avenue, Knowledge Corridor</div>
                    <div>Koba, Gandhinagar - 382426</div>
                    <div>Gujarat, India</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <a 
                    href="tel:+917923276611"
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    +91 79 2327 6611
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <a 
                    href="mailto:gcadr@gnlu.ac.in"
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    gcadr@gnlu.ac.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-secondary-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-secondary-400 text-sm">
              © {new Date().getFullYear()} GCADR, Gujarat National Law University. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link 
                href="/privacy-policy" 
                className="text-secondary-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-service" 
                className="text-secondary-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <a 
                href="https://gnlu.ac.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>GNLU</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
