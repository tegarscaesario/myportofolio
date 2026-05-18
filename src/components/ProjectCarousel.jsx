import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PROJECTS = [
    {
        src: '/Project%201.png',
        title: 'Website Produksi BOX',
        tech: 'WordPress · PHP · Photoshop',
    },
    {
        src: '/Project%202.png',
        title: 'Website FNB - Catering',
        tech: 'WordPress · PHP · Photoshop',
    },
    {
        src: '/Project%203.png',
        title: 'Website Rent Car',
        tech: 'WordPress · PHP · Photoshop',
    },
    {
        src: '/Project%204.png',
        title: 'Design UI/UX Jasa Top Up Game',
        tech: 'Figma · Canva',
    },
    {
        src: '/Project%205.png',
        title: 'Design UI/UX Sistem Perpustakaan',
        tech: 'Figma',
    },
    {
        src: '/Project%206.png',
        title: 'Sistem Klinik OS',
        tech: 'CodeIgniter 4 · Docker · Tailwind CSS',
    },
    {
        src: '/Project%207.png',
        title: 'Machine Learning - Prediksi Data Obesitas',
        tech: 'Python · Pandas · NumPy · Scikit-learn',
    },
    {
        src: '/Project%208.png',
        title: 'Gambar Topologi Jaringan',
        tech: 'Cisco Packet Tracer',
    },
    {
        src: '/Project%209.png',
        title: 'Design Spanduk Event',
        tech: 'Canva',
    },
]

// Card width in px — used for translate calculation
const CARD_W = 320
const CARD_GAP = 24

export default function ProjectCarousel() {
    const [activeIndex, setActiveIndex] = useState(Math.floor(PROJECTS.length / 2))

    const toPrev = () => setActiveIndex(prev => Math.max(0, prev - 1))
    const toNext = () => setActiveIndex(prev => Math.min(PROJECTS.length - 1, prev + 1))

    return (
        <div className="w-full flex flex-col items-center gap-10 select-none">

            {/* ── Carousel track ── */}
            <div className="w-full overflow-hidden">
                <motion.div
                    className="flex items-center"
                    style={{ gap: CARD_GAP }}
                    animate={{
                        x: `calc(50% - ${activeIndex * (CARD_W + CARD_GAP) + CARD_W / 2}px)`
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
                >
                    {PROJECTS.map((project, i) => {
                        const isActive = activeIndex === i
                        const distance = Math.abs(activeIndex - i)

                        return (
                            <motion.div
                                key={i}
                                className="flex-shrink-0 cursor-pointer"
                                style={{
                                    width: CARD_W,
                                    perspective: '1000px',
                                }}
                                animate={{
                                    rotateY: (activeIndex - i) * 45,
                                    scale: isActive ? 1 : Math.max(0.75, 1 - distance * 0.08),
                                    opacity: distance > 3 ? 0 : Math.max(0.3, 1 - distance * 0.2),
                                }}
                                transition={{ type: 'spring', bounce: 0.1, duration: 1 }}
                                onClick={() => setActiveIndex(i)}
                            >
                                {/* Card */}
                                <div
                                    className={`rounded-2xl overflow-hidden border transition-all duration-500 ${isActive
                                        ? 'border-sky-400/40 shadow-[0_0_40px_rgba(56,189,248,0.15)]'
                                        : 'border-white/10'
                                        }`}
                                    style={{ background: 'rgba(255,255,255,0.04)' }}
                                >
                                    {/* Image — 600×400 ratio = 3:2 */}
                                    <div className="relative w-full" style={{ aspectRatio: '3/2' }}>
                                        <img
                                            src={project.src}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                            draggable={false}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        {/* Overlay on hover for active */}
                                        {isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="p-5">
                                        <motion.div
                                            animate={{
                                                opacity: isActive ? 1 : 0.4,
                                                filter: isActive ? 'blur(0px)' : 'blur(1px)',
                                            }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <h3 className="text-white font-semibold text-base mb-1 truncate">
                                                {project.title}
                                            </h3>
                                            <p className="text-white/50 text-xs font-mono tracking-wide">
                                                {project.tech}
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>

            {/* ── Controls ── */}
            <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                {/* Prev */}
                <button
                    onClick={toPrev}
                    disabled={activeIndex === 0}
                    className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    aria-label="Previous project"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                    {PROJECTS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            aria-label={`Go to project ${i + 1}`}
                            className={`rounded-full h-2 transition-all duration-300 ${activeIndex === i
                                ? 'w-7 bg-sky-400'
                                : 'w-2 bg-white/30 hover:bg-white/50'
                                }`}
                        />
                    ))}
                </div>

                {/* Next */}
                <button
                    onClick={toNext}
                    disabled={activeIndex === PROJECTS.length - 1}
                    className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    aria-label="Next project"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* ── Counter ── */}
            <p className="text-white/30 text-xs font-mono tracking-widest">
                {String(activeIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
            </p>
        </div>
    )
}
