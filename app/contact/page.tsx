'use client'

import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import ScrollReveal from '@/components/ScrollReveal'

const FORM_ID = 'xgojzjav'

const services = [
  'AI Strategy & Roadmapping',
  'Workflow Automation',
  'AI Agents & Chatbots',
  'Data Intelligence',
  'Not sure yet — need guidance',
]

export default function ContactPage() {
  const [state, handleSubmit] = useForm(FORM_ID)
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', service: '', message: '',
  })

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-12">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, rgba(0,212,255,0.07) 0%, transparent 60%)' }}
        />
        <ScrollReveal>
          <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">LET&apos;S TALK</p>
          <h1 className="font-orbitron font-black text-5xl md:text-7xl text-white mb-6">
            Start the <span className="gradient-text">Conversation</span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-lg leading-relaxed">
            Book a free 45-minute AI strategy call. No pressure, no pitch — just a real conversation
            about what&apos;s possible for your North DFW business.
          </p>
        </ScrollReveal>
      </section>

      {/* Main grid */}
      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left info column */}
          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal>
              <div className="glass-card corner-accent p-8">
                <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-6">WHAT TO EXPECT</p>
                <div className="space-y-6">
                  {[
                    { step: '01', title: '45-Minute Call',      desc: 'We learn your business, your goals, your biggest bottlenecks.' },
                    { step: '02', title: 'AI Opportunity Map',  desc: 'We identify your top 3 highest-ROI AI opportunities on the spot.' },
                    { step: '03', title: 'Clear Next Steps',    desc: "You leave with a concrete picture of what's possible and what it costs." },
                  ].map(item => (
                    <div key={item.step} className="flex gap-4">
                      <span className="font-orbitron font-black text-3xl text-[rgba(0,212,255,0.2)] leading-none flex-shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="font-orbitron text-sm font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="glass-card p-8 space-y-5">
                <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-2">CONTACT INFO</p>
                {[
                  { icon: '◎', label: 'Location',      value: 'North DFW, Texas' },
                  { icon: '◎', label: 'Service Area',  value: 'Frisco · Plano · McKinney · Allen · Prosper · Denton · Lewisville' },
                  { icon: '◎', label: 'Response Time', value: 'Within 4 business hours' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#00d4ff] text-sm">{item.icon}</span>
                      <span className="font-orbitron text-xs text-slate-500 tracking-wider">{item.label.toUpperCase()}</span>
                    </div>
                    <p className="text-slate-300 text-sm pl-5">{item.value}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div
                className="glass-card p-8 text-center"
                style={{ borderColor: 'rgba(0,212,255,0.25)', boxShadow: '0 0 30px rgba(0,212,255,0.07)' }}
              >
                <div className="text-4xl mb-3">⬡</div>
                <h3 className="font-orbitron font-bold text-white text-sm mb-2">Zero-Commitment Guarantee</h3>
                <p className="text-slate-400 text-sm">
                  The strategy call is 100% free with zero obligation. If we&apos;re not the right fit,
                  we&apos;ll tell you and point you in the right direction.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={150}>
              {state.succeeded ? (
                /* ── Success state ── */
                <div
                  className="glass-card corner-accent p-16 text-center"
                  style={{ boxShadow: '0 0 40px rgba(0,212,255,0.1)' }}
                >
                  <div className="text-6xl mb-6 gradient-text font-orbitron">✓</div>
                  <h2 className="font-orbitron font-bold text-2xl text-white mb-4">Message Received!</h2>
                  <p className="text-slate-400 leading-relaxed">
                    Thanks for reaching out. Cole will personally respond within 4 business hours
                    to schedule your free strategy call.
                  </p>
                  <div className="mt-8 text-xs font-orbitron text-[#00d4ff] tracking-widest animate-pulse-slow">
                    NORTH TEXAS AI IS COMING FOR YOU ◈
                  </div>
                </div>
              ) : (
                /* ── Contact form ── */
                <form onSubmit={handleSubmit} className="glass-card corner-accent p-10 space-y-6">
                  <h2 className="font-orbitron font-bold text-xl text-white mb-2">Book Your Free Strategy Call</h2>
                  <p className="text-slate-400 text-sm mb-6">Fill this out and we&apos;ll reach out to schedule.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block font-orbitron text-xs text-slate-500 tracking-widest mb-2">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Cole Calderon"
                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(0,212,255,0.15)] text-white placeholder-slate-600 text-sm px-4 py-3 outline-none focus:border-[rgba(0,212,255,0.5)] transition-all duration-300 font-inter"
                      />
                      <ValidationError field="name" errors={state.errors} className="mt-1 text-red-400 text-xs" />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-orbitron text-xs text-slate-500 tracking-widest mb-2">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(0,212,255,0.15)] text-white placeholder-slate-600 text-sm px-4 py-3 outline-none focus:border-[rgba(0,212,255,0.5)] transition-all duration-300 font-inter"
                      />
                      <ValidationError field="email" errors={state.errors} className="mt-1 text-red-400 text-xs" />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block font-orbitron text-xs text-slate-500 tracking-widest mb-2">
                      COMPANY NAME
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your Business Name"
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(0,212,255,0.15)] text-white placeholder-slate-600 text-sm px-4 py-3 outline-none focus:border-[rgba(0,212,255,0.5)] transition-all duration-300 font-inter"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block font-orbitron text-xs text-slate-500 tracking-widest mb-2">
                      SERVICE INTERESTED IN
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(0,212,255,0.15)] text-white text-sm px-4 py-3 outline-none focus:border-[rgba(0,212,255,0.5)] transition-all duration-300 font-inter appearance-none cursor-pointer"
                      style={{ backgroundColor: '#04040f' }}
                    >
                      <option value="" className="bg-[#04040f]">Select a service...</option>
                      {services.map(s => (
                        <option key={s} value={s} className="bg-[#04040f]">{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-orbitron text-xs text-slate-500 tracking-widest mb-2">
                      TELL US ABOUT YOUR BUSINESS *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="What does your business do? What are your biggest operational challenges or goals? The more context, the better."
                      className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(0,212,255,0.15)] text-white placeholder-slate-600 text-sm px-4 py-3 outline-none focus:border-[rgba(0,212,255,0.5)] transition-all duration-300 font-inter resize-none"
                    />
                    <ValidationError field="message" errors={state.errors} className="mt-1 text-red-400 text-xs" />
                  </div>

                  {/* Form-level errors */}
                  <ValidationError errors={state.errors} className="text-red-400 text-xs font-orbitron tracking-wide" />

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="btn-cyber-filled w-full text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {state.submitting ? 'SENDING...' : 'BOOK MY FREE STRATEGY CALL →'}
                  </button>

                  <p className="text-slate-600 text-xs text-center">
                    No spam. No pressure. Just AI expertise for your North DFW business.
                  </p>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="relative py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="glass-card p-10 text-center">
              <p className="font-orbitron text-xs text-[#00d4ff] tracking-widest mb-4">SERVICE AREA</p>
              <h2 className="font-orbitron font-bold text-2xl text-white mb-8">
                Proudly Serving <span className="gradient-text">North DFW</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Frisco', 'Plano', 'McKinney', 'Allen', 'Prosper', 'Celina',
                  'Denton', 'Lewisville', 'Flower Mound', 'Southlake', 'Colleyville',
                  'Carrollton', 'The Colony', 'Little Elm', 'Aubrey', 'Anna',
                ].map(city => (
                  <span
                    key={city}
                    className="font-orbitron text-xs px-3 py-1.5 tracking-wider"
                    style={{
                      background: 'rgba(0,212,255,0.05)',
                      border:     '1px solid rgba(0,212,255,0.15)',
                      color:      '#94a3b8',
                    }}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
