import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

// ─── EmailJS config ───────────────────────────────────────────────────────────
// Daftar gratis di https://www.emailjs.com/ lalu isi 3 nilai di bawah:
const EMAILJS_SERVICE_ID = 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_asmxgt'
const EMAILJS_PUBLIC_KEY = 'cPeybSb5jhwwIN4YCP'
// ─────────────────────────────────────────────────────────────────────────────

const CONTACT_LINKS = [
    {
        name: 'GitHub',
        handle: 'github.com/tegarscaesario',
        href: 'https://github.com/tegarscaesario',
        icon: 'mdi:github',
    },
    {
        name: 'Instagram',
        handle: '@tegar.sc10',
        href: 'https://www.instagram.com/tegar.sc10/',
        icon: 'mdi:instagram',
    },
    {
        name: 'TikTok',
        handle: '@aikoo1007',
        href: 'https://www.tiktok.com/@aikoo1007',
        icon: 'ic:baseline-tiktok',
    },
    {
        name: 'LinkedIn',
        handle: 'linkedin.com/in/tegar-scaesario',
        href: 'https://www.linkedin.com/in/tegar-scaesario-7053152a8/',
        icon: 'mdi:linkedin',
    },
]

function ArrowIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 17L17 1M17 1H4M17 1V14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    )
}

const inputClass =
    'w-full bg-transparent border-b border-white/40 focus:border-sky-400 outline-none text-white text-sm font-mono py-3 placeholder-white/40 transition-colors duration-200'

const labelClass =
    'block text-xs font-mono tracking-[0.15em] uppercase text-white mb-2'

export default function ContactSection() {
    const formRef = useRef(null)
    const [status, setStatus] = useState('idle') // idle | sending | sent | error

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')

        // Jika EmailJS belum dikonfigurasi, tampilkan pesan info
        if (
            EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
            EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
            EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
        ) {
            setTimeout(() => {
                setStatus('not_configured')
                setTimeout(() => setStatus('idle'), 4000)
            }, 600)
            return
        }

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            )
            setStatus('sent')
            formRef.current.reset()
            setTimeout(() => setStatus('idle'), 4000)
        } catch (err) {
            console.error('EmailJS error:', err)
            setStatus('error')
            setTimeout(() => setStatus('idle'), 4000)
        }
    }

    const btnLabel = {
        idle: 'Send Message →',
        sending: 'Sending...',
        sent: '✓ Message Sent!',
        error: '✗ Failed — Try Again',
        not_configured: '⚠ EmailJS Not Configured',
    }[status]

    const btnColor = {
        idle: '#ffffff',
        sending: '#ffffff',
        sent: '#38bdf8',
        error: '#f87171',
        not_configured: '#fbbf24',
    }[status]

    return (
        <section
            id="contact"
            className="relative z-10 px-6 lg:px-12 py-24"
            style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
        >
            {/* Section label */}
            <p className="text-xs text-sky-400 tracking-[0.3em] font-mono uppercase mb-12 flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-sky-400" />
                Contact
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto">

                {/* ── Left ── */}
                <div>
                    <div
                        className="font-black leading-none mb-8 select-none"
                        style={{
                            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                            fontSize: 'clamp(52px, 8vw, 100px)',
                            letterSpacing: '-0.04em',
                            lineHeight: 0.95,
                            color: '#ffffff',
                        }}
                    >
                        Let's
                        <br />
                        <span style={{ color: '#38bdf8', fontStyle: 'italic', fontWeight: 300 }}>
                            build
                        </span>
                        <br />
                        together.
                    </div>

                    <p className="text-white/70 text-sm font-mono leading-relaxed max-w-sm mb-10">
                        Have a project you want to work on, want to collaborate, or just want to say hello — I'm always open to a good conversation.
                    </p>

                    {/* Social links */}
                    <div className="flex flex-col">
                        {CONTACT_LINKS.map(({ name, handle, href, icon }) => (
                            <a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center justify-between py-4 transition-all duration-200 hover:pl-3"
                                style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}
                            >
                                <div className="flex items-center gap-3">
                                    <iconify-icon
                                        icon={icon}
                                        width="18"
                                        className="text-white/50 group-hover:text-sky-400 transition-colors"
                                    />
                                    <div>
                                        <div
                                            className="text-white font-bold group-hover:text-sky-400 transition-colors"
                                            style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', letterSpacing: '-0.01em' }}
                                        >
                                            {name}
                                        </div>
                                        <div className="text-white/50 text-xs font-mono tracking-wide mt-0.5">
                                            {handle}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-white/40 group-hover:text-sky-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200">
                                    <ArrowIcon />
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* ── Right: Form ── */}
                <div className="pt-2">
                    <p className="text-xs text-white/60 tracking-[0.2em] font-mono uppercase mb-8">
                        Send A Message
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div>
                            <label className={labelClass}>Your Name</label>
                            <input
                                type="text"
                                name="from_name"
                                placeholder="Your Name"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Email Address</label>
                            <input
                                type="email"
                                name="reply_to"
                                placeholder="email@example.com"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Project Inquiry"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Message</label>
                            <textarea
                                name="message"
                                rows={4}
                                placeholder="Your project story..."
                                required
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending' || status === 'sent'}
                            className="relative overflow-hidden mt-2 px-10 py-4 text-xs font-mono tracking-[0.15em] uppercase font-semibold transition-all duration-300 group"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: btnColor,
                            }}
                        >
                            <span
                                className="absolute inset-0 bg-sky-400 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
                                style={{ zIndex: 0 }}
                            />
                            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                                {btnLabel}
                            </span>
                        </button>

                        {/* EmailJS setup hint */}
                        {status === 'not_configured' && (
                            <p className="text-amber-400/80 text-xs font-mono leading-relaxed">
                                ⚠ Isi EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, dan EMAILJS_PUBLIC_KEY
                                di ContactSection.jsx untuk mengaktifkan pengiriman email.
                                Daftar gratis di{' '}
                                <a href="https://www.emailjs.com" target="_blank" rel="noreferrer" className="underline">
                                    emailjs.com
                                </a>
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}
