import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const services = [
  {
    num:     '01',
    title:   'AI Strategy & Roadmapping',
    tagline: 'Start with a clear plan',
    color:   '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
        <circle cx="32" cy="32" r="14" stroke="#00d4ff" strokeWidth="1.5"/>
        <circle cx="32" cy="32" r="6"  fill="rgba(0,212,255,0.2)" stroke="#00d4ff" strokeWidth="1"/>
        <path d="M32 8v8M32 48v8M8 32h8M48 32h8" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14.3 14.3l5.7 5.7M44 44l5.7 5.7M14.3 49.7l5.7-5.7M44 20l5.7-5.7" stroke="rgba(124,58,237,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="32" cy="32" r="3" fill="#00d4ff"/>
      </svg>
    ),
    description: 'Before touching a single line of code, we map the terrain. Our strategy engagements dig deep into your operations to uncover the highest-ROI AI opportunities and build you a prioritized roadmap.',
    bullets: [
      'Full operations & workflow audit',
      'AI opportunity identification & scoring',
      'Build vs. buy analysis',
      'Phased implementation roadmap',
      'ROI projections per initiative',
      'Technology stack recommendations',
    ],
    outcome: 'Walk away with a crystal-clear AI gameplan — not just buzzwords.',
  },
  {
    num:     '02',
    title:   'Workflow Automation',
    tagline: 'Kill the busywork',
    color:   '#7c3aed',
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
        <rect x="8"  y="18" width="16" height="10" rx="2" stroke="#00d4ff" strokeWidth="1.5"/>
        <rect x="40" y="18" width="16" height="10" rx="2" stroke="#7c3aed" strokeWidth="1.5"/>
        <rect x="24" y="36" width="16" height="10" rx="2" stroke="#00d4ff" strokeWidth="1.5"/>
        <path d="M24 23h16M32 28v8" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M48 23h2a2 2 0 012 2v8a2 2 0 01-2 2H40" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="23" r="2" fill="#00d4ff"/>
        <circle cx="48" cy="23" r="2" fill="#7c3aed"/>
        <circle cx="32" cy="41" r="2" fill="#00d4ff"/>
      </svg>
    ),
    description: 'Manual processes are profit killers. We connect your tools, automate the repetitive, and give your team back the hours they\'ve been burning on tasks that a well-built AI system can handle instantly.',
    bullets: [
      'End-to-end process mapping',
      'CRM, email, and scheduling automation',
      'Document processing & data entry elimination',
      'Cross-platform workflow integration',
      'Custom automation dashboards',
      'Ongoing monitoring & optimization',
    ],
    outcome: 'Recover 10–40 hours per week per employee. Guaranteed work quality.',
  },
  {
    num:     '03',
    title:   'AI Agents & Chatbots',
    tagline: 'Intelligence that never sleeps',
    color:   '#e879f9',
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
        <rect x="12" y="16" width="40" height="30" rx="4" stroke="#00d4ff" strokeWidth="1.5"/>
        <path d="M22 46l-6 8h32l-6-8" stroke="#00d4ff" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="23" cy="28" r="3" fill="#00d4ff" opacity="0.6"/>
        <circle cx="32" cy="28" r="3" fill="#7c3aed" opacity="0.6"/>
        <circle cx="41" cy="28" r="3" fill="#e879f9" opacity="0.6"/>
        <path d="M20 38h24" stroke="rgba(0,212,255,0.4)" strokeWidth="1" strokeLinecap="round"/>
        <path d="M24 34h8" stroke="rgba(0,212,255,0.4)" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    description: 'Deploy AI agents that work like your best employee — available 24/7, never makes mistakes, and handles everything from customer service to lead qualification to internal operations.',
    bullets: [
      'Custom-trained AI chatbots for your business',
      'Website & CRM lead qualification bots',
      'Customer support automation',
      'Internal knowledge-base AI assistants',
      'Multi-platform deployment (web, SMS, email)',
      'Analytics & continuous improvement',
    ],
    outcome: 'Answer every customer, qualify every lead — even at 2 AM.',
  },
  {
    num:     '04',
    title:   'Data Intelligence',
    tagline: 'Your data, weaponized',
    color:   '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
        <path d="M10 48l10-14 10 8 10-18 10 8" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 48h44M10 16v32" stroke="rgba(0,212,255,0.25)" strokeWidth="1"/>
        <rect x="38" y="10" width="16" height="8"  rx="1.5" stroke="#7c3aed" strokeWidth="1.5"/>
        <rect x="38" y="21" width="16" height="8"  rx="1.5" stroke="#7c3aed" strokeWidth="1.5" opacity="0.65"/>
        <rect x="38" y="32" width="16" height="8"  rx="1.5" stroke="#7c3aed" strokeWidth="1.5" opacity="0.35"/>
        <circle cx="10" cy="48" r="2.5" fill="#00d4ff"/>
        <circle cx="20" cy="34" r="2.5" fill="#00d4ff"/>
        <circle cx="30" cy="42" r="2.5" fill="#00d4ff"/>
        <circle cx="40" cy="24" r="2.5" fill="#7c3aed"/>
        <circle cx="50" cy="32" r="2.5" fill="#7c3aed"/>
      </svg>
    ),
    description: 'Most small businesses are sitting on a goldmine of data they\'re not using. We build the pipelines, dashboards, and AI models that turn raw numbers into the insights your competitors don\'t have.',
    bullets: [
      'Data audit & architecture design',
      'Custom KPI dashboards & reporting',
      'Predictive analytics & forecasting',
      'Customer behavior modeling',
      'Revenue & churn analysis',
      'Automated insight delivery',
    ],
    outcome: 'Know exactly what\'s working, what\'s not, and what to do next.',
  },
]

