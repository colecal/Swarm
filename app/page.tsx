import Link from 'next/link'
import TypewriterText from '@/components/TypewriterText'
import ScrollReveal from '@/components/ScrollReveal'

const stats = [
  { value: '50+',  label: 'Businesses Transformed' },
  { value: '90%',  label: 'Average Time Saved'      },
  { value: '3×',   label: 'Average ROI'             },
  { value: '100%', label: 'North Texas Focused'     },
]

const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <circle cx="24" cy="24" r="10" stroke="#00d4ff" strokeWidth="1.5"/>
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9.4 9.4l4.2 4.2M34.4 34.4l4.2 4.2M9.4 38.6l4.2-4.2M34.4 13.6l4.2-4.2" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="4" fill="#00d4ff" opacity="0.6"/>
      </svg>
    ),
    title:   'AI Strategy',
    tagline: 'Your roadmap to intelligence',
    desc:    'We audit your operations, identify high-impact AI opportunities, and deliver a clear, actionable roadmap tailored to your business.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect x="6" y="14" width="12" height="8" rx="2" stroke="#00d4ff" strokeWidth="1.5"/>
        <rect x="30" y="14" width="12" height="8" rx="2" stroke="#7c3aed" strokeWidth="1.5"/>
        <rect x="18" y="28" width="12" height="8" rx="2" stroke="#00d4ff" strokeWidth="1.5"/>
        <path d="M18 18h12M24 22v6" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M36 18h2a2 2 0 012 2v6a2 2 0 01-2 2h-8" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title:   'Workflow Automation',
    tagline: 'Eliminate the busywork',
    desc:    'Connect your tools, automate repetitive tasks, and free your team to focus on what actually grows the business.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect x="6" y="8" width="36" height="28" rx="3" stroke="#00d4ff" strokeWidth="1.5"/>
        <path d="M14 28l6-8 6 6 6-10 6 4" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="28" r="2" fill="#00d4ff"/>
        <circle cx="20" cy="20" r="2" fill="#00d4ff"/>
        <circle cx="26" cy="26" r="2" fill="#00d4ff"/>
        <circle cx="32" cy="16" r="2" fill="#7c3aed"/>
        <circle cx="38" cy="20" r="2" fill="#7c3aed"/>
        <path d="M18 40h12" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M24 36v4" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title:   'AI Agents & Chatbots',
    tagline: 'Always-on intelligence',
    desc:    'Custom AI assistants that handle customer inquiries, qualify leads, and automate internal operations — 24/7.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M8 36l8-10 8 6 8-14 8 6" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 36h32" stroke="rgba(0,212,255,0.3)" strokeWidth="1"/>
        <path d="M8 12v24" stroke="rgba(0,212,255,0.3)" strokeWidth="1"/>
        <rect x="28" y="8" width="12" height="6" rx="1" stroke="#7c3aed" strokeWidth="1.5"/>
        <rect x="28" y="17" width="12" height="6" rx="1" stroke="#7c3aed" strokeWidth="1.5" opacity="0.6"/>
        <rect x="28" y="26" width="12" height="6" rx="1" stroke="#7c3aed" strokeWidth="1.5" opacity="0.3"/>
      </svg>
    ),
    title:   'Data Intelligence',
    tagline: 'Turn data into decisions',
    desc:    'We transform your raw business data into clear dashboards and AI-driven insights that reveal what\'s working and what\'s not.',
  },
]

const differentiators = [
  {
    num:   '01',
    title: 'Built for Small Business',
    desc:  'No bloated enterprise contracts. We right-size AI solutions to your budget and bandwidth, delivering real ROI from day one.',
  },
  {
    num:   '02',
    title: 'North Texas Native',
    desc:  'We live and work in North DFW. We know the local market, the challenges, and the opportunities better than any out-of-state firm.',
  },
  {
    num:   '03',
    title: 'Strategy to Deployment',
    desc:  'We don\'t just consult — we build. From your first AI roadmap to go-live, we\'re with you every step of the way.',
  },
  {
    num:   '04',
    title: 'Ongoing Partnership',
    desc:  'AI isn\'t a one-time project. We evolve your systems continuously as the technology and your business grow together.',
  },
]

