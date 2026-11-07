import { useEffect, useId, useRef, useState } from 'react'
import { quadratic, resultant, wave } from '../../lib/science'
import { Icon } from '../Icon'
import { Tabs } from './Tabs'

const n = (v: number, digits = 1) =>
  v.toLocaleString('pt-BR', { maximumFractionDigits: digits, minimumFractionDigits: digits })

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit = '',
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  unit?: string
}) {
  const id = useId()
  const digits = step >= 1 ? 0 : Number.isInteger(step * 10) ? 1 : 2
  return (
    <div className="lab-slider">
      <div>
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>
          {n(value, digits)}
          {unit && ` ${unit}`}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}

function GraphGrid({ quadraticGraph = false }: { quadraticGraph?: boolean }) {
  return (
    <g className="graph-grid">
      {Array.from({ length: 9 }, (_, i) => (
        <path key={`v${i}`} d={`M${50 + i * 60} 25v260`} />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <path key={`h${i}`} d={`M50 ${25 + i * 32.5}h480`} />
      ))}
      <path className="graph-axis" d={`M50 155h480M${quadraticGraph ? 290 : 50} 25v260`} />
      <text x="518" y="178">
        {quadraticGraph ? 'x' : 'x (m)'}
      </text>
      <text x={quadraticGraph ? 303 : 16} y="22">
        {quadraticGraph ? 'y' : 'y (m)'}
      </text>
      {(quadraticGraph ? [-4, -2, 0, 2, 4] : [0, 2, 4, 6, 8]).map((v, i) => (
        <text key={v} x={50 + i * 120} y="306" textAnchor="middle">
          {v}
        </text>
      ))}
      <text x="34" y="40" textAnchor="end">
        {quadraticGraph ? '8' : '1,2'}
      </text>
      <text x="34" y="280" textAnchor="end">
        {quadraticGraph ? '−8' : '−1,2'}
      </text>
    </g>
  )
}

function WaveLab() {
  const [amplitude, setAmplitude] = useState(0.6)
  const [frequency, setFrequency] = useState(0.5)
  const [wavelength, setWavelength] = useState(3)
  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!playing) return
    let frame = 0
    let previous = 0
    let visible = true
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    if (ref.current) observer.observe(ref.current)
    const animate = (now: number) => {
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 0
      previous = now
      if (visible && !document.hidden) setTime((t) => (t + dt) % 20)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [playing])
  const path = Array.from({ length: 241 }, (_, i) => {
    const x = i / 30
    return `${i ? 'L' : 'M'}${50 + x * 60},${155 - wave(x, time, amplitude, frequency, wavelength) * 100}`
  }).join(' ')
  return (
    <div className="lab-experiment" ref={ref}>
      <div className="lab-graph">
        <div className="graph-heading">
          <span>01 / ONDA HARMÔNICA</span>
          <span>t = {n(time, 2)} s</span>
        </div>
        <svg
          viewBox="0 0 580 330"
          role="img"
          aria-label={`Onda senoidal com amplitude ${n(amplitude)} metro, frequência ${n(frequency)} hertz e comprimento de onda ${n(wavelength)} metros.`}
        >
          <GraphGrid />
          <path d={path} stroke="var(--cyan)" strokeWidth="2.5" fill="none" />
        </svg>
        <div className="graph-actions">
          <button
            className="small-button"
            aria-pressed={playing}
            onClick={() => setPlaying(!playing)}
          >
            <Icon name={playing ? 'pause' : 'play'} size={15} />
            {playing ? 'Pausar' : 'Animar onda'}
          </button>
          <button
            className="small-button"
            onClick={() => {
              setTime(0)
              setPlaying(false)
              setAmplitude(0.6)
              setFrequency(0.5)
              setWavelength(3)
            }}
          >
            <Icon name="reset" size={15} /> Reiniciar
          </button>
        </div>
      </div>
      <div className="lab-controls">
        <p className="eyebrow">MUDE. OBSERVE. DESCUBRA.</p>
        <h3>Uma onda, muitas possibilidades.</h3>
        <p>
          A amplitude muda a altura da onda. A frequência indica quantas oscilações acontecem por
          segundo.
        </p>
        <Slider
          label="Amplitude (A)"
          value={amplitude}
          onChange={setAmplitude}
          min={0.1}
          max={1.2}
          step={0.1}
          unit="m"
        />
        <Slider
          label="Frequência (f)"
          value={frequency}
          onChange={setFrequency}
          min={0.1}
          max={2}
          step={0.1}
          unit="Hz"
        />
        <Slider
          label="Comprimento de onda (λ)"
          value={wavelength}
          onChange={setWavelength}
          min={1}
          max={4}
          step={0.1}
          unit="m"
        />
        <div className="formula">
          y = A · sen[2π(x/λ − f·t)]
          <small>Velocidade de propagação: v = λ·f = {n(wavelength * frequency, 2)} m/s</small>
        </div>
        <p className="lab-note">
          Modelo ideal de uma onda harmônica que se propaga no sentido positivo de x, sem
          amortecimento. A animação só começa quando você escolhe.
        </p>
      </div>
    </div>
  )
}

