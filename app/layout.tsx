import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})


export const metadata: Metadata = {
  title: 'GCADR - Gujarat National Law University',
  description: 'GNLU Centre for Alternative Dispute Resolution - Advancing ADR education, research and practice',
  keywords: ['ADR', 'Alternative Dispute Resolution', 'GNLU', 'Gujarat National Law University', 'Arbitration', 'Mediation'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen flex flex-col bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-300 ${inter.variable} ${playfair.variable}`}>
        <ThemeProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}