const process = [
  { step: '01', title: 'Discovery Call',   desc: 'We learn your business, your goals, and your biggest pain points. No pitch — just listening.' },
  { step: '02', title: 'AI Audit',         desc: 'A deep dive into your operations to find every AI opportunity worth pursuing.' },
  { step: '03', title: 'Strategy Delivery', desc: 'You get a clear, prioritized roadmap with ROI projections for each initiative.' },
  { step: '04', title: 'Build & Deploy',   desc: 'We build your AI systems, integrate them into your workflow, and train your team.' },
  { step: '05', title: 'Optimize & Grow',  desc: 'Ongoing monitoring, improvements, and new opportunities as your business scales.' },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, rgba(0,212,255,0.06) 0%, transparent 60%)' }}
        />
        <ScrollReveal>
          <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">WHAT WE BUILD</p>
          <h1 className="font-orbitron font-black text-5xl md:text-7xl text-white mb-6 leading-tight">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-lg leading-relaxed">
            Every service we offer is designed to deliver measurable ROI for North DFW small businesses —
            not just cool demos, but real systems that save time and make money.
          </p>
        </ScrollReveal>
      </section>

      {/* Service blocks */}
      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.num} delay={i * 50}>
              <div className={`glass-card corner-accent p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start`}>
                {/* Left */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    {svc.icon}
                    <div>
                      <p className="font-orbitron text-xs tracking-widest mb-1" style={{ color: svc.color }}>
                        {svc.num} — {svc.tagline}
                      </p>
                      <h2 className="font-orbitron font-bold text-2xl text-white">{svc.title}</h2>
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed mb-6">{svc.description}</p>
                  <div
                    className="p-4 rounded border-l-2 text-sm font-orbitron tracking-wide"
                    style={{
                      borderColor: svc.color,
                      background: `rgba(${svc.color === '#00d4ff' ? '0,212,255' : svc.color === '#7c3aed' ? '124,58,237' : '232,121,249'},0.05)`,
                      color: svc.color,
                    }}
                  >
                    OUTCOME: {svc.outcome}
                  </div>
                </div>
                {/* Right — bullets */}
                <div>
                  <p className="font-orbitron text-xs text-slate-500 tracking-widest mb-4">WHAT&apos;S INCLUDED</p>
                  <ul className="space-y-3">
                    {svc.bullets.map(b => (
                      <li key={b} className="flex items-start gap-3 text-slate-300 text-sm">
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border border-[#00d4ff] flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="relative py-24 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.04) 0%, transparent 70%)' }}
        />
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-orbitron text-xs text-[#7c3aed] tracking-widest mb-4">HOW IT WORKS</p>
              <h2 className="font-orbitron font-bold text-4xl text-white">
                Our <span className="gradient-text">Process</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff] via-[#7c3aed] to-transparent hidden md:block" />
            <div className="space-y-8">
              {process.map((p, i) => (
                <ScrollReveal key={p.step} delay={i * 100}>
                  <div className="flex gap-8 items-start">
                    <div className="relative flex-shrink-0 w-16 h-16 glass-card flex items-center justify-center">
                      <span className="font-orbitron font-black text-sm gradient-text-cyan">{p.step}</span>
                    </div>
                    <div className="pt-3">
                      <h3 className="font-orbitron font-bold text-lg text-white mb-2">{p.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 text-center">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.4)] to-transparent" />
        <ScrollReveal>
          <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">LET&apos;S TALK</p>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-6">
            Ready to Build Your <span className="gradient-text">AI Stack?</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10">
            Start with a free strategy call. We&apos;ll figure out exactly which services will move the needle for your business.
          </p>
          <Link href="/contact" className="btn-cyber-filled">
            BOOK YOUR FREE CALL
          </Link>
        </ScrollReveal>
      </section>
    </>
  )
}
