import { useEffect, useId, useRef } from 'react'
import type { PointerEvent } from 'react'

export function Aircraft({ compact = false }: { compact?: boolean }) {
  const id = useId().replace(/:/g, '')
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) return
    let visible = false
    const sync = () => {
      element.dataset.active = String(visible && !document.hidden)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    observer.observe(element)
    document.addEventListener('visibilitychange', sync)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])
  function move(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return
    const rect = e.currentTarget.getBoundingClientRect()
    ref.current?.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width - 0.5) * 12}px`)
    ref.current?.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height - 0.5) * 12}px`)
  }
  return (
    <div
      className={`aircraft-art ${compact ? 'art-compact' : ''}`}
      ref={ref}
      onPointerMove={move}
      onPointerLeave={() => {
        ref.current?.style.setProperty('--mx', '0px')
        ref.current?.style.setProperty('--my', '0px')
      }}
    >
      <svg viewBox="0 0 660 620" fill="none" aria-hidden="true">
        <defs>
          <linearGradient
            id={`${id}-wing`}
            x1="160"
            y1="280"
            x2="530"
            y2="350"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#c8f6f1" />
            <stop offset=".48" stopColor="#75b9bd" />
            <stop offset="1" stopColor="#1d617b" />
          </linearGradient>
          <linearGradient
            id={`${id}-body`}
            x1="200"
            y1="260"
            x2="480"
            y2="430"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#e4fffa" />
            <stop offset="1" stopColor="#3c91ac" />
          </linearGradient>
          <radialGradient id={`${id}-glow`}>
            <stop stopColor="#24566a" stopOpacity=".5" />
            <stop offset="1" stopColor="#081525" stopOpacity="0" />
          </radialGradient>
          <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0v40" stroke="#294555" strokeWidth=".6" />
          </pattern>
        </defs>
        <circle cx="340" cy="300" r="280" fill={`url(#${id}-glow)`} />
        <path d="M48 76h564v464H48Z" fill={`url(#${id}-grid)`} opacity=".45" />
        <g stroke="#345367" strokeWidth=".7">
          <path d="M32 300h596M340 36v530" strokeDasharray="3 7" />
          <circle cx="340" cy="300" r="222" />
          <circle cx="340" cy="300" r="160" strokeDasharray="2 9" />
          <ellipse cx="340" cy="300" rx="284" ry="113" transform="rotate(-29 340 300)" />
          <ellipse cx="340" cy="300" rx="140" ry="238" transform="rotate(-29 340 300)" />
        </g>
        <g className="orbit-ticks" stroke="#608092">
          <path d="M340 70v17M340 513v17M110 300h17M553 300h17M177 137l12 12M491 451l12 12M177 463l12-12M491 149l12-12" />
        </g>
        <path
          className="trajectory"
          d="M35 481C149 430 138 266 326 223S500 140 625 102"
          stroke="#5be9ef"
          strokeWidth="1.2"
          strokeDasharray="5 7"
          opacity=".7"
        />
        <g className="plane-position">
          <g className="plane-float">
            <path
              d="m91 319 466-151-182 292-61-105Z"
              fill={`url(#${id}-wing)`}
              stroke="#a6eeeb"
              strokeWidth="1.2"
            />
            <path d="m91 319 466-151-243 187Z" fill={`url(#${id}-body)`} />
            <path
              d="m314 355 243-187-182 292 1-92Z"
              fill="#1a5169"
              stroke="#7bd4dc"
              strokeWidth="1"
            />
            <path d="m314 355 61 105 1-92 181-200Z" fill={`url(#${id}-wing)`} />
            <path d="m91 319 466-151-181 200-62-13Z" fill="none" stroke="#e0fffb" strokeWidth="1" />
            <g stroke="#20596e" strokeWidth=".7" opacity=".55">
              <path d="m145 302 187 39M198 284l153 42M252 266l119 45M305 249l85 47M359 231l50 50M414 213l14 53M145 302l233-50M198 284l198-51M252 266l163-52M305 249l128-55" />
              <path d="m334 382 168-137M348 408l125-115M362 435l81-94" />
            </g>
            <path d="m314 355 243-187" stroke="#f0ffff" strokeWidth="2" />
            <circle cx="557" cy="168" r="4" fill="#5be9ef" />
          </g>
        </g>
        <g stroke="#5d879b" strokeWidth=".8">
          <path d="m523 171 50-42h45M175 322l-52 50H42M377 458v47h94" />
          <circle cx="175" cy="322" r="3" fill="#081525" />
          <circle cx="377" cy="458" r="3" fill="#081525" />
        </g>
        <g fill="#a1bcc9" fontFamily="'IBM Plex Mono', monospace" fontSize="10" letterSpacing="1">
          <text x="540" y="116">
            PRÓXIMO HORIZONTE
          </text>
          <text x="42" y="391">
            PONTO DE PARTIDA
          </text>
          <text x="387" y="523">
            CONHECIMENTO →
          </text>
          <text x="66" y="95">
            FIG. 01 / POSSIBILIDADES
          </text>
          <text x="493" y="561">
            x → ∞
          </text>
          <text x="105" y="187" opacity=".65">
            F = m·a
          </text>
          <text x="476" y="390" opacity=".65">
            Δs / Δt
          </text>
        </g>
        <g fill="#5be9ef">
          <circle cx="119" cy="300" r="3" />
          <circle cx="533" cy="189" r="3" />
        </g>
        <path d="M55 530h10m-5-5v10M588 71h10m-5-5v10" stroke="#f6b44b" />
      </svg>
    </div>
  )
}