function FunctionLab() {
  const [a, setA] = useState(0.5)
  const [b, setB] = useState(0)
  const [c, setC] = useState(-2)
  const id = useId().replace(/:/g, '')
  const path = Array.from({ length: 321 }, (_, i) => {
    const x = -4 + i / 40
    return `${i ? 'L' : 'M'}${290 + x * 60},${155 - quadratic(x, a, b, c) * 16.25}`
  }).join(' ')
  return (
    <div className="lab-experiment">
      <div className="lab-graph">
        <div className="graph-heading">
          <span>02 / FUNÇÃO QUADRÁTICA</span>
          <span>y = ax² + bx + c</span>
        </div>
        <svg
          viewBox="0 0 580 330"
          role="img"
          aria-label={`Gráfico de y igual a ${n(a)} x ao quadrado mais ${n(b)} x mais ${n(c)}.`}
        >
          <defs>
            <clipPath id={id}>
              <rect x="50" y="25" width="480" height="260" />
            </clipPath>
          </defs>
          <GraphGrid quadraticGraph />
          <path
            d={path}
            clipPath={`url(#${id})`}
            stroke="var(--amber)"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="290" cy={155 - c * 16.25} r="5" fill="var(--amber)" />
        </svg>
        <div className="graph-actions">
          <button
            className="small-button"
            onClick={() => {
              setA(0.5)
              setB(0)
              setC(-2)
            }}
          >
            <Icon name="reset" size={15} /> Reiniciar função
          </button>
        </div>
      </div>
      <div className="lab-controls">
        <p className="eyebrow">UMA EXPRESSÃO, NOVAS FORMAS.</p>
        <h3>O que muda quando você muda?</h3>
        <p>
          Altere os coeficientes e veja a curva responder. O ponto destacado mostra onde o gráfico
          cruza o eixo y.
        </p>
        <Slider label="Coeficiente a" value={a} onChange={setA} min={-1.5} max={1.5} step={0.25} />
        <Slider label="Coeficiente b" value={b} onChange={setB} min={-2} max={2} step={0.25} />
        <Slider label="Coeficiente c" value={c} onChange={setC} min={-4} max={4} step={0.25} />
        <div className="formula">
          y = ({n(a, 2)})x² + ({n(b, 2)})x + ({n(c, 2)})
          <small>
            {a === 0
              ? b === 0
                ? 'Com a = 0 e b = 0, a função é constante.'
                : 'Com a = 0 e b ≠ 0, a função é afim.'
              : a > 0
                ? 'a > 0: concavidade voltada para cima.'
                : 'a < 0: concavidade voltada para baixo.'}
          </small>
        </div>
        <p className="lab-note">
          Os eixos são adimensionais. A janela mostra −4 ≤ x ≤ 4 e −8 ≤ y ≤ 8; partes da curva podem
          ficar fora dela.
        </p>
      </div>
    </div>
  )
}

