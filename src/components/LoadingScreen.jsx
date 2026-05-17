import { useEffect, useRef, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
    const barRef = useRef(null)
    const counterRef = useRef(null)
    const nameRef = useRef(null)
    const loaderRef = useRef(null)
    const [displayText1, setDisplayText1] = useState('')
    const [displayText2, setDisplayText2] = useState('')

    useEffect(() => {
        const text1 = 'Welcome To My Portofolio'
        const text2 = 'by Tegar Scaesario'
        let index1 = 0
        let index2 = 0

        const typeText = setInterval(() => {
            if (index1 < text1.length) {
                setDisplayText1(text1.slice(0, index1 + 1))
                index1++
            } else if (index2 < text2.length) {
                setDisplayText2(text2.slice(0, index2 + 1))
                index2++
            } else {
                clearInterval(typeText)
            }
        }, 50)

        return () => clearInterval(typeText)
    }, [])

    useEffect(() => {
        const bar = barRef.current
        const counter = counterRef.current
        const name = nameRef.current
        const loader = loaderRef.current
        if (!bar || !counter || !name || !loader) return

        // Fade-in name
        name.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
        name.style.opacity = '1'
        name.style.transform = 'translateY(0)'

        let progress = 0
        const interval = setInterval(() => {
            progress += Math.random() * 15
            if (progress >= 100) {
                progress = 100
                clearInterval(interval)

                bar.style.width = '100%'
                counter.textContent = '100'

                setTimeout(() => {
                    loader.style.transition = 'transform 0.9s cubic-bezier(0.76,0,0.24,1)'
                    loader.style.transform = 'translateY(-100%)'
                    setTimeout(() => onComplete?.(), 900)
                }, 300)
                return
            }
            bar.style.width = progress + '%'
            counter.textContent = String(Math.floor(progress)).padStart(3, '0')
        }, 60)

        return () => clearInterval(interval)
    }, [onComplete])

    return (
        <div
            ref={loaderRef}
            style={{
                position: 'fixed',
                inset: 0,
                background: '#1A1814',
                zIndex: 100000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '2rem',
            }}
        >
            {/* Name */}
            <div
                ref={nameRef}
                style={{
                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                    fontSize: 'clamp(32px, 6vw, 80px)',
                    color: '#F5F0E8',
                    letterSpacing: '-0.03em',
                    opacity: 0,
                    transform: 'translateY(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    minHeight: 'clamp(100px, 15vw, 200px)',
                }}
            >
                <div style={{ fontWeight: 400, minHeight: '1em' }}>
                    {displayText1}
                    {displayText1.length < 'Welcome To My Portfolio'.length && <span style={{ opacity: 0.5 }}>|</span>}
                </div>
                <div style={{ fontStyle: 'italic', minHeight: '1em' }}>
                    {displayText2.includes('by') ? (
                        <>
                            <span style={{ color: '#38bdf8' }}>
                                {displayText2.slice(0, 2)}
                            </span>
                            <span style={{ color: '#F5F0E8' }}>
                                {displayText2.slice(2)}
                            </span>
                            {displayText2.length < 'by Tegar Scaesario'.length && <span style={{ opacity: 0.5 }}>|</span>}
                        </>
                    ) : (
                        <>
                            {displayText2}
                            {displayText2.length > 0 && displayText2.length < 'by Tegar Scaesario'.length && <span style={{ opacity: 0.5 }}>|</span>}
                        </>
                    )}
                </div>
            </div>

            {/* Progress bar */}
            <div
                style={{
                    width: '200px',
                    height: '1px',
                    background: 'rgba(255,255,255,0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    ref={barRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        background: '#38bdf8',
                        width: '0%',
                        transition: 'width 0.06s linear',
                    }}
                />
            </div>

            {/* Counter */}
            <div
                ref={counterRef}
                style={{
                    fontFamily: "'DM Mono', 'Courier New', monospace",
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.2em',
                }}
            >
                000
            </div>
        </div>
    )
}