export function Structure({ className = '' }: { className?: string }) {
  const xs = Array.from({ length: 13 }, (_, i) => 90 + i * 36)
  return (
    <svg
      className={`structure-art ${className}`}
      viewBox="0 0 640 450"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" opacity=".18">
        <path d="m30 370 330-180 260 135-335 100Z" />
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`m${45 + i * 30} ${362 + i * 6} 330-180`} />
        ))}
      </g>
      <g stroke="currentColor" strokeWidth="1.1">
        {xs.map((x, i) => {
          const y = 300 - 160 * Math.sin((i / 12) * Math.PI)
          return (
            <path
              key={x}
              d={`M${x} 335V${y}l95-51v190M${x} ${y}l36 ${i < 6 ? -24 : 24}M${x} 335l36-36M${x} ${y}l36 ${335 - y}`}
            />
          )
        })}
        <path d="m90 300 36-42 36-38 36-33 36-26 36-16 36-5 36 5 36 16 36 26 36 33 36 38 36 42M90 335h432l95-51H185Z" />
      </g>
      <g stroke="currentColor" opacity=".45" strokeDasharray="3 5">
        <path d="M90 350v40m432-40v40M90 375h432M80 140H40v195h40" />
      </g>
      <g fill="currentColor" fontFamily="'IBM Plex Mono', monospace" fontSize="11">
        <text x="235" y="399">
          ESTRUTURAS PARA O FUTURO
        </text>
        <text x="385" y="87">
          FIG. 02 / ENGENHARIA
        </text>
      </g>
    </svg>
  )
}

export function OrbitMark() {
  return (
    <svg className="orbit-mark" viewBox="0 0 300 300" fill="none" aria-hidden="true">
      <g stroke="currentColor">
        <circle cx="150" cy="150" r="100" />
        <ellipse cx="150" cy="150" rx="130" ry="45" transform="rotate(-35 150 150)" />
        <ellipse cx="150" cy="150" rx="45" ry="130" transform="rotate(-35 150 150)" />
        <path d="M20 150h260M150 20v260" strokeDasharray="3 7" />
      </g>
      <circle cx="150" cy="150" r="8" fill="currentColor" />
      <circle cx="248" cy="95" r="6" fill="currentColor" />
    </svg>
  )
}
