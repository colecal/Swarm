import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const industries = [
  {
    industry: 'Retail & E-Commerce',
    icon: '◈',
    color: '#00d4ff',
    teaser: 'How a Frisco boutique automated their inventory management and customer follow-up — saving 25 hours/week.',
    tags: ['Automation', 'AI Agents', 'CRM Integration'],
    impact: ['25 hrs/week saved', '40% increase in repeat purchases', '3× faster order processing'],
    status: 'Coming Soon',
  },
  {
    industry: 'Professional Services',
    icon: '◈',
    color: '#7c3aed',
    teaser: 'How a Plano accounting firm used AI to automate client onboarding and document processing, cutting admin time by 60%.',
    tags: ['Document AI', 'Workflow Automation', 'Client Chatbot'],
    impact: ['60% less admin time', '2× client capacity', '98% on-time delivery'],
    status: 'Coming Soon',
  },
  {
    industry: 'Home Services',
    icon: '◈',
    color: '#e879f9',
    teaser: 'How a McKinney HVAC company deployed an AI dispatcher and lead-qualification bot that doubled their bookings.',
    tags: ['AI Chatbot', 'Scheduling Automation', 'Lead Qualification'],
    impact: ['2× booking rate', '90% reduction in missed leads', '$180K additional revenue'],
    status: 'Coming Soon',
  },
  {
    industry: 'Real Estate',
    icon: '◈',
    color: '#00d4ff',
    teaser: 'How a DFW property management company used data intelligence to predict maintenance needs before they became emergencies.',
    tags: ['Predictive Analytics', 'Data Intelligence', 'Automation'],
    impact: ['70% fewer emergency repairs', '45% lower maintenance costs', 'Tenant satisfaction up 30%'],
    status: 'Coming Soon',
  },
  {
    industry: 'Healthcare & Wellness',
    icon: '◈',
    color: '#7c3aed',
    teaser: 'How a North Richland Hills wellness clinic automated scheduling, reminders, and patient intake — reducing no-shows by 50%.',
    tags: ['AI Agents', 'Scheduling', 'Patient Automation'],
    impact: ['50% fewer no-shows', '35% admin cost reduction', 'Patient satisfaction 4.9/5'],
    status: 'Coming Soon',
  },
  {
    industry: 'Restaurants & F&B',
    icon: '◈',
    color: '#e879f9',
    teaser: 'How a Denton restaurant chain used AI demand forecasting and inventory optimization to cut food waste by 40%.',
    tags: ['Predictive Analytics', 'Inventory AI', 'Operations'],
    impact: ['40% less food waste', '$2,200/mo cost savings', 'Labor efficiency up 25%'],
    status: 'Coming Soon',
  },
]

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, rgba(232,121,249,0.06) 0%, transparent 60%)' }}
        />
        <ScrollReveal>
          <p className="font-orbitron text-xs text-[#e879f9] tracking-widest mb-4">REAL RESULTS</p>
          <h1 className="font-orbitron font-black text-5xl md:text-7xl text-white mb-6">
            Case <span className="gradient-text">Studies</span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-lg leading-relaxed mb-8">
            We&apos;re just getting started. As we build our portfolio across North DFW, these are
            the types of transformations we deliver — industry by industry.
          </p>

          {/* Launch alert */}
          <div className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#e879f9] animate-pulse-slow" />
            <span className="font-orbitron text-xs text-[#e879f9] tracking-wider">FULL CASE STUDIES LAUNCHING Q3 2025</span>
          </div>
        </ScrollReveal>
      </section>

      {/* Signup CTA */}
      <section className="relative py-8 px-6">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="glass-card p-8 text-center border-[rgba(232,121,249,0.2)]"
              style={{ boxShadow: '0 0 30px rgba(232,121,249,0.08)' }}>
              <p className="font-orbitron text-sm font-bold text-white mb-2">Be First to See the Results</p>
              <p className="text-slate-400 text-sm mb-6">Get notified when we publish our first North DFW case studies.</p>
              <div className="flex gap-3 flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(0,212,255,0.2)] text-white placeholder-slate-600 text-sm px-4 py-3 outline-none focus:border-[rgba(0,212,255,0.5)] transition-colors duration-300 font-inter"
                />
                <Link href="/contact" className="btn-cyber whitespace-nowrap text-sm">
                  NOTIFY ME
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Industry previews */}
      <section className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">INDUSTRIES WE SERVE</p>
              <h2 className="font-orbitron font-bold text-3xl text-white">
                AI Transformation Across<br />
                <span className="gradient-text">North DFW Industries</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((cs, i) => (
              <ScrollReveal key={cs.industry} delay={i * 80}>
                <div className="glass-card corner-accent p-8 h-full flex flex-col relative overflow-hidden">
                  {/* Coming soon badge */}
                  <div
                    className="absolute top-4 right-4 px-2 py-0.5 text-xs font-orbitron tracking-wider rounded"
                    style={{
                      background: `rgba(${cs.color === '#00d4ff' ? '0,212,255' : cs.color === '#7c3aed' ? '124,58,237' : '232,121,249'}, 0.12)`,
                      color: cs.color,
                      border: `1px solid ${cs.color}30`,
                    }}
                  >
                    COMING SOON
                  </div>

                  <div className="mb-4">
                    <span className="font-orbitron text-xs tracking-widest" style={{ color: cs.color }}>
                      {cs.industry}
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">{cs.teaser}</p>

                  {/* Impact metrics */}
                  <div className="space-y-2 mb-6">
                    {cs.impact.map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        <span style={{ color: cs.color }} className="text-xs">✦</span>
                        <span className="text-slate-400">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {cs.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs font-orbitron px-2 py-0.5 rounded tracking-wide"
                        style={{
                          background: `rgba(${cs.color === '#00d4ff' ? '0,212,255' : cs.color === '#7c3aed' ? '124,58,237' : '232,121,249'}, 0.08)`,
                          color: cs.color,
                          border: `1px solid ${cs.color}20`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
          <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">YOUR STORY STARTS HERE</p>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-6">
            Let&apos;s Make Your Business<br />
            <span className="gradient-text">The Next Success Story</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10">
            Don&apos;t wait for a competitor to show you what&apos;s possible. Book your free strategy
            call and let&apos;s map out your AI transformation today.
          </p>
          <Link href="/contact" className="btn-cyber-filled">
            START YOUR TRANSFORMATION
          </Link>
        </ScrollReveal>
      </section>
    </>
  )
}
