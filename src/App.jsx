import React, { useState, useEffect, useRef, lazy, Suspense } from 'react'
import Background from './components/Background'
import Navbar from './components/Navbar'
import TiltCard from './components/TiltCard'
import TextPressure from './components/TextPressure'
import ShinyText from './components/ShinyText'
import LogoLoop from './components/LogoLoop'
import SplashCursor from './components/SplashCursor'
import ScrollReveal from './components/ScrollReveal'
import LoadingScreen from './components/LoadingScreen'

// Only lazy-load Lanyard (Three.js + Rapier = ~3.2MB) on desktop
const _isMobileInit = typeof window !== 'undefined' &&
  (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
const Lanyard = _isMobileInit ? null : lazy(() => import('./components/Lanyard'))
const ProjectCarousel = lazy(() => import('./components/ProjectCarousel'))
const WorkHero = lazy(() => import('./components/WorkHero'))
const ContactSection = lazy(() => import('./components/ContactSection'))
const Footer = lazy(() => import('./components/Footer'))

import {
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiTailwindcss,
  SiPhp,
  SiJavascript,
  SiReact,
  SiPython,
  SiCodeigniter,
  SiDocker,
  SiMysql,
  SiWordpress,
  SiCplusplus
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

const skillLogosTop = [
  { node: <SiHtml5 className="text-slate-100" />, title: 'HTML', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { node: <SiCss3 className="text-slate-100" />, title: 'CSS', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { node: <SiJavascript className="text-slate-100" />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { node: <SiCplusplus className="text-slate-100" />, title: 'C++', href: 'https://cplusplus.com' },
  { node: <SiPhp className="text-slate-100" />, title: 'PHP', href: 'https://www.php.net' },
  { node: <FaJava className="text-slate-100" />, title: 'Java', href: 'https://www.java.com' },
  { node: <SiPython className="text-slate-100" />, title: 'Python', href: 'https://www.python.org' }
]

const skillLogosBottom = [
  { node: <SiBootstrap className="text-slate-100" />, title: 'Bootstrap', href: 'https://getbootstrap.com' },
  { node: <SiTailwindcss className="text-slate-100" />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiCodeigniter className="text-slate-100" />, title: 'CodeIgniter', href: 'https://codeigniter.com' },
  { node: <SiReact className="text-slate-100" />, title: 'React', href: 'https://react.dev' },
  { node: <SiDocker className="text-slate-100" />, title: 'Docker', href: 'https://www.docker.com' },
  { node: <SiMysql className="text-slate-100" />, title: 'MySQL', href: 'https://www.mysql.com' },
  { node: <SiWordpress className="text-slate-100" />, title: 'WordPress', href: 'https://wordpress.com' }
]


// Fallback render nama jika font Compressa VF gagal dimuat
function HeroName({ children }) {
  return (
    <div
      className="w-full text-left"
      style={{
        fontSize: 'clamp(52px, 10vw, 130px)',
        fontWeight: 900,
        letterSpacing: '-0.03em',
        lineHeight: 1.0,
        color: '#ffffff',
        textTransform: 'uppercase',
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  // true  = Compressa VF sudah fully loaded, safe untuk render TextPressure
  // false = tampilkan fallback placeholder
  const [fontLoaded, setFontLoaded] = useState(false);

  // Use ref for scroll-driven animations to avoid re-rendering the entire tree
  const progressBarRef = useRef(null);
  const isMobile = useRef(
    typeof window !== 'undefined' &&
    (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent))
  ).current;

  const fullText =
    "Passionate Front-End Web Developer dedicated to bringing designs to life through clean and interactive code. Let's connect and build something awesome together!";

  // Wait untuk font fully loaded sebelum render TextPressure
  useEffect(() => {
    let mounted = true;

    const loadFont = async () => {
      if (!mounted) return;

      try {
        // Wait untuk document.fonts.ready (semua @font-face selesai)
        await document.fonts.ready;

        // Small buffer untuk ensure rendering engine sudah siap
        if (mounted) {
          setTimeout(() => {
            if (mounted) setFontLoaded(true);
          }, 100);
        }
      } catch (error) {
        console.error('Font loading error:', error);
        // Fallback: tetap render TextPressure walaupun ada error
        if (mounted) {
          setTimeout(() => {
            if (mounted) setFontLoaded(true);
          }, 500);
        }
      }
    };

    loadFont();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        // Update progress bar directly via DOM — no React re-render needed
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${Math.max(0, Math.min(100, (sy - 200) * 0.15))}%`;
        }
        setShowScrollTop(sy > 300);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="antialiased overflow-x-hidden min-h-screen text-slate-300 relative">

      {/* ── Loading Screen ── */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (<>
        {/* Animated background (fixed, behind everything) */}
        <Background />

        {/* ── Splash Cursor Effect ── */}
        <SplashCursor
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          SHADING={true}
          RAINBOW_MODE={false}
          COLOR="#38bdf8"
        />

        {/* Page wrapper */}
        <div className="flex flex-col w-full max-w-7xl mx-auto relative z-0">

          {/* ── Navbar ── */}
          <Navbar />

          {/* ── Hero Section ── */}
          <main className="flex flex-col lg:flex-row items-center lg:items-start justify-between min-h-[85vh] px-6 lg:px-12 pt-24 lg:pt-32 pb-12 text-center lg:text-left z-10 gap-16 lg:gap-8">

            {/* Left Column: Text Content */}
            <div className="flex flex-col items-center lg:items-start flex-1 w-full">

              {/* ── Name ── */}
              <div
                className="w-full mb-10 md:mb-8"
                style={{ animation: 'slideFromLeft 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) both' }}
              >
                {fontLoaded ? (
                  /* Font berhasil — pakai TextPressure interaktif */
                  <>
                    <div style={{ position: 'relative', height: 'clamp(80px, 18vw, 140px)', overflow: 'visible' }}>
                      <TextPressure
                        text="Tegar"
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        textColor="#ffffff"
                        strokeColor="#5227FF"
                        minFontSize={36}
                        scale={true}
                      />
                    </div>
                    <div style={{ position: 'relative', height: 'clamp(80px, 18vw, 140px)', overflow: 'visible' }}>
                      <TextPressure
                        text="Scaesario"
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        textColor="#ffffff"
                        strokeColor="#5227FF"
                        minFontSize={36}
                        scale={true}
                      />
                    </div>
                  </>
                ) : (
                  /* Font gagal / belum dimuat — pakai fallback teks bold */
                  <div className="flex flex-col gap-1">
                    <HeroName>Tegar</HeroName>
                    <HeroName>Scaesario</HeroName>
                  </div>
                )}
              </div>

              {/* Sub-copy Title */}
              {/*
              FIX mobile spacing:
              - mb-10 md:mb-8  pada blok nama di atas sudah menambah jarak bawah nama
              - mt-2 sm:mt-0   memberi ruang ekstra di layar kecil jika masih mepet
            */}
              <p
                className="text-sm md:text-lg font-medium tracking-[0.2em] text-[#9ca3af] leading-relaxed max-w-2xl mb-4 uppercase mt-2 sm:mt-0"
                style={{ animation: 'animationIn 0.8s ease-out 0.4s both' }}
              >
                Tegar Scaesario <span className="text-white mx-2">|</span> IT Student
              </p>

              {/* Typing Paragraph */}
              <div
                className="text-base md:text-lg text-slate-300/80 leading-relaxed max-w-2xl mb-8 font-light min-h-[80px]"
                style={{ animation: 'animationIn 0.8s ease-out 0.5s both' }}
              >
                <p>{displayedText}<span className="animate-pulse">|</span></p>
              </div>

              {/* Social Links */}
              <div
                className="flex items-center gap-4 mb-10"
                style={{ animation: 'animationIn 0.8s ease-out 0.6s both' }}
              >
                <a href="https://github.com/tegarscaesario" target="_blank" rel="noreferrer"
                  className="group flex items-center justify-center w-11 h-11 rounded-md drop-shadow-xl bg-[#333333] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500">
                  <iconify-icon icon="mdi:github" width="24"></iconify-icon>
                  <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-slate-100 group-hover:text-sm group-hover:-translate-y-10 duration-700 whitespace-nowrap">GitHub</span>
                </a>
                <a href="https://www.instagram.com/tegar.sc10/" target="_blank" rel="noreferrer"
                  className="group flex items-center justify-center w-11 h-11 rounded-md drop-shadow-xl bg-[#E1306C] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500">
                  <iconify-icon icon="mdi:instagram" width="24"></iconify-icon>
                  <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-slate-100 group-hover:text-sm group-hover:-translate-y-10 duration-700 whitespace-nowrap">Instagram</span>
                </a>
                <a href="https://www.tiktok.com/@aikoo1007" target="_blank" rel="noreferrer"
                  className="group flex items-center justify-center w-11 h-11 rounded-md drop-shadow-xl bg-[#000000] border border-white/10 text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500">
                  <iconify-icon icon="ic:baseline-tiktok" width="24"></iconify-icon>
                  <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-slate-100 group-hover:text-sm group-hover:-translate-y-10 duration-700 whitespace-nowrap">TikTok</span>
                </a>
                <a href="https://www.linkedin.com/in/tegar-scaesario-7053152a8/" target="_blank" rel="noreferrer"
                  className="group flex items-center justify-center w-11 h-11 rounded-md drop-shadow-xl bg-[#0A66C2] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500">
                  <iconify-icon icon="mdi:linkedin" width="24"></iconify-icon>
                  <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-slate-100 group-hover:text-sm group-hover:-translate-y-10 duration-700 whitespace-nowrap">LinkedIn</span>
                </a>
              </div>

              {/* CTA buttons */}
              <div
                className="flex flex-col sm:flex-row items-center gap-4"
                style={{ animation: 'animationIn 0.8s ease-out 0.7s both' }}
              >
                <a href="#work" className="btn-cta">View My Work</a>
                <a href="#contact" className="btn-cta">Get in Touch</a>
              </div>
            </div>

            {/* Right Column: Photo Card Design */}
            <div
              className="flex-1 flex justify-center lg:justify-end w-full max-w-[500px]"
              style={{ animation: 'animationIn 0.8s ease-out 0.6s both' }}
            >
              <TiltCard>
                <img
                  src="/Profile.jpeg"
                  alt="Profile"
                  className="w-full h-full object-cover opacity-90 transition-all duration-700 ease-out pointer-events-none"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 rounded-[20px] bg-[#000000]/60 backdrop-blur-md border border-[#e5e7eb]/10 p-3 sm:p-4 flex items-center gap-3 sm:gap-4 transition-transform duration-300 pointer-events-none">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#ffffff] flex-shrink-0 pointer-events-auto">
                    <img src="/Profile.jpeg" alt="Avatar" className="w-full h-full object-cover" loading="eager" decoding="async" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0 text-left pointer-events-auto">
                    <h3 className="text-[#ffffff] font-medium text-sm sm:text-base font-outfit truncate">Tegar Scaesario</h3>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ffffff] animate-pulse flex-shrink-0"></span>
                      <span className="text-[#9ca3af] text-[10px] sm:text-xs font-outfit">Frontend Developer</span>
                    </div>
                  </div>
                  <a href="#contact"
                    className="btn-contact-me flex-shrink-0 cursor-pointer pointer-events-auto relative z-30 text-[11px] sm:text-[13px] px-2.5 sm:px-[1.2em]">
                    Contact me
                  </a>
                </div>
              </TiltCard>
            </div>
          </main>

          {/* ── About Section ── */}
          <section id="about" className="relative min-h-screen px-6 lg:px-12 py-24 z-10 mt-12">
            <div className="w-full h-[1px] bg-white/10 mb-16 relative">
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 h-full bg-white will-change-[width]"
                style={{ width: '0%', transition: 'none' }}
              />
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">
              <div className="flex-1 w-full max-w-[400px] lg:max-w-[450px]">
                {isMobile ? (
                  /* Animated card with photo + grayscale reveal */
                  <div className="relative z-50 w-full flex items-center justify-center py-8">
                    <div className="about-card-outer">
                      <div className="about-card-inner group">
                        <div className="about-card-ray" />

                        {/* Photo */}
                        <div className="about-photo-wrapper">
                          <div className="about-card-dot" />
                          <div className="w-full aspect-[3/4] rounded-lg overflow-hidden relative z-[1]">
                            <img
                              src="/About.jpeg"
                              alt="Tegar Scaesario"
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-[filter] duration-700 ease-out"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </div>

                        {/* Name */}
                        <p className="text-base font-semibold tracking-wide relative z-[1]">Tegar Scaesario</p>
                        <p className="text-xs text-slate-400 mt-1 mb-4 relative z-[1]">Frontend Developer</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Suspense fallback={<div className="w-full h-[600px]" />}>
                    <Lanyard />
                  </Suspense>
                )}
              </div>
              <div className="flex-1 w-full flex flex-col items-start text-left pt-4 lg:pt-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tighter uppercase mb-8">
                  <ShinyText text="About Me" speed={3} color="#94a3b8" shineColor="#ffffff" spread={120} />
                </h2>
                <div className="space-y-2 text-lg md:text-xl font-light leading-relaxed">
                  <ScrollReveal
                    baseOpacity={0.1}
                    enableBlur={true}
                    baseRotation={3}
                    blurStrength={4}
                    textClassName="text-lg md:text-xl"
                  >
                    Hi, I'm Tegar Scaesario! I am an Informatics Engineering student at Dian Nuswantoro University (UDINUS), deeply passionate about building the visual and interactive elements of the web. As a Front-End Web Developer, I bridge the gap between design and technology—turning creative layouts into clean, responsive, and user-friendly web experiences.
                  </ScrollReveal>
                  <ScrollReveal
                    baseOpacity={0.1}
                    enableBlur={true}
                    baseRotation={3}
                    blurStrength={4}
                    textClassName="text-lg md:text-xl"
                  >
                    I thrive on solving layout puzzles, optimizing performance, and continuously learning modern web technologies. I'm always open to collaborating on exciting projects and connecting with fellow tech enthusiasts. Let's build something awesome together!
                  </ScrollReveal>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 w-full">
                  <div className={`rounded-3xl bg-white/10 border border-white/15 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.35)] ${isMobile ? '' : 'backdrop-blur-xl'}`}>
                    <p className="text-5xl sm:text-6xl font-bold tracking-tight text-sky-400">2+</p>
                    <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-300">Tahun Pengalaman</p>
                  </div>
                  <div className={`rounded-3xl bg-white/10 border border-white/15 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.35)] ${isMobile ? '' : 'backdrop-blur-xl'}`}>
                    <p className="text-5xl sm:text-6xl font-bold tracking-tight text-sky-400">30+</p>
                    <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-300">Proyek Selesai</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" className="px-6 lg:px-12 py-20 z-10">
            <div className="max-w-6xl mx-auto">
              <div className={`rounded-[40px] bg-white/5 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.35)] mb-6 overflow-hidden ${isMobile ? '' : 'backdrop-blur-xl'}`}>
                <LogoLoop logos={skillLogosTop} speed={80} direction="left" logoHeight={60} gap={44} hoverSpeed={0} scaleOnHover fadeOut fadeOutColor="rgba(255,255,255,0.12)" ariaLabel="Top skill logos" />
              </div>
              <div className={`rounded-[40px] bg-white/5 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.35)] overflow-hidden ${isMobile ? '' : 'backdrop-blur-xl'}`}>
                <LogoLoop logos={skillLogosBottom} speed={80} direction="right" logoHeight={60} gap={44} hoverSpeed={0} scaleOnHover fadeOut fadeOutColor="rgba(255,255,255,0.12)" ariaLabel="Bottom skill logos" />
              </div>
            </div>
          </section>

          <section id="work" className="min-h-screen px-0 lg:px-0 py-0 z-10 overflow-hidden">
            <div className="w-full h-[1px] bg-white/10" />

            {/* PORTFOLIO title + tape */}
            <Suspense fallback={<div className="py-20" />}>
              <WorkHero />
            </Suspense>

            {/* Carousel */}
            <div className="px-6 lg:px-12 pb-24 max-w-6xl mx-auto">
              <p className="text-xs text-[#D6BFA3] tracking-[0.4em] font-mono mb-8 text-center"></p>
              <Suspense fallback={<div className="h-[400px]" />}>
                <ProjectCarousel />
              </Suspense>
            </div>
          </section>

          <Suspense fallback={null}>
            <ContactSection />
          </Suspense>

        </div>

        {/* ── Footer ── */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>

        {/* ── Scroll to Top Button ── */}
        <div className={`fixed bottom-16 sm:bottom-6 right-6 z-50 flex justify-end transition-all duration-300 ${showScrollTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="scroll-top-btn"
          >
            <svg className="scroll-top-icon" viewBox="0 0 384 512">
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </svg>
          </button>
        </div>

      </>)}
    </div>
  );
}