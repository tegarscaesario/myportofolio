import { useEffect, useRef } from 'react'

const TAPE_TEXT =
    'Some Featured Projects'

export default function WorkHero() {
    const titleRef = useRef(null)

    // Split chars for hover effect
    useEffect(() => {
        const container = titleRef.current
        if (!container) return
        const words = container.querySelectorAll('.work-word')
        words.forEach(word => {
            const text = word.innerText
            word.innerHTML = ''
            text.split('').forEach(char => {
                const span = document.createElement('span')
                span.classList.add('work-char')
                span.innerText = char === ' ' ? '\u00A0' : char
                word.appendChild(span)
            })
        })
    }, [])

    return (
        <div className="relative flex flex-col items-center justify-center py-20 overflow-hidden">

            {/* ── Big title ── */}
            <div
                ref={titleRef}
                className="work-title-container text-center mb-16 select-none"
                style={{ perspective: '1000px' }}
            >
                <h2
                    className="font-black uppercase leading-none"
                    style={{
                        fontFamily: "'Syncopate', 'Inter', sans-serif",
                        fontSize: 'clamp(3.5rem, 12vw, 10rem)',
                        lineHeight: 0.85,
                        color: 'transparent',
                        WebkitTextStroke: '2px rgba(255,255,255,0.85)',
                        letterSpacing: '-0.02em',
                    }}
                >
                    <div className="work-word block">PORTO</div>
                    <div className="work-word block">FOLIO</div>
                </h2>
            </div>

            {/* ── Tape scroll ── */}
            <div
                className="w-[120%] -ml-[10%] overflow-hidden py-3 border-t border-b border-black"
                style={{
                    background: '#38bdf8',
                    transform: 'rotate(-1.5deg)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                }}
            >
                {/* Duplicate text for seamless loop */}
                <div className="work-tape-track flex whitespace-nowrap">
                    {[0, 1].map(block => (
                        <div key={block} className="flex shrink-0">
                            {[...Array(10)].map((_, i) => (
                                <span
                                    key={i}
                                    className="work-tape-text inline-block"
                                    style={{
                                        fontFamily: "'Syncopate', 'Inter', sans-serif",
                                        fontSize: 'clamp(0.85rem, 1.8vw, 1.4rem)',
                                        fontWeight: 800,
                                        color: '#000',
                                        letterSpacing: '0.05em',
                                        paddingRight: '2rem',
                                    }}
                                >
                                    {TAPE_TEXT}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Inline keyframe for tape */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&display=swap');

        .work-tape-track {
          animation: workTapeScroll 40s linear infinite;
        }
        @keyframes workTapeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .work-char {
          display: inline-block;
          transition: color 0.15s ease, transform 0.15s ease;
        }
        .work-title-container:hover .work-char {
          color: #38bdf8;
          -webkit-text-stroke: 0px;
          transform: translateZ(20px);
        }
        .work-title-container:hover .work-char:hover {
          color: #7dd3fc;
          transform: translateY(-4px) scale(1.1);
        }
      `}</style>
        </div>
    )
}