function VectorLab() {
  const [strength, setStrength] = useState(3)
  const [angle, setAngle] = useState(60)
  const sum = resultant(4, strength, angle)
  const id = useId().replace(/:/g, '')
  const bx = strength * Math.cos((angle * Math.PI) / 180) * 35
  const by = -strength * Math.sin((angle * Math.PI) / 180) * 35
  return (
    <div className="lab-experiment">
      <div className="lab-graph">
        <div className="graph-heading">
          <span>03 / SOMA DE VETORES</span>
          <span>1 divisão = 1 N</span>
        </div>
        <svg
          viewBox="0 0 580 330"
          role="img"
          aria-label={`Duas forças: F1 de 4 newtons e F2 de ${strength} newtons a ${angle} graus. A resultante tem intensidade ${n(sum.magnitude, 2)} newtons.`}
        >
          <defs>
            {['cyan', 'amber', 'ice'].map((color) => (
              <marker
                key={color}
                id={`${id}-${color}`}
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0 0 6 3 0 6" fill="none" stroke={`var(--${color})`} />
              </marker>
            ))}
          </defs>
          <g className="graph-grid">
            {Array.from({ length: 13 }, (_, i) => (
              <path key={i} d={`M${55 + i * 35} 35v245`} />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
              <path key={`h${i}`} d={`M55 ${15 + i * 35}h455`} />
            ))}
            <path className="graph-axis" d="M55 260h455M195 35v245" />
            <text x="500" y="282">
              x (N)
            </text>
            <text x="208" y="32">
              y (N)
            </text>
          </g>
          <g strokeDasharray="4 5" stroke="#6a8192">
            <path d={`M335 260l${bx} ${by}M${195 + bx} ${260 + by}h140`} />
          </g>
          <path
            d="M195 260h140"
            stroke="var(--cyan)"
            strokeWidth="2"
            markerEnd={`url(#${id}-cyan)`}
          />
          <path
            d={`M195 260l${bx} ${by}`}
            stroke="var(--amber)"
            strokeWidth="2"
            markerEnd={`url(#${id}-amber)`}
          />
          {sum.magnitude > 0 && (
            <path
              d={`M195 260l${sum.x * 35} ${-sum.y * 35}`}
              stroke="var(--ice)"
              strokeWidth="2.5"
              markerEnd={`url(#${id}-ice)`}
            />
          )}
          <g className="vector-labels" fontSize="13" fontFamily="monospace">
            <text x="265" y="282" fill="var(--cyan)">
              F₁
            </text>
            <text x={185 + bx} y={245 + by} fill="var(--amber)">
              F₂
            </text>
            <text x={205 + sum.x * 35} y={245 - sum.y * 35} fill="var(--ice)">
              {sum.magnitude === 0 ? 'R = 0' : 'R'}
            </text>
          </g>
        </svg>
        <div className="graph-actions">
          <span className="vector-legend">
            <i /> F₁ = 4 N <i /> F₂ <i /> Resultante
          </span>
        </div>
      </div>
      <div className="lab-controls">
        <p className="eyebrow">DIREÇÃO TAMBÉM IMPORTA.</p>
        <h3>Forças que encontram um caminho.</h3>
        <p>
          F₁ aponta para a direita. Mude a intensidade e o ângulo de F₂ para descobrir a força
          resultante.
        </p>
        <Slider
          label="Intensidade de F₂"
          value={strength}
          onChange={setStrength}
          min={1}
          max={5}
          step={0.5}
          unit="N"
        />
        <Slider
          label="Ângulo de F₂ com o eixo x"
          value={angle}
          onChange={setAngle}
          min={0}
          max={180}
          step={5}
          unit="°"
        />
        <div className="formula">
          R = F₁ + F₂
          <small>
            |R| = {n(sum.magnitude, 2)} N
            {sum.angle === null
              ? ' · forças se anulam; direção indefinida.'
              : ` · direção = ${n(sum.angle, 1)}°`}
            <br />
            Rₓ = {n(sum.x, 2)} N · Rᵧ = {n(sum.y, 2)} N
          </small>
        </div>
        <p className="lab-note">
          Soma vetorial pelo paralelogramo. As forças têm a mesma origem; o ângulo é medido no
          sentido anti-horário a partir do eixo x positivo.
        </p>
      </div>
    </div>
  )
}

export default function KnowledgeLab() {
  const [tab, setTab] = useState<'waves' | 'function' | 'vectors'>('waves')
  return (
    <div className="knowledge-lab">
      <Tabs
        id="lab"
        label="Escolha um experimento"
        options={[
          { value: 'waves', label: '01 / Ondas' },
          { value: 'function', label: '02 / Funções' },
          { value: 'vectors', label: '03 / Vetores' },
        ]}
        value={tab}
        onChange={setTab}
      />
      <div id="lab-panel" role="tabpanel" aria-labelledby={`lab-tab-${tab}`} tabIndex={0}>
        {tab === 'waves' ? <WaveLab /> : tab === 'function' ? <FunctionLab /> : <VectorLab />}
      </div>
    </div>
  )
}
