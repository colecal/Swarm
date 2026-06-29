'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',             label: 'Home'         },
  { href: '/services',     label: 'Services'     },
  { href: '/about',        label: 'About'        },
  { href: '/pricing',      label: 'Pricing'      },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/contact',      label: 'Contact'      },
]

export default function Navigation() {
  const pathname  = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#04040f]/90 backdrop-blur-xl border-b border-[rgba(0,212,255,0.1)] shadow-[0_0_30px_rgba(0,212,255,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Hex icon */}
          <div className="relative w-9 h-9">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <polygon
                points="20,2 36,11 36,29 20,38 4,29 4,11"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="1.5"
                className="group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.8)] transition-all duration-300"
              />
              <polygon
                points="20,8 30,14 30,26 20,32 10,26 10,14"
                fill="rgba(0,212,255,0.08)"
                stroke="rgba(0,212,255,0.3)"
                strokeWidth="0.5"
              />
              <text x="20" y="25" textAnchor="middle" fontSize="12" fill="#00d4ff" fontFamily="Orbitron" fontWeight="700">A</text>
            </svg>
          </div>
          <span className="font-orbitron font-bold text-xl tracking-widest text-white group-hover:text-glow-cyan transition-all duration-300">
            ARKEY
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-inter text-sm tracking-wide transition-all duration-300 relative group ${
                pathname === l.href
                  ? 'text-[#00d4ff] text-glow-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {l.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] transition-all duration-300 ${
                pathname === l.href ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="/contact" className="btn-cyber text-sm">
            GET STARTED
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-[#00d4ff] transition-all duration-300 ${open ? 'rotate-45 translate-y-2.5' : ''}`} />
          <span className={`block w-6 h-px bg-[#00d4ff] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-[#00d4ff] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-[#04040f]/95 backdrop-blur-xl border-t border-[rgba(0,212,255,0.1)] px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-inter text-sm tracking-wide py-2 border-b border-[rgba(0,212,255,0.08)] transition-all duration-300 ${
                pathname === l.href ? 'text-[#00d4ff]' : 'text-slate-400'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-cyber text-sm text-center mt-2">
            GET STARTED
          </Link>
        </div>
      </div>
    </nav>
  )
}
