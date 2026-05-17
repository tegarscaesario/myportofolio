import React, { useEffect, useState } from 'react'

/* ─────────────────────────────────────────────
   Logo SVG
───────────────────────────────────────────── */
function Logo() {
  return (
    <div className="flex-1 flex items-center gap-3">
    </div>
  )
}

/* ─────────────────────────────────────────────
   Navbar Link dengan underline animation
───────────────────────────────────────────── */
function NavLink({ href, children, isActive }) {
  return (
    <a
      href={href}
      className={`text-xs uppercase tracking-widest font-medium transition-colors relative group ${
        isActive ? 'text-white' : 'text-white/80 hover:text-white'
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

/* ─────────────────────────────────────────────
   Navbar
───────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20)

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
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navBase = `
    group sticky flex z-50 w-full max-w-7xl mx-auto
    border border-transparent pt-3 px-4 pb-3 sm:px-8 top-0
    items-center justify-between
    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
    [animation:animationIn_0.8s_ease-out_0.1s_both]
  `
  const navScrolled = `
    !max-w-5xl !top-4 !pt-3 !pb-3 !px-6
    bg-[#1E1E1E]/80 backdrop-blur-xl rounded-full
    border-[#D6BFA3]/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)]
  `

  return (
    <>
      <nav className={`${navBase} ${scrolled ? navScrolled : ''}`}>

        {/* Logo */}
        <Logo />

        {/* Desktop links */}
        <div className={`
          hidden md:flex gap-8 items-center transition-all duration-500
          bg-[#1E1E1E]/60 border border-[#D6BFA3]/10 rounded-full
          pt-3 px-8 pb-3 shadow-2xl backdrop-blur-xl
          ${scrolled ? '!bg-transparent !border-transparent !shadow-none' : ''}
        `}>
          <NavLink href="#home" isActive={activeSection === 'home'}>Home</NavLink>
          <NavLink href="#about" isActive={activeSection === 'about'}>About</NavLink>
          <NavLink href="#work" isActive={activeSection === 'work'}>Projects</NavLink>
          <NavLink href="#contact" isActive={activeSection === 'contact'}>Contact</NavLink>
        </div>

        {/* Desktop right spacer for centering */}
        <div className="hidden md:flex flex-1 justify-end"></div>

        {/* Mobile – Burger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            id="mobile-burger-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={`flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-xl bg-[#1E1E1E]/80 border border-[#D6BFA3]/10 shadow-lg transition-all duration-300 hover:border-[#D6BFA3]/30 active:scale-95 flex-shrink-0 ${mobileOpen ? 'burger-open' : ''}`}
          >
            <span className="burger-bar" />
            <span className="burger-bar" />
            <span className="burger-bar" />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div
        id="mobile-menu-overlay"
        className={mobileOpen ? 'open' : ''}
        onClick={(e) => { if (e.target.id === 'mobile-menu-overlay') setMobileOpen(false) }}
      >
        <div id="mobile-menu-panel">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 flex-shrink-0">
            <Logo />
            <button
              onClick={() => setMobileOpen(false)}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M18 6L6 18" /><path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sections */}
          <div className="flex-1 py-2 overflow-y-auto">
            <div className="mobile-nav-section">
              <a href="#home" onClick={() => setMobileOpen(false)} className={`block px-6 py-4 text-sm font-medium uppercase tracking-widest transition-colors relative group ${activeSection === 'home' ? 'text-white' : 'text-white/80'}`}>
                Home
                <span className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 transition-all duration-300 ease-out ${activeSection === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            </div>
            <div className="mobile-nav-section">
              <a href="#about" onClick={() => setMobileOpen(false)} className={`block px-6 py-4 text-sm font-medium uppercase tracking-widest transition-colors relative group ${activeSection === 'about' ? 'text-white' : 'text-white/80'}`}>
                About
                <span className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 transition-all duration-300 ease-out ${activeSection === 'about' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            </div>
            <div className="mobile-nav-section">
              <a href="#work" onClick={() => setMobileOpen(false)} className={`block px-6 py-4 text-sm font-medium uppercase tracking-widest transition-colors relative group ${activeSection === 'work' ? 'text-white' : 'text-white/80'}`}>
                Projects
                <span className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 transition-all duration-300 ease-out ${activeSection === 'work' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            </div>
            <div className="mobile-nav-section">
              <a href="#contact" onClick={() => setMobileOpen(false)} className={`block px-6 py-4 text-sm font-medium uppercase tracking-widest transition-colors relative group ${activeSection === 'contact' ? 'text-white' : 'text-white/80'}`}>
                Contact
                <span className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 transition-all duration-300 ease-out ${activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
