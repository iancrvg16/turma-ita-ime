import { useId } from 'react'

export function AeroDiagram() {
  const id = useId()
  return (
    <svg className="aero-art" viewBox="0 0 640 450" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="125" y1="205" x2="545" y2="315" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d5fffa" />
          <stop offset=".55" stopColor="#70bfc6" />
          <stop offset="1" stopColor="#1b536e" />
        </linearGradient>
      </defs>
      <g stroke="#345367" strokeWidth=".7">
        <circle cx="330" cy="235" r="165" />
        <circle cx="330" cy="235" r="120" strokeDasharray="2 8" />
        <path d="M35 235h570M330 40v380" strokeDasharray="3 6" />
      </g>
      <g stroke="#5d8c9e" strokeWidth=".8" opacity=".8">
        <path d="M30 110c150 15 180-48 300-25s170 89 280 99M30 147c150 15 180-48 300-25s170 89 280 99M30 184c150 15 180-48 300-25s170 89 280 99M30 305c170 20 190 49 300 35s170-35 280-13M30 343c170 20 190 49 300 35s170-35 280-13" />
      </g>
      <g transform="rotate(-9 330 235)">
        <path
          d="M100 258C155 147 350 166 565 277 402 248 257 313 100 258Z"
          fill={`url(#${id})`}
          stroke="#b1f4ef"
          strokeWidth="1.4"
        />
        <path d="M100 258C240 225 412 236 565 277" stroke="#316d80" />
        <g stroke="#316d80" strokeWidth=".8" opacity=".6">
          <path d="M155 202v68M210 181v98M265 178v102M320 185v91M375 200v70M430 220v45M485 242v24" />
        </g>
        <path d="M100 258 565 277" stroke="#c9fdf7" strokeDasharray="4 5" strokeWidth=".8" />
      </g>
      <path
        d="M330 167V64m-8 11 8-11 8 11M66 235h53m-10-7 10 7-10 7"
        stroke="#5be9ef"
        strokeWidth="1.2"
      />
      <path d="m206 284-31 51H82M488 279l35 54h63" stroke="#799cae" strokeWidth=".8" />
      <g fill="#a3bfce" fontSize="10" fontFamily="'IBM Plex Mono', monospace" letterSpacing="1">
        <text x="348" y="78">
          SUSTENTAÇÃO
        </text>
        <text x="42" y="356">
          PERFIL DE ASA
        </text>
        <text x="440" y="354">
          IDEIA → PROJETO
        </text>
        <text x="42" y="53">
          FIG. 02 / AERODINÂMICA
        </text>
        <text x="42" y="409" fontSize="8">
          VISTA CONCEITUAL · DESENHO ILUSTRATIVO
        </text>
      </g>
      <circle cx="330" cy="235" r="3" fill="#081525" stroke="#a6e6e8" />
    </svg>
  )
}
