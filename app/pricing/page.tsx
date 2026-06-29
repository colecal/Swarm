import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

const plans = [
  {
    name:    'Starter',
    price:   '$1,497',
    period:  '/month',
    tagline: 'For businesses just stepping into AI',
    color:   '#00d4ff',
    highlight: false,
    features: [
      'AI Strategy & Opportunity Audit',
      '1 Workflow Automation Build',
      '1 AI Chatbot or Agent',
      'Monthly strategy check-in',
      'Dashboard with 5 KPIs',
      'Email & chat support',
      '30-day onboarding',
    ],
    cta: 'GET STARTED',
  },
  {
    name:    'Growth',
    price:   '$3,997',
    period:  '/month',
    tagline: 'For businesses ready to scale with AI',
    color:   '#7c3aed',
    highlight: true,
    features: [
      'Everything in Starter',
      'Up to 5 Workflow Automations',
      '3 Custom AI Agents',
      'Full data intelligence dashboard',
      'Bi-weekly strategy sessions',
      'Predictive analytics & forecasting',
      'Priority support (4-hr response)',
      'Quarterly AI roadmap refresh',
    ],
    cta: 'MOST POPULAR',
  },
  {
    name:    'Enterprise',
    price:   'Custom',
    period:  '',
    tagline: 'Full-suite AI transformation',
    color:   '#e879f9',
    highlight: false,
    features: [
      'Everything in Growth',
      'Unlimited automations & agents',
      'Dedicated AI engineer (part-time)',
      'Custom AI model training',
      'Real-time data pipelines',
      'White-glove onboarding',
      '24/7 support & monitoring',
      'Quarterly executive briefings',
    ],
    cta: 'LET\'S TALK',
  },
]

const faqs = [
  {
    q: 'Do you require long-term contracts?',
    a: 'No. We offer month-to-month engagements. We\'re confident enough in our results that we don\'t need to lock you in. That said, most clients stay for the long haul once they see the ROI.',
  },
  {
    q: 'How long before I see results?',
    a: 'Most clients see measurable impact within the first 30–60 days. Workflow automations typically deliver time savings within the first two weeks. AI agents go live within 3–4 weeks.',
  },
  {
    q: 'What industries do you serve?',
    a: 'Any North DFW small business. We\'ve worked with retail, professional services, healthcare, construction, real estate, restaurants, and more. AI principles are industry-agnostic.',
  },
  {
    q: 'Do I need technical expertise?',
    a: 'Absolutely not. We handle everything technical end-to-end. Your only job is to run your business — we make the AI work for you.',
  },
  {
    q: 'What\'s included in the free strategy call?',
    a: 'A 45-minute conversation where we learn your business, identify your top 3 AI opportunities, and give you an honest assessment of what\'s possible and what it would cost. No pressure, no pitch.',
  },
  {
    q: 'Can I start with just one service?',
    a: 'Yes. Many clients start with a single automation or chatbot and expand over time. We\'re flexible — we meet you where you are.',
  },
]

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-12">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, rgba(0,212,255,0.06) 0%, transparent 60%)' }}
        />
        <ScrollReveal>
          <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">TRANSPARENT PRICING</p>
          <h1 className="font-orbitron font-black text-5xl md:text-7xl text-white mb-6">
            Simple, <span className="gradient-text">Honest</span> Pricing
          </h1>
          <p className="max-w-2xl text-slate-400 text-lg leading-relaxed">
            No surprise fees. No enterprise bloat. Just clear, outcome-focused pricing built for
            North DFW small businesses. Every plan includes a free onboarding strategy session.
          </p>
        </ScrollReveal>
      </section>

      {/* Plans */}
      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 100}>
              <div
                className={`relative glass-card p-10 h-full flex flex-col ${plan.highlight ? 'border-[rgba(124,58,237,0.5)]' : ''}`}
                style={plan.highlight ? {
                  boxShadow: '0 0 40px rgba(124,58,237,0.2), 0 0 80px rgba(124,58,237,0.08)',
                } : {}}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 rounded-full font-orbitron text-xs text-white tracking-widest"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #e879f9)' }}>
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-8">
                  <p className="font-orbitron text-xs tracking-widest mb-2" style={{ color: plan.color }}>{plan.name}</p>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="font-orbitron font-black text-4xl text-white">{plan.price}</span>
                    <span className="text-slate-400 text-sm mb-1">{plan.period}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{plan.tagline}</p>
                </div>

                {/* Divider */}
                <div className="h-px mb-8" style={{ background: `linear-gradient(to right, ${plan.color}40, transparent)` }} />

                <ul className="space-y-4 flex-1 mb-10">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke={plan.color} strokeWidth="1"/>
                        <path d="M5 8l2 2 4-4" stroke={plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={plan.highlight ? 'btn-cyber-filled text-center' : 'btn-cyber text-center'}
                  style={!plan.highlight ? { borderColor: plan.color, color: plan.color } : {}}
                >
                  {plan.name === 'Enterprise' ? "LET'S TALK" : 'GET STARTED'}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Note */}
        <ScrollReveal>
          <p className="text-center text-slate-500 text-sm mt-10">
            All plans include a free 45-minute strategy call. No credit card required to get started.
          </p>
        </ScrollReveal>
      </section>

      {/* Add-ons */}
      <section className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="glass-card corner-accent p-10">
              <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-2">ALSO AVAILABLE</p>
              <h2 className="font-orbitron font-bold text-2xl text-white mb-8">One-Time Engagements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'AI Readiness Audit',         price: '$497',  desc: 'A full audit of your operations with an AI opportunity report and ROI estimates.' },
                  { name: 'Single Automation Build',     price: '$1,200', desc: 'One end-to-end workflow automation, deployed and documented.' },
                  { name: 'Custom AI Agent',             price: '$2,500', desc: 'A fully trained, deployed AI agent for a specific business function.' },
                  { name: 'Data Dashboard Setup',        price: '$1,800', desc: 'Custom KPI dashboard connected to your existing business data.' },
                ].map(item => (
                  <div key={item.name} className="flex gap-4">
                    <span className="text-[#00d4ff] mt-1 flex-shrink-0">✦</span>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-orbitron text-sm font-bold text-white">{item.name}</h3>
                        <span className="font-orbitron text-xs text-[#00d4ff]">{item.price}</span>
                      </div>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="font-orbitron text-xs text-[#7c3aed] tracking-widest mb-4">COMMON QUESTIONS</p>
              <h2 className="font-orbitron font-bold text-3xl text-white">FAQ</h2>
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="glass-card p-8">
                  <h3 className="font-orbitron text-sm font-bold text-white mb-3 flex items-start gap-3">
                    <span className="text-[#00d4ff] flex-shrink-0">Q.</span>
                    {faq.q}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed pl-6">{faq.a}</p>
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
          <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">ZERO RISK TO START</p>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-6">
            Book Your Free<br />
            <span className="gradient-text">Strategy Call</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10">
            45 minutes. No pitch. Just clarity on what AI can do for your specific business.
          </p>
          <Link href="/contact" className="btn-cyber-filled">
            BOOK NOW — IT&apos;S FREE
          </Link>
        </ScrollReveal>
      </section>
    </>
  )
}
