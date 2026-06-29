import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const values = [
  {
    icon: '◈',
    title: 'Results First',
    desc:  'We measure success by the ROI we generate for your business. No vanity metrics, no fluff — just real, tangible outcomes.',
  },
  {
    icon: '◈',
    title: 'Local Commitment',
    desc:  'We\'re not a remote firm parachuting in. We\'re embedded in North DFW and invested in the success of its business community.',
  },
  {
    icon: '◈',
    title: 'Human + Machine',
    desc:  'AI amplifies great people — it doesn\'t replace them. Everything we build keeps your team empowered and in control.',
  },
  {
    icon: '◈',
    title: 'Radical Transparency',
    desc:  'You\'ll always know what we\'re building, why we\'re building it, and what it\'s costing. No surprises, ever.',
  },
  {
    icon: '◈',
    title: 'Long-Term Partnership',
    desc:  'The best AI systems evolve continuously. We\'re in it for the long haul — growing alongside your business.',
  },
  {
    icon: '◈',
    title: 'Accessible AI',
    desc:  'Cutting-edge AI shouldn\'t be reserved for enterprise. We right-size world-class solutions for small business budgets.',
  },
]

const timeline = [
  {
    year:  '2023',
    event: 'Started consulting for local DFW businesses on AI adoption strategies, seeing firsthand the massive opportunity gap for small businesses.',
  },
  {
    year:  '2024',
    event: 'Built and deployed first suite of custom AI agents and automation systems for North Texas clients, delivering 3× average ROI.',
  },
  {
    year:  '2025',
    event: 'Founded Arkey — a dedicated AI consulting practice built exclusively for North DFW small businesses who refuse to be left behind.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, rgba(124,58,237,0.07) 0%, transparent 60%)' }}
        />
        <ScrollReveal>
          <p className="font-orbitron text-xs text-[#7c3aed] tracking-widest mb-4">OUR STORY</p>
          <h1 className="font-orbitron font-black text-5xl md:text-7xl text-white mb-6">
            About <span className="gradient-text">Arkey</span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-lg leading-relaxed">
            We started Arkey because we saw a clear gap: small businesses in North DFW were being
            left behind in the AI revolution — not because they didn&apos;t want to adopt AI,
            but because no one was making it accessible, practical, or affordable for them.
          </p>
        </ScrollReveal>
      </section>

      {/* Founder section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Founder visual */}
          <ScrollReveal>
            <div className="relative">
              <div className="glass-card corner-accent p-10 text-center">
                {/* Avatar placeholder */}
                <div className="relative mx-auto mb-6 w-40 h-40">
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center text-6xl font-orbitron font-black gradient-text"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(124,58,237,0.1))',
                      border: '1px solid rgba(0,212,255,0.2)',
                    }}
                  >
                    C
                  </div>
                  {/* Orbiting dot */}
                  <div
                    className="absolute w-3 h-3 rounded-full bg-[#00d4ff] animate-float"
                    style={{ top: '10%', right: '5%', boxShadow: '0 0 10px #00d4ff' }}
                  />
                  <div
                    className="absolute w-2 h-2 rounded-full bg-[#7c3aed] animate-float"
                    style={{ bottom: '10%', left: '5%', boxShadow: '0 0 10px #7c3aed', animationDelay: '2s' }}
                  />
                </div>

                <h2 className="font-orbitron font-bold text-2xl text-white mb-1">Cole Calderon</h2>
                <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-6">FOUNDER & AI STRATEGIST</p>

                <div className="space-y-3 text-left">
                  {[
                    'AI Strategy & Implementation',
                    'Workflow Automation Architecture',
                    'North DFW Business Expert',
                    'Small Business Growth Systems',
                  ].map(s => (
                    <div key={s} className="flex items-center gap-3 text-sm text-slate-400">
                      <span className="text-[#00d4ff] text-xs">✦</span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Story */}
          <ScrollReveal delay={200}>
            <div>
              <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">THE FOUNDER</p>
              <h2 className="font-orbitron font-bold text-3xl text-white mb-6">
                Obsessed With What AI Can Do<br />
                <span className="gradient-text">For the Little Guy</span>
              </h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  I grew up watching small businesses in North Texas grind harder than anyone, only to lose ground
                  to larger competitors with more resources. When the AI revolution arrived, I saw the same pattern
                  repeating — and I decided to change it.
                </p>
                <p>
                  Arkey exists because small businesses deserve the same AI capabilities that Fortune 500 companies
                  have. Not a watered-down version — the real thing, built specifically for their scale,
                  their budget, and their goals.
                </p>
                <p>
                  I built this practice to be the AI partner I wish every North DFW small business had — someone
                  local, accountable, and relentlessly focused on ROI.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">THE JOURNEY</p>
              <h2 className="font-orbitron font-bold text-4xl text-white">
                How We Got <span className="gradient-text">Here</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative space-y-0">
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff] via-[#7c3aed] to-transparent" />
            {timeline.map((t, i) => (
              <ScrollReveal key={t.year} delay={i * 150}>
                <div className="flex gap-8 items-start mb-10">
                  <div className="flex-shrink-0 text-right w-14">
                    <span className="font-orbitron font-bold text-sm gradient-text-cyan">{t.year}</span>
                  </div>
                  <div
                    className="flex-shrink-0 w-4 h-4 rounded-full border-2 border-[#00d4ff] bg-[#04040f] mt-0.5"
                    style={{ boxShadow: '0 0 10px rgba(0,212,255,0.5)' }}
                  />
                  <div className="glass-card p-6 flex-1">
                    <p className="text-slate-300 text-sm leading-relaxed">{t.event}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="relative py-16 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.04) 0%, transparent 70%)' }}
        />
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal>
            <div className="glass-card corner-accent p-10">
              <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">OUR MISSION</p>
              <h3 className="font-orbitron font-bold text-2xl text-white mb-4">
                Make AI Work for Every North Texas Business
              </h3>
              <p className="text-slate-400 leading-relaxed">
                To make enterprise-grade AI solutions accessible, practical, and profitable for every
                small business in North DFW — so they can compete with anyone, anywhere.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="glass-card corner-accent p-10">
              <p className="font-orbitron text-xs text-[#7c3aed] tracking-widest mb-4">OUR VISION</p>
              <h3 className="font-orbitron font-bold text-2xl text-white mb-4">
                A North Texas Where Small Business Leads
              </h3>
              <p className="text-slate-400 leading-relaxed">
                We envision a North DFW business community that doesn&apos;t just survive the AI era —
                it thrives in it. Local businesses that are smarter, faster, and more resilient
                because of the AI systems we build together.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">WHAT WE STAND FOR</p>
              <h2 className="font-orbitron font-bold text-4xl text-white">
                Our <span className="gradient-text">Values</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 80}>
                <div className="glass-card p-8 h-full">
                  <div className="text-2xl text-[#00d4ff] mb-4">{v.icon}</div>
                  <h3 className="font-orbitron font-bold text-lg text-white mb-3">{v.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 text-center">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.4)] to-transparent" />
        <ScrollReveal>
          <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">LET&apos;S BUILD TOGETHER</p>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-6">
            Ready to Work With <span className="gradient-text">Arkey?</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10">
            Start with a conversation. We&apos;ll listen, advise, and show you exactly how AI can transform your business.
          </p>
          <Link href="/contact" className="btn-cyber-filled">
            START THE CONVERSATION
          </Link>
        </ScrollReveal>
      </section>
    </>
  )
}
