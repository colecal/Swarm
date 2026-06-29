import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import NeuralBackground from '@/components/NeuralBackground'

export const metadata: Metadata = {
  title:       'Arkey | AI Consulting for North Texas Businesses',
  description: 'Arkey delivers cutting-edge AI solutions — automation, intelligent agents, data analytics, and strategic consulting — to small businesses across North DFW.',
  keywords:    'AI consulting, North Texas, DFW, small business, automation, AI agents, chatbots, data analytics, artificial intelligence',
  openGraph: {
    title:       'Arkey | AI Consulting for North Texas Businesses',
    description: 'Future-proof your business with AI. Serving North DFW.',
    type:        'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-[#04040f] text-white overflow-x-hidden">
        <NeuralBackground />
        {/* Subtle cyber-grid overlay */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            zIndex: 1,
          }}
        />
        <Navigation />
        <main className="relative" style={{ zIndex: 10 }}>
          {children}
        </main>
        <div className="relative" style={{ zIndex: 10 }}>
          <Footer />
        </div>
      </body>
    </html>
  )
}
