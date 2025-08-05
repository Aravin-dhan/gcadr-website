'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface NavigationItem {
  name: string
  href: string
  submenu?: { name: string; href: string }[]
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'About Us',
    href: '/about',
    submenu: [
      { name: 'About GCADR', href: '/about' },
      { name: 'Leadership', href: '/about/leadership' },
      { name: 'Team', href: '/about/team' },
    ]
  },
  {
    name: 'Publications',
    href: '/publications',
    submenu: [
      { name: 'GALR Blog', href: '/publications/blog' },
      { name: 'GALR Journal', href: '/publications/journal' },
      { name: 'Newsletter', href: '/publications/newsletter' },
      { name: 'Submission Guidelines', href: '/submissions' },
    ]
  },
  {
    name: 'Events & Activities',
    href: '/events',
    submenu: [
      { name: 'Upcoming Events', href: '/events' },
      { name: 'Past Events', href: '/events/past' },
      { name: 'Annual Arbitration Week', href: '/events/arbitration-week' },
    ]
  },
  {
    name: 'Work With Us',
    href: '/work-with-us',
    submenu: [
      { name: 'Internships', href: '/work-with-us/internships' },
      { name: 'Research Assistantship', href: '/work-with-us/research' },
      { name: 'Collaborations', href: '/work-with-us/collaborations' },
    ]
  },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact Us', href: '/contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-700 dark:bg-primary-800 shadow-lg transition-all duration-300">
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center">
            <div className="h-12 flex items-center justify-center">
              <img
                src="/gcadr-golden-logo.jpg"
                alt="GCADR Logo"
                className="h-full w-auto object-contain rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <div className="text-xl font-bold text-accent-300" style={{ display: 'none' }}>GCADR</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} pathname={pathname} resolvedTheme={resolvedTheme} />
            ))}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-lg text-accent-200 hover:text-accent-300 hover:bg-primary-600 transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-accent-200 hover:text-accent-300 hover:bg-primary-600 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-primary-600/20 py-4"
            >
              <div className="space-y-2">
                {navigation.map((item) => (
                  <MobileNavItem key={item.name} item={item} pathname={pathname} resolvedTheme={resolvedTheme} />
                ))}
                <div className="pt-4 border-t border-primary-600/20">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center w-full px-3 py-2 text-accent-200 hover:text-accent-300 hover:bg-primary-600 rounded-md transition-colors"
                  >
                    {resolvedTheme === 'dark' ? <Sun className="w-5 h-5 mr-3" /> : <Moon className="w-5 h-5 mr-3" />}
                    {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

function NavItem({ item, pathname, resolvedTheme }: { item: NavigationItem; pathname: string; resolvedTheme: 'light' | 'dark' }) {
  const [isOpen, setIsOpen] = useState(false)
  const isActive = pathname === item.href || (item.submenu && item.submenu.some(sub => pathname === sub.href))

  if (item.submenu) {
    return (
      <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        <button className={`px-3 py-2 rounded-md text-base font-bold transition-colors flex items-center ${
          resolvedTheme === 'dark'
            ? (isActive ? 'text-golden-400 bg-primary-600' : 'text-golden-500 hover:text-golden-400 hover:bg-primary-600')
            : ['About Us', 'Publications', 'Events & Activities'].includes(item.name)
              ? (isActive ? 'text-golden-400 bg-primary-600' : 'text-golden-500 hover:text-golden-400 hover:bg-primary-600')
              : (isActive ? 'text-accent-300 bg-primary-600' : 'text-accent-200 hover:text-accent-300 hover:bg-primary-600')
        }`}>
          {item.name}
          <ChevronDown className="w-4 h-4 ml-1" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-dark-card rounded-lg shadow-xl border border-gray-200 dark:border-dark-border py-2"
            >
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  className={`block px-4 py-2 text-sm hover:bg-primary-50 transition-colors ${
                    pathname === subItem.href ? 'text-primary-700 bg-primary-100' : 'text-gray-700 hover:text-primary-700'
                  }`}
                >
                  {subItem.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      prefetch={true}
      className={`px-3 py-2 rounded-md text-base font-bold transition-colors ${
        resolvedTheme === 'dark'
          ? (isActive ? 'text-golden-400 bg-primary-600' : 'text-golden-500 hover:text-golden-400 hover:bg-primary-600')
          : ['About Us', 'Publications', 'Events & Activities'].includes(item.name)
            ? (isActive ? 'text-golden-400 bg-primary-600' : 'text-golden-500 hover:text-golden-400 hover:bg-primary-600')
            : (isActive ? 'text-accent-300 bg-primary-600' : 'text-accent-200 hover:text-accent-300 hover:bg-primary-600')
      }`}
    >
      {item.name}
    </Link>
  )
}

function MobileNavItem({ item, pathname, resolvedTheme }: { item: NavigationItem; pathname: string; resolvedTheme: 'light' | 'dark' }) {
  const [isOpen, setIsOpen] = useState(false)
  const isActive = pathname === item.href || (item.submenu && item.submenu.some(sub => pathname === sub.href))

  if (item.submenu) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-2 text-left rounded-lg font-bold transition-colors ${
            resolvedTheme === 'dark'
              ? (isActive ? 'text-golden-400 bg-primary-600' : 'text-golden-500 hover:text-golden-400 hover:bg-primary-600')
              : ['About Us', 'Publications', 'Events & Activities'].includes(item.name)
                ? (isActive ? 'text-golden-400 bg-primary-50' : 'text-golden-500 hover:text-golden-400 hover:bg-primary-50')
                : (isActive ? 'text-accent-300 bg-primary-600' : 'text-accent-200 hover:text-accent-300 hover:bg-primary-600')
          }`}
        >
          {item.name}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-4 mt-2 space-y-1"
            >
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                    pathname === subItem.href ? 'text-primary-700 bg-primary-100' : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  {subItem.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={`block px-4 py-2 rounded-lg font-bold transition-colors ${
        resolvedTheme === 'dark'
          ? (isActive ? 'text-golden-400 bg-primary-600' : 'text-golden-500 hover:text-golden-400 hover:bg-primary-600')
          : ['About Us', 'Publications', 'Events & Activities'].includes(item.name)
            ? (isActive ? 'text-golden-400 bg-primary-50' : 'text-golden-500 hover:text-golden-400 hover:bg-primary-50')
            : (isActive ? 'text-accent-300 bg-primary-600' : 'text-accent-200 hover:text-accent-300 hover:bg-primary-600')
      }`}
    >
      {item.name}
    </Link>
  )
}
