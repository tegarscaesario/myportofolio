import { useEffect, useState } from 'react'
import ShinyText from './ShinyText'

const socialLinks = [
    {
        href: 'https://github.com/tegarscaesario',
        icon: 'mdi:github',
        label: 'GitHub',
        bg: '#333333',
        border: false,
    },
    {
        href: 'https://www.instagram.com/tegar.sc10/',
        icon: 'mdi:instagram',
        label: 'Instagram',
        bg: '#E1306C',
        border: false,
    },
    {
        href: 'https://www.tiktok.com/@aikoo1007',
        icon: 'ic:baseline-tiktok',
        label: 'TikTok',
        bg: '#000000',
        border: true,
    },
    {
        href: 'https://www.linkedin.com/in/tegar-scaesario-7053152a8/',
        icon: 'mdi:linkedin',
        label: 'LinkedIn',
        bg: '#0A66C2',
        border: false,
    },
]

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#work' },
    { label: 'Contact', href: '#contact' },
]


/* ─────────────────────────────────────────────
   Footer Link dengan underline animation
───────────────────────────────────────────── */
function FooterNavLink({ href, children, isActive }) {
  return (
    <a
      href={href}
      className={`text-[15px] transition-colors relative group inline-block ${
        isActive ? 'text-white' : 'text-white/70 hover:text-white'
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 transition-all duration-300 ease-out ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </a>
  )
}


export default function Footer() {
  const [activeSection, setActiveSection] = useState('home')
  const year = new Date().getFullYear()

  useEffect(() => {
    const onScroll = () => {
      // Detect active section based on scroll position
      const sections = ['home', 'about', 'work', 'contact']
      for (const section of sections) {
        const element = document.querySelector(`#${section}`)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

    return (
        <footer className="relative z-10 text-white pt-16 pb-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">

                {/* ── Top Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-12 border-b border-white/10">

                    {/* Brand */}
                    <div className="space-y-5">
                        {/* Logo / Name */}
                        <a href="#home" className="inline-block">
                            <span className="text-2xl font-extrabold tracking-tight">
                                <ShinyText
                                    text="Tegar Scaesario"
                                    speed={3}
                                    color="#94a3b8"
                                    shineColor="#ffffff"
                                    spread={120}
                                />
                            </span>
                        </a>

                        {/* Description */}
                        <p className="text-white/60 text-[14px] leading-relaxed max-w-xs">
                            Passionate Front-End Web Developer dedicated to bringing designs to life through clean and interactive code.
                        </p>

                        {/* Social Media — same style as hero */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map(({ href, icon, label, bg, border }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={label}
                                    className="group relative flex items-center justify-center w-11 h-11 rounded-md drop-shadow-xl text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500"
                                    style={{
                                        backgroundColor: bg,
                                        border: border ? '1px solid rgba(255,255,255,0.1)' : undefined,
                                    }}
                                >
                                    <iconify-icon icon={icon} width="24" />
                                    <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-slate-100 group-hover:text-sm group-hover:-translate-y-10 duration-700 whitespace-nowrap pointer-events-none">
                                        {label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-[13px] text-white/50 uppercase tracking-widest">
                            Navigation
                        </h4>
                        <ul className="space-y-3">
                            {navLinks.map(({ label, href }) => (
                                <li key={label}>
                                    <FooterNavLink href={href} isActive={activeSection === href.slice(1)}>
                                        {label}
                                    </FooterNavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* ── Bottom Bar ── */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/40">
                    <p>© {year} Tegar Scaesario. All rights reserved.</p>
                    <div className="flex gap-5">
                        <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white/70 transition-colors">Terms &amp; Conditions</a>
                    </div>
                </div>

            </div>
        </footer>
    )
}