const marqueeItems = [
  'AI STRATEGY', 'WORKFLOW AUTOMATION', 'AI AGENTS', 'DATA INTELLIGENCE',
  'NORTH DFW', 'SMALL BUSINESS AI', 'PROCESS AUTOMATION', 'CUSTOM CHATBOTS',
  'BUSINESS INTELLIGENCE', 'AI ROADMAPPING', 'GROWTH SOLUTIONS', 'FUTURE-PROOF',
]

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* Radial glow behind hero text */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)',
          }}
        />

        {/* Badge */}
        <div className="animate-fade-in mb-8 inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-xs font-orbitron tracking-widest text-[#00d4ff]">
          <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse-slow" />
          NORTH DFW&apos;S AI CONSULTING PARTNER
        </div>

        {/* Main headline */}
        <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl leading-none mb-6 tracking-tight animate-fade-in">
          <span className="block text-white">NORTH TEXAS,</span>
          <span className="block gradient-text mt-2">MEET YOUR</span>
          <span className="block text-white mt-2">AI EDGE.</span>
        </h1>

        {/* Typewriter */}
        <p className="font-orbitron text-lg md:text-2xl text-slate-300 mb-4 animate-fade-in">
          We build{' '}
          <TypewriterText
            words={['Automation', 'AI Agents', 'Data Pipelines', 'Growth Systems', 'Intelligent Workflows']}
            className="gradient-text-cyan"
          />
        </p>

        {/* Subtext */}
        <p className="max-w-2xl text-slate-400 text-base md:text-lg leading-relaxed mb-10 animate-fade-in">
          Arkey arms small businesses across North DFW with cutting-edge AI solutions
          that cut costs, eliminate busywork, and unlock sustainable growth.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
          <Link href="/contact" className="btn-cyber-filled">
            GET YOUR FREE STRATEGY CALL
          </Link>
          <Link href="/services" className="btn-cyber">
            EXPLORE SERVICES
          </Link>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-xs font-orbitron text-slate-600 tracking-widest">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#00d4ff] to-transparent" />
        </div>
      </section>

      {/* ─── Marquee ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden py-5 border-y border-[rgba(0,212,255,0.12)] bg-[rgba(0,212,255,0.02)]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-8 text-xs font-orbitron tracking-widest text-slate-500 flex items-center gap-8">
              {item}
              <span className="text-[#00d4ff] opacity-50">◈</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── Stats ─────────────────────────────────────────────── */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 100}>
              <div className="glass-card corner-accent p-8 text-center">
                <div className="font-orbitron font-black text-4xl md:text-5xl gradient-text mb-2">{s.value}</div>
                <div className="text-slate-400 text-sm tracking-wide">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─── Services preview ──────────────────────────────────── */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">WHAT WE DO</p>
              <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-4">
                Full-Stack <span className="gradient-text">AI Solutions</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                From strategy to deployment, we handle every layer of your AI transformation.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 100}>
                <div className="glass-card corner-accent p-8 h-full flex flex-col">
                  <div className="mb-5">{svc.icon}</div>
                  <h3 className="font-orbitron font-bold text-lg text-white mb-1">{svc.title}</h3>
                  <p className="text-[#00d4ff] text-xs font-orbitron tracking-wider mb-4">{svc.tagline}</p>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">{svc.desc}</p>
                  <Link
                    href="/services"
                    className="mt-6 text-xs font-orbitron text-[#00d4ff] tracking-wider hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    LEARN MORE <span>→</span>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Arkey ─────────────────────────────────────────── */}
      <section className="relative py-24 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.04) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-orbitron text-xs text-[#7c3aed] tracking-widest mb-4">THE ARKEY DIFFERENCE</p>
              <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white">
                Why North Texas Chooses <span className="gradient-text">Arkey</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((d, i) => (
              <ScrollReveal key={d.num} delay={i * 100}>
                <div className="glass-card p-8 flex gap-6">
                  <div className="font-orbitron font-black text-5xl text-[rgba(0,212,255,0.15)] leading-none flex-shrink-0 select-none">
                    {d.num}
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-lg text-white mb-3">{d.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ────────────────────────────────────────── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(124,58,237,0.06) 50%, rgba(232,121,249,0.04) 100%)' }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.5)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(124,58,237,0.5)] to-transparent" />

        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-6">READY TO LEVEL UP?</p>
            <h2 className="font-orbitron font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
              Your Competitors Are<br />
              <span className="gradient-text">Already Using AI.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Let&apos;s build your AI advantage before they do. Book a free strategy call
              — no fluff, just a real conversation about what AI can do for your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-cyber-filled text-base">
                BOOK FREE STRATEGY CALL
              </Link>
              <Link href="/pricing" className="btn-cyber text-base">
                VIEW PRICING
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
