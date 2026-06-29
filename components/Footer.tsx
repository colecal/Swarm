import Link from 'next/link'

const services = ['AI Strategy', 'Workflow Automation', 'AI Agents & Chatbots', 'Data Intelligence']
const pages    = [
  { href: '/',             label: 'Home'         },
  { href: '/services',     label: 'Services'     },
  { href: '/about',        label: 'About'        },
  { href: '/pricing',      label: 'Pricing'      },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/contact',      label: 'Contact'      },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[rgba(0,212,255,0.1)] bg-[#020208]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 40 40" className="w-8 h-8">
                <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="none" stroke="#00d4ff" strokeWidth="1.5"/>
                <polygon points="20,8 30,14 30,26 20,32 10,26 10,14" fill="rgba(0,212,255,0.08)" stroke="rgba(0,212,255,0.3)" strokeWidth="0.5"/>
                <text x="20" y="25" textAnchor="middle" fontSize="12" fill="#00d4ff" fontFamily="Orbitron" fontWeight="700">A</text>
              </svg>
              <span className="font-orbitron font-bold text-lg tracking-widest text-white">ARKEY</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              AI-powered solutions built specifically for North DFW&apos;s most ambitious small businesses.
            </p>
            <p className="text-xs text-[#00d4ff]/60 font-orbitron tracking-wider">
              ◈ SERVING NORTH TEXAS
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">NAVIGATE</h4>
            <ul className="space-y-2">
              {pages.map(p => (
                <li key={p.href}>
                  <Link href={p.href} className="text-slate-400 text-sm hover:text-white hover:text-glow-cyan transition-all duration-300">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">SERVICES</h4>
            <ul className="space-y-2">
              {services.map(s => (
                <li key={s} className="text-slate-400 text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">CONNECT</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[#00d4ff]">✦</span>
                <span className="text-slate-400 text-sm">North DFW, Texas</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#00d4ff]">✦</span>
                <Link href="/contact" className="text-slate-400 text-sm hover:text-white transition-colors duration-300">
                  Start a Conversation
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#00d4ff]">✦</span>
                <span className="text-slate-400 text-sm">Free Strategy Call</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {['in', 'tw', 'gh'].map(s => (
                <div
                  key={s}
                  className="w-8 h-8 glass-card flex items-center justify-center text-[#00d4ff] text-xs font-orbitron cursor-pointer hover:bg-[rgba(0,212,255,0.1)] transition-all duration-300"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.3)] to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2025 Arkey. All rights reserved. Serving North DFW businesses.
          </p>
          <p className="text-slate-600 text-xs font-orbitron tracking-wider">
            BUILT FOR THE FUTURE OF NORTH TEXAS
          </p>
        </div>
      </div>
    </footer>
  )
}
